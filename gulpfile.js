//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    concat=require('gulp-concat'),   //合并文件
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    babel = require("gulp-babel"),
    notify = require("gulp-notify"),
    del = require('del'),
    ftp = require('gulp-ftp'),
    sftp = require('gulp-sftp'),
    connect = require('gulp-connect');//使用connect启动一个Web服务器
    $ = require('gulp-load-plugins')();
const zip = require('gulp-zip');
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
/*压缩css*/
gulp.task('css',function () {
    return gulp.src('css/css/*.css') //压缩的文件
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(gulp.dest('minified/css')) //输出文件夹
        .pipe(minifycss()); //执行压缩
});

//JS处理
gulp.task('minifyjs',function(){
    return gulp.src('js/es/*.js')  //选择合并的JS
        .pipe(concat('order_query.js'))   //合并js
        .pipe(gulp.dest('dist/js'))         //输出
        .pipe(rename({suffix:'.min'}))     //重命名
        .pipe(uglify())                    //压缩
        .pipe(gulp.dest('dist/js'))            //输出
        .pipe(notify({message:"js task ok"}));    //提示
});
//执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
    del(['minified/css','dist/js'], cb)
});


/*压缩文件*/
gulp.task('fileZip',function () {
    gulp.src('*')
        .pipe(zip('demo.zip'))
        .pipe(gulp.dest('dist'))

});

/*上传服务器*/
gulp.task('uploadFtp', function () {
    return gulp.src('css/css/index.css')
        .pipe(sftp({
            host: 'ts.ebdaowei.com',
            user: 'ebweb',
            pass: 'ebdw*6f',
            remotePath:'/home/ebweb/weixin/yzz'
        }));
});
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径
gulp.task('Watch', function () {
    livereload.listen();
    var server = livereload();
    gulp.watch('css/less/*.less', ['Less']); //当所有less文件发生改变时，调用testLess任务
    gulp.watch('js/es6/*.js', ['ES6']); //当所有less文件发生改变时，调用任务
    gulp.watch('./*.*',function(file){
        livereload.changed(file.path);
    });
});

//默认命令，在cmd中输入gulp后，执行的就是这个命令
gulp.task('default', function() {
    gulp.start('clean','css', 'minifyjs');
});
gulp.task('server', ['connect', 'Watch']);