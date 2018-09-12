const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Compile Sass
gulp.task('sass', function() {
	return gulp.src(['src/scss/*.scss'])
	.pipe(sass())
	.on("error", function(error) {
        this.emit("end");
        console.log(error.toString());
    })
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.stream())
});


// Watch - Serve
gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: './'
	});
	
	gulp.watch(['src/scss/**/*.scss'], ['sass']);
	gulp.watch(['./*.html']).on('change', browserSync.reload);
	gulp.watch(['src/js/*.js']).on('change', browserSync.reload);
});

// Default
gulp.task('default', ['serve']);

