var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');

gulp.task('default', ['eslint'], function() {
	console.log("Hello World");
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('js/**/*js', ['eslint']);
});

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
		.pipe(gulp.dest('./css'))
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