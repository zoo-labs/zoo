const gulp    = require('gulp')
const babel   = require('gulp-babel')
const pug     = require('gulp-pug')
const sass    = require('gulp-sass')(require('sass'))
const terser  = require('gulp-terser')
const ts      = require('gulp-typescript')
const webpack = require('webpack-stream')

const tsProject = ts.createProject('tsconfig.json')

function js() {
    return gulp.src('src/app.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('./public'));
}

function css() {
  return gulp.src('src/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public'))
}

function html() {
  return gulp.src('./src/pages/*.pug')
    .pipe(pug({ verbose: true }))
    .pipe(gulp.dest('./public'))
}


function watch() {
  return gulp.watch(["src/*"], () => gulp.parallel([js, css, html]))
}

exports.build   = gulp.parallel([js, css, html])
exports.html    = html
exports.css     = css
exports.js      = js
exports.pug     = pug
exports.watch   = watch
exports.default = exports.build
