var gulp = require('gulp');
var minify = require('gulp-uglify');
var fs = require('fs');
var watch = require('gulp-watch');
var less = require('gulp-less');
var mincss = require('gulp-clean-css');
var babel = require("gulp-babel");

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var __DEV__ = false;

function handleFile(path) {
    var dirs = fs.readdirSync(path);
    dirs.forEach(function (item, idx) {
        var path2 = path + '/' + dirs[idx];
        var suffix = dirs[idx].split('.')[1];
        if (fs.lstatSync(path2).mode & 0040000) {
            // 是文件夹
            handleFile(path2)
        } else {
            var stream = gulp.src(path2);
            if (suffix == 'js') {
                stream.pipe(babel());
                if (!__DEV__)
                    stream.pipe(minify())
            } else if (suffix == 'wxss' || suffix == 'css') {
                stream.pipe(less())
                    .pipe(mincss())
                    .pipe((function () {
                        return through.obj(function (file, enc, cb) {
                            if (file.isNull()) {
                                // 返回空文件
                                cb(null, file);
                            }
                            if (file.isBuffer()) {
                                // todo ??????
                                file.contents = new Buffer(file.contents.toString().replace(/(\w)([\.#])(\w)/ig, '$1_$2$3').replace(/([^(media | keyframes)])\s/ig, '$1'));
                            }
                            if (file.isStream()) {
                            }
                            cb(null, file);
                        });
                    })())
            } else {
                stream;
            }
            stream.pipe(gulp.dest('dist/' + path.replace(/.*\/*src/ig, '')));
        }
    })
}


gulp.task('prod', function () {
    handleFile('./src')
});

gulp.task('dev', function () {
    __DEV__ = true;
    handleFile('./src')
    watch('./src', function () {
        handleFile('./src')
    });
})