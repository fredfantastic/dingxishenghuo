/**
 * Created by Administrator on 2016/10/10.
 * gulp构建工具
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
import imagemin from 'gulp-imagemin';
//import cssnano from 'gulp-cssnano';

//import cssnano from 'gulp-cssnano';
//import jshint from 'gulp-jshint';
//import jscs from 'gulp-jscs';

// 清空输出文件夹
gulp.task('clean', () => del(['dist/*', '!dist/.git', 'src/styles/*', 'src/plugins/*'], {
  dot: true,
}));

// 复制bootstrap字体到dist根目录
gulp.task('copy:fonts', ()=> {
  return gulp.src([
    'node_modules/bootstrap-sass/assets/fonts/**/*',
  ])
      .pipe(size())
      .pipe(gulp.dest('dist/fonts'));
});

// 复制src/images目录到dist/images
gulp.task('copy:images', ()=> {
  return gulp.src([
    'src/images/**/*'
  ])
      .pipe(imagemin({
        progressive: true,
        interlaced: true
      }))
      .pipe(size())
      .pipe(gulp.dest('dist/images'));
});

// 复制项目引用插件到dist/plugins和src/plugins
gulp.task('copy:plugins', () => {
  return gulp.src([
    'node_modules/jquery/dist/*.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    'node_modules/font-awesome/**/*.{css,map,oft,svg,eot,ttf,woff,woff2}',
    'node_modules/owl-carousel-2-beta/dist/**/*.{css,js,png,gif}',

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

// 复制非npm管理的插件
gulp.task('copy:no-npm-plugins',()=>{
  return gulp.src([
      'src/no-npm-plugins/**/*',
  ])
      .pipe(newer('dist/no-npm-plugins'))
      .pipe(size())
      .pipe(gulp.dest('dist/no-npm-plugins'));
});

// 复制src根目录的html文件到dist根目录
gulp.task('copy:html', () => {
  return gulp.src([
    'src/**/*.html',
  ])
      .pipe(newer('dist'))
      .pipe(size())
      .pipe(gulp.dest('dist'));
});

// 编译输出scss文件，分别到dist/styles和src/styles
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

// 编译输出javascript文件，分别到src/scripts和dist/scripts
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

// 自动刷新浏览器
gulp.task('serve', [], () => {
  browserSync({
    notify: false,
    logPrefix: 'b7',
    server: ['dist'],
    port: 3001,
  });
  gulp.watch(['src/**/*.html'], ['copy:html', browserSync.reload]);
  gulp.watch(['src/images/**/*.{svg,png,jpg}'], ['copy:images', browserSync.reload]);
  gulp.watch(['src/scripts/**/*.js'], ['scripts', browserSync.reload]);
  gulp.watch(['src/scss/**/*.scss'], ['styles', browserSync.reload]);
});


// 默认任务
// 复制字体、复制图像、复制插件、复制html文件、
// 编译scss文件、编译javascript文件、
gulp.task('default', ['clean'], cb => {
  runSequence(
      ['copy:fonts'],
      ['copy:images'],
      ['copy:plugins'],
      ['copy:no-npm-plugins'],
      ['copy:html'],
      ['styles'],
      ['scripts'],
      ['serve'],
      cb);
});