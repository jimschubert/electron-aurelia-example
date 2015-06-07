'use strict';
var path = require('path');

var source = path.normalize(__dirname + '/../');
var client = source + 'client/';
var clientSource = client + 'app/';
var outputRoot = source + 'dist/';
var specs = source + 'spec/';

module.exports = {
  root: source,
  dist: source + 'builds/',
  html: client + '**/*.html',
  styles: client + 'css/**/*.css',
  output: outputRoot,
  clientSource: clientSource,
  doc: source + 'doc/',
  jspmLocation: client + 'jspm_packages/',
  allJavaScript: [client],
  source: clientSource + '**/*.js',
  sourceMapRelativePath: '../client/app',
  specsLocation: specs,
  unitTestLocation: specs + 'unit/',
  e2eTestLocation: specs + 'e2e/'
};
