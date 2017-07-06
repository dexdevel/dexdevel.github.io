/**
 * Created by integrality.life on 17.06.2017
 */

"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var stylelint = require("gulp-stylelint");
var concat = require("gulp-concat");
var uglify = require("gulp-uglifyjs");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
var browserSync = require("browser-sync");


/** Generating CSS Depends on SASS Files */
gulp.task("sass", function () {
    return gulp.src("sass/**/*.sass")
        .pipe(sass({outputStyle: "expanded"}))
        .pipe(autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {cascade: true}))
        .pipe(gulp.dest("assets/integralitylife/css"))
        .pipe(browserSync.reload({stream: true}));
});

/** Linting CSS */
gulp.task("lint-css", ["sass"], function () {
    return gulp.src("assets/integralitylife/css/*.css")
        .pipe(stylelint({
            reportOutputDir: "reports",
            reporters: [
                {formatter: "string", console: true}
            ]
        }));
});

/** Concatinate and Minimise Scripts Size */
gulp.task("scripts", function () {
    return gulp.src(["lib/jquery/dist/jquery.min.js", "lib/highlight/highlight.pack.js"])
        .pipe(concat("libs.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("assets/integralitylife/js"));
});

/** Minimise CSS */
gulp.task("min-css", ["lint-css"], function () {
    return gulp.src([
        "lib/bootstrap-grid/css/bootstrap-grid.css",
        "lib/highlight/styles/idea.css",
        "assets/integralitylife/css/main.css"
    ])
        .pipe(cssnano())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("assets/integralitylife/css"));
});

/** Synchronise with Browser */
gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "./"
        },
        notify: false
    });
});

/** Watching for Changes in Project Files and Update Page in Browser */
gulp.task("watch", ["min-css", "browser-sync", "scripts"], function () {
    gulp.watch("sass/**/*.sass", ["min-css", browserSync.reload]);
    gulp.watch("*.html", browserSync.reload);
    gulp.watch("assets/integralitylife/js/**/*.js", browserSync.reload);
});