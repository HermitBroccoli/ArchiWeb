const gulp = require('gulp'),
    browser = require('browser-sync'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css');


/*gulp.task('server', () => {
    browser({
        server: {
            baseDir: 'dist'
        }
    })
    gulp.watch('dist/*.html').on('change', browser.reload);
})*/

gulp.task('pug', () => {
    return gulp.src('src/**/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('dist'));
})

gulp.task('watch', () => {
    gulp.watch('src/**/*.pug', gulp.parallel('pug'))
})

gulp.task('style', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(rename({
            suffix: '.min',
            prefix: ''
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browser.stream());

})

gulp.task('style-watch', () => {
    gulp.watch('src/scss/**/*.scss', gulp.parallel('style'));
})

gulp.task('scripts', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'));
})

gulp.task('image', () => {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'));
})

gulp.task('icons', () => {
    return gulp.src('src/icons/**/*')
        .pipe(gulp.dest('dist/icons'))
})

gulp.task('icons-watch', () => {
    gulp.watch('src/icons/**/*', gulp.parallel('icons'))
})

gulp.task('img-watch', () => {
    gulp.watch('src/img/**/*', gulp.parallel('image'))
})

gulp.task('js-watch', () => {
    gulp.watch('src/js/**/*.js', gulp.parallel('scripts'))
})

gulp.task('default', gulp.parallel('watch', 'js-watch', 'icons-watch', 'img-watch', 'style-watch', /*'server'*/));
