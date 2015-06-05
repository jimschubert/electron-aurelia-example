'use strict';
var gulp = require('gulp');

gulp.task('release', [
    'prepare-release',
    'build:linux:32',
    'build:linux:64',
    'build:darwin:64',
    'build:windows:32',
    'build:windows:64'
]);
