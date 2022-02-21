const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function buildCss(done) {
    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'))

    done();
}

function changeCss() {
    watch('src/scss/**/*.scss', buildCss);
}

function myImages() {
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'))
}

function convertWebp() {
    const partialQuality = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(partialQuality))
        .pipe(dest('build/img'))
}

function convertAvif() {
    const partialQuality = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(partialQuality))
        .pipe(dest('build/img'))
}

exports.compiledCss = buildCss;
exports.updateCss = changeCss;
exports.loadimages = myImages;
exports.versionWebp = convertWebp;
exports.versionAvif = convertAvif;
exports.default = series(myImages, convertWebp, convertAvif, buildCss, changeCss)