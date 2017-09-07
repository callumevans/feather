const del = require('del');
const gulp = require('gulp');
const concatr = require('gulp-concat');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

// Public
const public = './src/public';

function packSass() {
    return gulp.src('./src/views/main.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('site.css'))
        .pipe(gulp.dest(public));
}

function packFontAwesome() {
    return gulp.src('./src/assets/font-awesome/**/*.js')
        .pipe(concatr('fa.js'))
        .pipe(uglify())
        .pipe(gulp.dest(public));
}

function sassWatch() {
    return gulp.watch('./src/views/**/*.scss', packSass);
}

function clean() {
    return del([public]);
}

// Tasks
gulp.task('pack', gulp.parallel(
    packSass, packFontAwesome
));

gulp.task('sass:watch', gulp.series(sassWatch));

gulp.task('pack:sass', gulp.series(packSass));

gulp.task('pack:font-awesome', gulp.series(packFontAwesome));

gulp.task('clean', gulp.series(clean));