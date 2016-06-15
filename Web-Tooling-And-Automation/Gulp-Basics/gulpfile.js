var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('default', ['eslint', 'styles', 'scripts', 'create-dist'], function() {
	console.log("Hello World");
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('js/**/*js', ['eslint', 'scripts']);
	gulp.watch('./index.html').on('change', browserSync.reload);
	browserSync.init({
		server: './'
	});
	browserSync.stream();	
});

// TASKS FOR PRODUCTION ENVIRONMENT

// code snippet taken from: https://www.npmjs.com/package/gulp-eslint
gulp.task('eslint', function () {
	// ESLint ignores files with "node_modules" paths.
	// So, it's best to have gulp ignore the directory as well.
	// Also, Be sure to return the stream from the task;
	// Otherwise, the task may end before the stream has finished.
	return gulp.src(['js/**/*.js', '!node_modules/**'])
	// eslint() attaches the lint output to the "eslint" property
	// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError());
});

// styles task to tranform scss to css files
gulp.task('styles', function() {
	// state input directory with scss files
	gulp.src('sass/**/*.scss')
		// run sass() and handle errors in order to prevent build abort
		.pipe(sass().on('error', sass.logError))
		// run autoprefixer
		.pipe(autoprefixer({
			browsers: ['last 2 versions', '> 1%', 'ie > 8']
		}))
		// state output directory for css files
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});

// scripts task to create one all.js file from the files listed
gulp.task('scripts', function() {
	// files listed for correct order of concatenating files
	gulp.src(['js/main.js', 'js/extra.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('js'))
		.pipe(browserSync.stream());
});

// testing with gulp
gulp.task('tests', function() {
	gulp.src('tests/spec/extraSpec.js')
		.pipe(jasmine({
			// false: use minijasminenode; true: use phantomjs
			integration: false,
			vendor: 'js/**/*.js'		
		}));
});

// TASKS FOR DISTRIBUTION ENVIRONMENT

// create-dist calls all relevant tasks to create complete distribution
gulp.task('create-dist', [
	'to-dist-html',
	'to-dist-images',
	'to-dist-styles',
	'to-dist-scripts'
]);

// put html files to distribution
gulp.task('to-dist-html', function() {
	gulp.src('./*.html')
		.pipe(gulp.dest('dist'));
});

// run images through imagemin before putting them to distribution, 
gulp.task('to-dist-images', function() {
	gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

// create css files in compressed format and put them to distribution
gulp.task('to-dist-styles', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', '> 1%', 'ie > 8']
		}))
		.pipe(gulp.dest('dist/css'));
});

// concatenate the js files listed to all.js, uglify it and put it to distribution 
gulp.task('to-dist-scripts', function() {
	gulp.src(['js/main.js', 'js/extra.js'])
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});