var gulp = require('gulp'),
  rm = require('gulp-rimraf'),
  path = require('path'),
  babel = require( 'rollup-plugin-babel' ),
  rollup = require('gulp-rollup')
  sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function() {
  return gulp.src('assets').pipe(rm());
});

gulp.task('copy', function() {
  gulp.src(['node_modules/ractive/ractive.js', 'node_modules/ractive/ractive.js.map', 'node_modules/lodestar-ractive/dist/lodestar-ractive.js'])
    .pipe(gulp.dest('dist/assets/js/'));
});

gulp.task('rollup', function() {
  return gulp.src('./app/js/main.js', {read: false})
    .pipe(rollup({
      format: 'iife',
      moduleName: 'main',
      sourceMap: true,
      plugins: [
        babel()
      ],
      external: [ 'lodestar-ractive' ]
    }))
    .pipe(sourcemaps.write(".")) // this only works if the sourceMap option is true
    .pipe(gulp.dest('dist/assets/js/'));
});


gulp.task('watch', function() {
  gulp.watch('./app/js/**/*.js', [ 'rollup' ]);
  gulp.watch('./app/less/**/*.less', [ 'less' ]);
});

gulp.task('default', ['copy', 'less', 'rollup', 'watch']);

gulp.task('build', ['copy', 'less', 'rollup']);