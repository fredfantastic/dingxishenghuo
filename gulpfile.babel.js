/**
 * Created by Administrator on 2016/10/10.
 * gou jian gongju
 */

'use strict';
import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import newer from 'gulp-newer';
import size from 'gulp-size';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import glob from 'glob';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import del from 'del';
import runSequence from 'run-sequence';
//import cssnano from 'gulp-cssnano';

//import cssnano from 'gulp-cssnano';
//import jshint from 'gulp-jshint';
//import jscs from 'gulp-jscs';

// Clean output directory
gulp.task('clean', () => del(['dist/*', '!dist/.git', 'src/styles/*', 'src/plugins/*'], {
  dot: true,
}));

// copy scripts files
gulp.task('copy:plugins', () => {
  return gulp.src([
    'node_modules/jquery/**/*',
    'node_modules/bootstrap/**/*',
    'node_modules/font-awesome/**/*',

  ], {
    dot: true,
    base: './node_modules/',
  })

  //.pipe(newer('dist/plugins'))
  // to src/plugins directory
      .pipe(gulp.dest('src/plugins'))
      .pipe(size())
      .pipe(gulp.dest('dist/plugins'));
});

// copy src html files
gulp.task('copy:html', () => {
  return gulp.src([
    'src/**/*.html',
  ])
      .pipe(newer('dist'))
      .pipe(size())
      .pipe(gulp.dest('dist'));
});

// compile scss file
gulp.task('styles', () => {

  const AUTOPREFIXER_BROWSERS = [
    'ie >= 8',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10',
  ];

  return gulp.src('src/scss/**/*.scss')
      .pipe(sourcemaps.init({loadMaps: true,}))
      .pipe(sass().on('err', sass.logError))
      .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))

      // to current styles directory
      .pipe(gulp.dest('src/styles'))

      // to dist directory
      //.pipe(cssnano())

      .pipe(size({title: 'style',}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist/styles'));
});

// compile javascript
gulp.task('scripts', () => {
  var sourceFiles = glob.sync('src/scripts/**/*.js');
  var b = browserify({
    entries: sourceFiles,
    debug: true,
    extensions: ['js', 'jsx'],
    transform: [babelify],
  });
  return b.bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(size())
      .pipe(gulp.dest('dist/scripts'));

});

gulp.task('serve', [], () => {
  browserSync({
    notify: false,
    logPrefix: 'b7',
    server: ['dist'],
    port: 3001,
  });
  gulp.watch(['src/**/*.html'], ['copy:html', browserSync.reload]);
  gulp.watch(['src/scripts/**/*.js'], ['scripts', browserSync.reload]);
  gulp.watch(['src/scss/**/*.scss'], ['styles', browserSync.reload]);
});

gulp.task('default', ['clean'], cb => {
  runSequence(
      ['copy:plugins'],
      ['copy:html'],
      ['styles'],
      ['scripts'],
      ['serve'],
      cb);
});