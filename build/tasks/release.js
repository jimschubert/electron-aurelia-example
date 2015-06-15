'use strict';
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('release', function(callback){
  return runSequence(
    'prepare-release',
    'build:linux:32',
    'build:linux:64',
    'build:darwin:64',
    'build:windows:32',
    'build:windows:64',
    callback
  );
});
