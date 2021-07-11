const gulp    = require('gulp'),
      babel   = require('gulp-babel'),
      sass    = require('gulp-sass')(require('sass')),
      terser  = require('gulp-terser'),
      webpack = require('webpack-stream');

function css(){
  return gulp.src('src/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets'))
}

function js() {
  return gulp.src(['src/*.js', '!src/main.js'])
    //.pipe(terser())
    .pipe(gulp.dest('./public/javascripts'))
}

function bundler(watch) {
  return function bundle() {
    return gulp.src('src/main.js')
      .pipe(webpack({
        watch: watch,
        mode: 'development',
        output: {
          filename: 'main.js',
        }
      }))
      .pipe(gulp.dest('./public/javascripts'))
  }
}

function watch(){
  return gulp.watch(["src/*"], () => gulp.parallel([css, js]))
}

exports.css = css
exports.bundle = bundler()
exports.watch = gulp.parallel([watch, bundler(true)])
exports.default = gulp.parallel([css, js, bundler()])
