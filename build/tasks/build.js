'use strict';

var gulp = require('gulp');
var exec = require('child_process').exec;
var args = require('../args');
var runSequence = require('run-sequence');
var paths = require('../paths');
require('longjohn');

// this task calls the clean task (located
// in ./clean.js), then runs lint
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'lint',
    callback
  );
});

/** Performs a build.
 *
 * This takes any parameters passed into gulp and includes them in the build command.
 * May need to revisit this to allow for parameterized builds
 */
gulp.task('build:one', ['build'], function (cb) {
  var command = [
    'node build.js'
  ];

  var sw = '-';
  for (var arg in args) {
    if (args.hasOwnProperty(arg)) {
      if (arg.length == 1) {
        sw = '-';
      } else {
        sw = '--'
      }

      if (typeof args[arg] !== 'undefined' && args[arg] !== null) {
        // switches with values
        command.push(sw + arg + '=' + args[arg])
      } else {
        // boolean switches
        command.push(sw + arg)
      }
    }
  }

  var commandText = command.join(' ');
  console.log('Executing build: %s', commandText);
  exec(commandText, {
    cwd: paths.root
  }, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

/**
 * Factory for creating a gulp task to build a specific output
 */
var runBuild = function (os, arch, asar) {
  return function (cb) {
    var command = [
      'node build.js'
    ];

    if (asar) command.push('--asar');
    if (arch) command.push('--arch ' + arch);
    if (os) command.push('--platform ' + os);

    var commandText = command.join(' ');
    exec(commandText, {
      cwd: paths.root
    }, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  }
};

gulp.task('build:linux:32', ['build'], runBuild('linux', 'ia32'));
gulp.task('build:linux:64', ['build'], runBuild('linux', 'x64'));
gulp.task('build:darwin:64', ['build'], runBuild('darwin', 'x64'));
gulp.task('build:windows:32', ['build'], runBuild('win32', 'ia32'));
gulp.task('build:windows:64', ['build'], runBuild('win32', 'x64'));
