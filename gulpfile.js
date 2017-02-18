'use strict';

const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    runSequence = require('run-sequence'),
    eslint = require('gulp-eslint');

/**
 * Project structure
 */
const paths = {
    src: 'src',
    dest: 'dist',
}

const files = [
    paths.src + '/hyResources.module.js',
    paths.src + '/hyResourceManager.service.js',
    paths.src + '/hyRequests.service.js',
    paths.src + '/hyResources.service.js'
];

gulp.task('clean', function(done) {
    del.sync(paths.dest + '/hyResources.min.js');
    done();
});

gulp.task('lint', function() {
    return gulp.src(files)
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('generate', function() {
    return gulp.src(files)
        .pipe(plumber())
        .pipe(concat("hyResources.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest));
});


gulp.task('build',['clean','lint','generate']);

gulp.task('watch', ['build']);

gulp.task('default', ['build', 'watch']);