var gulp = require("gulp");

gulp.task('src', function () {
    var ts = require("gulp-typescript");

    var tsProject = ts.createProject("./tsconfig.json", {
        typescript: require('typescript')
    });

    return gulp.src("src/**/*.ts")
        .pipe(ts(tsProject))
        .js
        .pipe(gulp.dest('./build'));
});

gulp.task('default', ['src']);