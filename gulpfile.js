var gulp = require('gulp'),
    gulpWatch = require('gulp-watch'),
    gulpSass = require('gulp-sass'),
    
    chalk = require('chalk');


// Compile SASS to CSS
gulp.task('sass', function () {
    
    function sassTask() {
        gulp.src('./ui/scss/**/main.scss')
            .pipe(gulpSass())
            .on('error', function () {
            console.log(chalk.bgRed.red.bold("SASS Compilation Error"));
        });
    }
    
    sassTask();
    gulpWatch('./ui/scss/**/*.scss', sassTask);
    
});