/* File: gulpfile.js */

// ----------------------------------------
// REQUIRED
// ----------------------------------------
var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

// ----------------------------------------
// SCRIPT TASKS
// ----------------------------------------

// configure build-css
gulp.task('build-css', function() {
	return gulp
		.src('source/scss/**/*.scss')
		.pipe(sourcemaps.init()) // Process the original sources
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(sourcemaps.write()) // Add the map to modified source.
		.pipe(gulp.dest('public/assets/stylesheets/'))
		.pipe(reload({ stream: true }));
});

// configure jshint task
gulp.task('jshint', function() {
	return gulp
		.src('source/javascript/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// configure build-js
gulp.task('build-js', function() {
	return (gulp
			.src('source/javascript/**/*.js')
			.pipe(sourcemaps.init())
			.pipe(plumber())
			.pipe(concat('bundle.js'))
			.pipe(rename({ suffix: '.min' }))
			.pipe(uglify())
			//only uglify if gulp is ran with '--type production'
			// .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('public/assets/javascript/'))
			.pipe(reload({ stream: true })) );
});

// ----------------------------------------
// BROWSER-SYNC TASKS
// ----------------------------------------
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './public/'
		}
	});
});

// ----------------------------------------
// WATCH TASKS
// ----------------------------------------

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch('source/scss/**/*.scss', ['build-css']);
	gulp.watch('source/javascript/**/*.js', ['jshint']);
	gulp.watch('source/javascript/**/*.js', ['build-js']);
});

// ----------------------------------------
// DEFAULT TASKS
// ----------------------------------------

// define the default task and add the watch task to it
gulp.task('default', ['watch']);
