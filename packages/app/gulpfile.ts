const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
// const ts   = require('gulp-typescript')

// const tsProject = ts.createProject('tsconfig.json')

function css() {
  return gulp.src('src/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public'))
}

// function js() {
//     return gulp.src('src/index.tsx')
//         .pipe(tsProject())
//         .pipe(gulp.dest('./public'));
// }

function watch() {
  // return gulp.watch(["src/*"], () => gulp.parallel([js, css]))
  return gulp.watch(["src/*"], () => gulp.parallel([css]))
}

// exports.build   = gulp.parallel([js, css])
// exports.js      = js
exports.build   = gulp.parallel([css])
exports.css     = css
exports.watch   = watch

exports.default = exports.build
