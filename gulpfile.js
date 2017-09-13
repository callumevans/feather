const del = require('del');
const gulp = require('gulp');
const concatr = require('gulp-concat');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

// Public
const public = './src/public';

function packPublicSass() {
    return gulp.src('./src/views/public/site.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('site.css'))
        .pipe(gulp.dest(public));
}

function packAdminSass() {
    return gulp.src('./src/views/admin/admin.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('admin.css'))
        .pipe(gulp.dest(public));
}

function packImages() {
    return gulp.src(['./src/assets/images/**/*.*'])
        .pipe(gulp.dest(public));
}

function packFontAwesome() {
    return gulp.src('./src/assets/font-awesome/**/*.js')
        .pipe(concatr('fa.js'))
        .pipe(uglify())
        .pipe(gulp.dest(public));
}

function sassWatch() {
    return gulp.watch('./src/views/**/*.scss', gulp.parallel(packPublicSass, packAdminSass));
}

function clean() {
    return del([public]);
}

// Tasks
gulp.task('pack', gulp.parallel(
    packPublicSass, packAdminSass, packFontAwesome, packImages
));

gulp.task('sass:watch', gulp.series(sassWatch));

gulp.task('pack:sass', gulp.series(packPublicSass));

gulp.task('pack:font-awesome', gulp.series(packFontAwesome));

gulp.task('clean', gulp.series(clean));