var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function() {
	console.log("Hello World");
});

// styles task to tranform scss to css files
gulp.task('styles', function() {
	// state input directory with scss files
	gulp.src('sass/**/*.scss')
		// run sass() and handle errors in order to prevent build abort
		.pipe(sass().on('error', sass.logError))
		// state output directory for css files
		.pipe(gulp.dest('./css'))
});