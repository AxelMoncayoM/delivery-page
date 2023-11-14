const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");

function css(done) {
  //prettier-ignore
  src("src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(dest('build/css'))

  done();
}

function images(done) {
  //prettier-ignore
  src('src/img/**/*.{png,jpg}')
        .pipe(imagemin({ optimizatioLevel: 3 }))
        .pipe(dest('build/img'))

  done();
}

function dev(done) {
  //prettier-ignore
  watch('src/scss/**/*.scss', css)

  done();
}

exports.css = css;
exports.images = images;
exports.dev = series(css, dev);
