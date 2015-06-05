var gulp = require('gulp');
var paths = require('../paths');

// outputs changes to files to the console
function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task wil watch for changes and call the
// reportChange method.
gulp.task('watch', [], function() {
  gulp.watch(paths.source).on('change', reportChange);
  gulp.watch(paths.html).on('change', reportChange);
});
