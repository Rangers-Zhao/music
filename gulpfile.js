var gulp = require("gulp");
var connect = require("gulp-connect");
var less = require("gulp-less")

//转化html文件路径位置
gulp.task("html",function(){
    gulp.src("./src/index.html")
    .pipe(connect.reload())
    .pipe(gulp.dest("./dist"))
})

//转移js
gulp.task("js",function(){
    gulp.src("./src/js/*.js")
    .pipe(connect.reload())
    .pipe(gulp.dest("./dist/js"))
})

//转换less
gulp.task("less",function(){
    gulp.src("./src/css/*.less")
    .pipe(less())
    .pipe(connect.reload())
    .pipe(gulp.dest("./dist/css"))
})

//开启服务器
gulp.task("server", function(){
    connect.server({
        port:8090,
        root:"./dist",
        livereload:true
    })
})

//监听文件
gulp.task("watch",function(){
    gulp.watch("./src/index.html",["html"]);
    gulp.watch("./src/css/*.less",["less"]);
    gulp.watch("./src/js/*.js",["js"])
})

gulp.task("default",["html","server","less","js","watch"]);
