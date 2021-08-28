const {
  src, dest, watch, parallel
} = require('gulp');

const sass = require('gulp-dart-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

function css() {
  return src('./source/css/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS())
    .pipe(concat('all.css'))
    .pipe(rename((path) => {
      path.basename += '.min';
    }))
    .pipe(dest('./dist/css'));
}

function js() {
  return src('./source/js/*.js')
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(rename((path) => {
      path.basename += '.min';
    }))
    .pipe(dest('./dist/js'));
}

function html() {
  return src('./source/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true, removeComments: true }))
    .pipe(dest('./dist'));
}

function isWatch() {
  watch('./source/*.html', html);
  watch('./source/css/scss/*.scss', css);
  watch('./source/js/*.js', js);
}

exports.default = parallel(css, js, html, isWatch);
