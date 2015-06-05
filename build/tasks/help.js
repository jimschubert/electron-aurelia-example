'use strict';
var gulp = require('gulp'),
    taskListing = require('gulp-task-listing');

// Add a task to render the output
gulp.task('help', taskListing);
