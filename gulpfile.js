//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    gulp = require("gulp"),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    babel = require("gulp-babel");
const autoprefixer = require('gulp-autoprefixer'),
        livereload = require('gulp-livereload');
gulp.task("ES6", function () {
    return gulp.src("js/es6/*.js")// ES6 源码存放的路径
        .pipe(babel())
        .pipe(gulp.dest("js/es"))//转换成 ES5 存放的路径
        .pipe(livereload());
});
//定义一个testLess任务（自定义任务名称）
gulp.task('Less', function () {
    gulp.src('css/less/*.less') //该任务针对less下的文件less文件
        .pipe(less()) //该任务调用的模块
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('css/css'))//将会在css下生成index.css
        .pipe(livereload());
});
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径
gulp.task('Watch', function () {
    livereload.listen();
    gulp.watch('css/less/*.less', ['Less']); //当所有less文件发生改变时，调用testLess任务
    gulp.watch('js/es6/*.js', ['ES6']); //当所有less文件发生改变时，调用任务
});