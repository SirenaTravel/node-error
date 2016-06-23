let gulp = require("gulp");
let fs = require('fs');
let through = require('through2');

let packageJson = JSON.parse( fs.readFileSync('./package.json').toString() );

let ideFix = through.obj(function (file, enc, cb) {
    if (file.path.match(/.*\/|\\index.ts/ig)) {
        let content = file.contents.toString();
        content += '\n\n export let ___ideFix___ = true;';
        file.contents = new Buffer(content);
    }
    cb(null, file);
});

gulp.task('src', function () {
    let ts = require("gulp-typescript");
    var merge = require('merge2');

    let tsProject = ts.createProject("./tsconfig.json", {typescript: require('typescript')});

    let result = gulp.src("src/**/*.ts")
        .pipe(ideFix)
        .pipe(ts(tsProject));

    return merge([
        result.dts.pipe(gulp.dest('./build')),
        result.js.pipe(gulp.dest('./build'))
    ]);
});

gulp.task('package', ['src'], function () {
    require('dts-bundle').bundle({
        name: packageJson.name, //'@ips.su/fsm',
        out: 'module.d.ts',
        main: './build/index.d.ts'
    });
});

gulp.task('default', ['package']);