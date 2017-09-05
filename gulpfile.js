const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

// Public
const public = './src/public';

function pack() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('site.css'))
        .pipe(gulp.dest(public));
}

// Tasks
gulp.task('pack', () => {
    return pack();
});

gulp.task('sass:watch', () => {
   return gulp.watch('./src/styles**/*.scss', pack);
});

gulp.task('clean', () => {
    return del([public])
});