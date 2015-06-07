'use strict';

var paths = require('./paths');
var path = require('path');
var args = require('./args');
var validArchs = ['ia32', 'x64'];

var productName = args.name || require(paths.root + 'package.json').productName;

var arch;

// This assumes you won't try testing x64 on 32-bit systems
if (args.arch) {
  if (-1 === validArchs.indexOf(args.arch)) {
    throw new Error('Architecture must be one of: ' + validArchs.join(','));
  } else {
    arch = args.arch;
  }
} else {
  arch = process.arch;
}

/**
 * Provides paths for testing a compiled electron package.
 *
 * @type {{location: string, contentsDir: string, appDir: string, name: string, arch: string}}
 */
var config = {
  location: "",
  contentsDir: "",
  appDir: "",
  name: productName,
  arch: arch
};

if (process.platform == 'win32') {
  config.location = path.join(paths.dist, process.platform,  arch,  productName + '-win32');
  config.contentsDir = config.location;
  config.appDir = path.join(config.location , 'resources', 'app');
} else if (process.platform == 'darwin') {
  config.location = path.join(paths.dist, process.platform, arch,  productName + '.app');
  config.contentsDir = path.join(config.location, 'Contents');
  config.appDir = path.join(config.contentsDir, 'Resources', 'app');
} else {
  config.location = path.join(paths.dist, process.platform, arch);
  config.contentsDir = config.location;
  config.appDir = path.join(config.location , 'resources', 'app');
}

module.exports = config;
