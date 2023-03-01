// プラグイン読み込み
const { src, dest, watch, parallel, series} = require("gulp")
const rename = require("gulp-rename")
const sass = require("gulp-sass")
const prefix = require("gulp-autoprefixer")
const sourcemaps = require("gulp-sourcemaps")
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")
const ejs = require("gulp-ejs")
const replace = require("gulp-replace")
const babel = require("gulp-babel")
const changed = require("gulp-changed")
const ignore = require("gulp-ignore")
const mode = require("gulp-mode")({
  modes: ["production", "development"],
  default: "development",
  verbose: false
});
const del = require('del')
const browserSync = require("browser-sync").create()

const filepath = {
  src: "./src/",
  dist: "./dist/",
}

const ignorepath = {
  dir: `!${filepath.src}**/_*/**`,
  src: `!${filepath.src}**/_*/**/*`
}

const filesrc = {
  ejs: `${filepath.src}**/*.ejs`,
  scss: `${filepath.src}**/*.scss`,
  es: `${filepath.src}**/*.es`
}

const ignoresrc = {...filesrc}
for(let item in ignoresrc){
  ignoresrc[item] = `!${ignoresrc[item]}`
}

/**
 * ブラウザシンク
 */

const browserSyncInit = (done) => {
  browserSync.init({
    server: {
      baseDir: "./dist/",
      index: "index.html",
    },
  })
  done()
}

const browserSyncReload = (done) => {
  browserSync.reload()
  done()
}


const deleteMap = (done) => {
  del([`${filepath.dist}**/*.map`])
  done()
}

/**
 * html, css, js
 */
const copyFiles = (done) => {
  return src([`${filepath.src}**/*`, ...Object.values(ignoresrc), ...Object.values(ignorepath)])
    .pipe(changed(`${filepath.dist}`))
    .pipe(ignore.include({isFile: true})) // ファイルのみを選択
    .pipe(dest(`${filepath.dist}`))
    .pipe(browserSync.stream())
}

/**
 * ejsコンパイル
 */
const compileEjs = (done) => {
  return src([filesrc.ejs, ...Object.values(ignorepath)])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(changed(`${filepath.dist}`))
    .pipe(ignore.include({isFile: true})) // ファイルのみを選択
    .pipe(ejs({}, {}, { ext: ".html" }))
    .pipe(rename({ extname: ".html" }))
    .pipe(replace(/[\s\S]*?(<!DOCTYPE)/, "$1")) // <!DOCTYPE〜より上の行を削除
    .pipe(dest(`${filepath.dist}`))
    .pipe(browserSync.stream())
}

/**
 * Sassコンパイル
 */
const compileSass = (done) => {
  return src([filesrc.scss, ...Object.values(ignorepath)]) // scssファイルを取得
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(mode.development(sourcemaps.init()))
    .pipe(changed(`${filepath.dist}`))
    .pipe(ignore.include({isFile: true})) // ファイルのみを選択
    .pipe(sass({outputStyle: "expanded"})) // Sassのコンパイルを実行,コンパイル設定
    .pipe(prefix(["last 2 versions"]))
    .pipe(mode.development(sourcemaps.write("./")))
    .pipe(dest(`${filepath.dist}`)) // cssフォルダー以下に保存
    .pipe(browserSync.stream())
}

/**
 * esコンパイル
 */
const compileEs = (done) => {
  return src([filesrc.es, ...Object.values(ignorepath)]) 
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(mode.development(sourcemaps.init()))
    .pipe(changed(`${filepath.dist}`))
    .pipe(ignore.include({isFile: true})) // ファイルのみを選択
    .pipe(babel({presets: ["@babel/env"]}))
    .pipe(mode.development(sourcemaps.write("./")))
    .pipe(dest(`${filepath.dist}`))
    .pipe(browserSync.stream())
}

/**
 * ファイル監視
 */
const watchFiles = (done) => {
  watch([`${filepath.src}**/*`, ...Object.values(ignoresrc), ...Object.values(ignorepath)], {interval: 1000}, series(copyFiles))
  watch([filesrc.ejs, ...Object.values(ignorepath)], {}, series(compileEjs))
  watch([filesrc.scss, ...Object.values(ignorepath)], {}, series(compileSass))
  watch([filesrc.es, ...Object.values(ignorepath)], {}, series(compileEs))
  done()
}

// gulpデフォルトタスク
exports.default = series(deleteMap, parallel(copyFiles, compileEjs, compileSass, compileEs), watchFiles, browserSyncInit)
