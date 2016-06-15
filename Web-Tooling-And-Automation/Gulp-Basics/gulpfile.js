var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
	console.log("Hello World");
	gulp.watch('sass/**/*.scss', ['styles']);
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