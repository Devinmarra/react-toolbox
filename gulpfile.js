const gulp = require('gulp');
const gulpTypescript = require('gulp-typescript');
const header = require('gulp-header');
const merge = require('merge2');
const pkg = require('./package.json');
const tsConfig = 'tsconfig.json';
const rename = require('gulp-rename');
const clean = require("gulp-clean");
const path = require("path");
const run = require("gulp-run");
const cp = require("child_process");

const headerTemplate = '// <%= pkg.name %> v<%= pkg.version %>\n';
const tsProject = gulpTypescript.createProject(tsConfig);

const paths = {
  dist: () => path.normalize("./lib")
}

gulp.task("test-src", function () {
  console.log("=== Running unit tests ===");
  return run("npm test").exec()
});

gulp.task("clean-lib", ["test-src"], function () {
  console.log("=== Cleaning Lib Folder ===");
  return gulp.src(paths.dist(), {
    read: false
  }).pipe(clean());
});

gulp.task("build", ["clean-lib"], function () {
  console.log("=== Compiling Library ===");
  const tsResult = gulp
    .src([
      'src/modules/**/**/*.ts',
      'src/modules/**/**/*.tsx',
      '!src/modules/**/__*/*',
    ])
    .pipe(tsProject());

  return merge([
    tsResult.dts
    .pipe(header(headerTemplate, {
      pkg: pkg
    }))
    .pipe(gulp.dest('lib')),

    tsResult.js
    .pipe(header(headerTemplate, {
      pkg: pkg
    }))
    .pipe(gulp.dest('lib')),
    gulp
    .src([
      'src/modules/**/**/*.scss',
      'src/modules/**/**/*.jpg',
      'src/modules/**/**/*.png',
      '!src/styles/**/*',
    ])
    .pipe(gulp.dest('lib')),
  ]);
});

// gulp.task("publish-lib", ["build"], function () {
//   console.log("=== Publishing Application ===");
//   const URI = "";
//   const cmd = cp.exec(`npm publish --registry ${URI}`);
//   return cmd.on("close", function (code) {
//     if (code > 0) {
//       console.log("=====");
//       console.log("Something went wrong with publish.");
//       if (code === 1) {
//         console.log("Cannot publish over existing version. \n Update 'version' field in package.json and try again");
//       }
//       console.log("=====");
//       // cb(code);
//     } else {
//       console.log(`successfully published to ${URI}`)
//     }
//     console.log("exited with code " + code);
//   });
// });