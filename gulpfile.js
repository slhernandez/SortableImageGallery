var gulp          = require('gulp'),
    browserify    = require('browserify'),
    source        = require('vinyl-source-stream'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    notify        = require('gulp-notify'),
    uglify        = require('gulp-uglify'),
    streamify     = require('gulp-streamify'),
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
  return browserify('./src/site/scripts/gallery.js')
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest('./build/scripts'));
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

});

gulp.task('build', ['site', 'css', 'scripts']);
gulp.task('default', ['clean', 'build', 'watch']);
