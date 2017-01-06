// including plugins
const gulp = require('gulp');
const uglify =require('gulp-uglify');
const jshint = require('gulp-jshint');
const karma = require('karma').server;
const fs = require('fs');
const header = require('gulp-header');
const concat = require('gulp-concat');

// functions
// Get version using NodeJs file system
var getVersion = function () {
    return fs.readFileSync('Version');
};
 
// Get copyright using NodeJs file system
var getCopyright = function () {
    return fs.readFileSync('Copyright');
};

// task
gulp.task('concat-copyright-version', function () {
    gulp.src('./src/app.js')
    .pipe(concat('concat-copyright-version.js')) // concat and name it "concat-copyright-version.js"
    .pipe(header(getCopyright(), {version: getVersion()}))
    .pipe(gulp.dest('concat_version/'));
});

// task (gulp minify-js)
gulp.task('minify-js', function () {
    gulp.src('./src/*.js') // path to your files
    .pipe(uglify())
    .pipe(gulp.dest('minify_src/'));
});

// task (gulp jsLint)
gulp.task('jsLint', function () {
    gulp.src('./src/*.js') // path to your files
    .pipe(jshint())
    .pipe(jshint.reporter()); // Dump results
});

/**
 * Run test once and exit
 */
gulp.task('single-run-test', function (done) {
    karma.start({
        configFile: __dirname + '/test/karma.conf.js',
        singleRun: true
    }, done);
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', [],function (done) {
    karma.start({
        configFile: __dirname + '/test/karma.conf.js'
    }, done);
});

gulp.task('default', ['tdd']);