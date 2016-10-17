var gulp = require('gulp');
var minify = require('gulp-uglify');
var fs = require('fs');


function handleFile(path) {
    var dirs = fs.readdirSync(path);
    dirs.forEach(function (item, idx) {
        var path2 = path + '/' + dirs[idx];
        var suffix = dirs[idx].split('.')[1];
        if (fs.lstatSync(path2).mode & 0040000) {
            // 是文件夹
            handleFile(path2)
        }
        if (suffix == 'js') {
            gulp.src(path2)
                .pipe(minify())
                .pipe(gulp.dest('dist/' + path2));
        }
    })
}


gulp.task('default', function () {
    handleFile('./src')
});

