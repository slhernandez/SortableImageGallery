var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    jshint        = require('gulp-jshint'),
    concat        = require('gulp-concat'),
    notify        = require('gulp-notify'),
    livereload    = require('gulp-livereload'),
    del           = require('del');

var paths = {
  build: 'build/',
  scripts: ['src/site/scripts/**/*.js'],
  html: ['src/**/*.html'],
  site: ['src/site/**/*'],
  sass: ['src/sass/*scss']
};

gulp.task('css', function() {
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(autoprefixer('last 15 version'))
    .pipe(gulp.dest(paths.build + 'css'))
    .pipe(notify({ message: 'css task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    //.pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('site', function() {
  return gulp.src(paths.site)
    .pipe(gulp.dest(paths.build));
});

gulp.task('clean', function(cb) {
  del([paths.build], cb)
});

gulp.task('watch', function() {

  // Watch scss files
  gulp.watch(paths.sass, ['css']);

  // Watch .js files
  gulp.watch(paths.scripts, ['scripts']);

  // Watch any HTML changes for site
  gulp.watch(paths.html, ['site']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in build/, reload on change
  gulp.watch(paths.build).on('change', livereload.changed);

});

gulp.task('build', ['site', 'css', 'scripts']);
gulp.task('default', ['clean', 'build', 'watch']);
