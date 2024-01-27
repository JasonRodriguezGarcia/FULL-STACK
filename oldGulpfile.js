const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const directorioBase = './www';
// Servidor con Browsersync
gulp.task('servidor', function() {
    browserSync.init({
        server: {
            baseDir: directorioBase
        }
    });
    gulp.watch(directorioBase + '/*.html').on('change', browserSync.reload);
});
gulp.task('default', ['servidor']);