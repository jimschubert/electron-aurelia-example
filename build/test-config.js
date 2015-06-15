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
  config.exe = path.join(config.location, productName + '.exe');
} else if (process.platform == 'darwin') {
  config.location = path.join(paths.dist, process.platform, arch,  productName + '.app');
  config.contentsDir = path.join(config.location, 'Contents');
  config.appDir = path.join(config.contentsDir, 'Resources', 'app');
  config.exe = path.join(config.contentsDir, 'MacOS', 'Electron');
} else {
  config.location = path.join(paths.dist, process.platform, arch);
  config.contentsDir = config.location;
  config.appDir = path.join(config.location , 'resources', 'app');
  config.exe = path.join(config.contentsDir, productName);
}

// The name of the gulp task that should build for the running machine
config.systemBuildTask = ['build',
  process.platform === 'win32' ? 'windows': process.platform,
  process.arch === 'x64' ? '64' : '32'
].join(':');

// The location of the output for the running machine
config.systemBuildDir =  path.join(paths.dist, process.platform,  process.arch);

module.exports = config;
