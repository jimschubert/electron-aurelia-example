'use strict';

// Register babel to compile all javascript.
// NOTE: By default all requires to node_modules will be ignored.
// NOTE2: Electron already enables ES6, so this is only required from development files that require our own ES6 modules.
require('babel/register');
require('require-dir')('build/tasks');
