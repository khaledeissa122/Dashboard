var gulp = require("gulp");
var concat = require("gulp-concat");
var prefix = require("gulp-autoprefixer");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var livereload = require("gulp-livereload");
var minify = require("gulp-minify");
var sourcemaps = require("gulp-sourcemaps");
var connect = require("gulp-connect");

gulp.task("html", function () {
  return gulp
    .src("stage/html/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"))
    .pipe(livereload());
});

gulp.task("css", function () {
  return gulp
    .src(["stage/css/**/*.scss", "stage/css/**/*.css"])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(prefix())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload());
});

gulp.task("js", function () {
  return gulp
    .src("stage/js/*.js")
    .pipe(concat("main.js"))
    .pipe(minify())
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload());
});

gulp.task("connect", function () {
  connect.server({
    root: "./dist/",
  });
  livereload.listen();
});

gulp.task("watch", function () {
  livereload.listen();
  gulp.watch("stage/html/**/*.pug", ["html"]);
  gulp.watch(["stage/css/**/*.scss", "stage/css/**/*.css"], ["css"]);
  gulp.watch("stage/js/*.js", ["js"]);
});

gulp.task("default", ["connect", "watch"]);
