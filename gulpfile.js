var gulp = require('gulp'),
    gulpWatch = require('gulp-watch'),
    gulpSass = require('gulp-sass'),
    gulpJshint = require('gulp-jshint'),

    chalk = require('chalk');


function sassTask() {
    gulp.src('./ui/scss/**/main.scss')
        .pipe(gulpSass())
        .on('error', function () {
        console.log(chalk.bgRed.white.bold("SASS Compilation Error"));
    })
        .pipe(gulp.dest('./ui/dist/'));

    console.log(chalk.bgGreen.white.bold("SASS Compilation Done ---"));
}
gulp.task('sass', sassTask);
gulp.task('sass-watch', function () {
    sassTask();
    gulpWatch('./ui/scss/**/*.scss', sassTask);
});


function jshintTask() {
    gulp.src(['./ui/**/*.js', 'main.js', 'gulpfile.js'])
        .pipe(gulpJshint())
        .pipe(gulpJshint.reporter('jshint-stylish'))
        .pipe(gulp.dest('./ui/dist/'));

    console.log(chalk.bgGreen.white.bold('JS Hint Done ---'));
}
gulp.task('jshint', jshintTask);
gulp.task('jshint-watch', function () {
    jshintTask();
    gulpWatch(['./ui/**/*.js', 'main.js', 'gulpfile.js']);
});


gulp.task('build', ['sass', 'jshint']);