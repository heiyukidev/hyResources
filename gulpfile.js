'use strict';

const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    runSequence = require('run-sequence'),
    eslint = require('gulp-eslint');

/**
 * Project structure
 */
const paths = {
    src: 'src',
    dest: './',
}

gulp.task('clean', function (done) {
    del.sync(paths.dest+"/hyResources.min.js");
    done();
});

gulp.task('lint', function () {
    return gulp.src([paths.src + '/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
});

gulp.task('minify', function () {
    return gulp.src(paths.src + '/main.js')
        .pipe(uglify())
        .pipe(rename({ basename: 'hyResources', suffix: '.min' }))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('build', function (done) {
    runSequence('clean', 'lint', 'minify', function () {
        done();
    });
});

gulp.task('default', ['build'], function () {

});
