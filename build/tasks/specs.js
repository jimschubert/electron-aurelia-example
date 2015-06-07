'use strict';

var path = require('path');
var fs = require('fs');
var spawn = require('child_process').spawn;
var gulp = require('gulp');
var paths = require('../paths');
var testConfig = require('../test-config');
var gulpUtil = require('gulp-util');

var isWin32 = process.platform === 'win32';

function getExecutable() {
  if(isWin32){
    return path.join(testConfig.contentsDir, testConfig.name + '.exe');
  } else if (process.platform === 'darwin'){
    return path.join(testConfig.contentsDir, 'MacOS', 'Electron');
  } else {
    return path.join(testConfig.contentsDir, testConfig.name);
  }
}

function runSpecSuite(suite){
  return function(done){
    var app = getExecutable();

    if(!fs.existsSync(app)){
      var targetPlatform = isWin32 ? 'windows' : process.platform;
      var arch = (testConfig.arch||process.arch).substring((testConfig.arch||process.arch).length-2, 4);

      // NOTE: the system build task isn't a pre-req for the specs task because we can build in one pass
      // and run tests in another pass. Not sure if this matters, though. The targetPlatform and arch
      // could be moved outside of the task, concatenated to build the test system's spec, and added to the pre-reqs.
      var err = new gulpUtil.PluginError({
        plugin: 'specs',
        message: 'You must first build your target system. run gulp build:'+targetPlatform+':'+arch
      });
      return done(err);
    }

    var command = isWin32 ? process.env.comspec : app;
    var args = [
      '--test',
      '--resource-path=' + paths.root,
      '--specs-location=' + suite,
      '--include-deprecated-apis'
    ];
    var env = {
      ATOM_INTEGRATION_TESTS_ENABLED: true
    };

    for(var variable in process.env){
      if(process.env.hasOwnProperty(variable)) {
        env[variable] = process.env[variable];
      }
    }

    if(isWin32){
      // prepend so we'll have cmd.exe /c appname
      args.unshift('/c', app);
    }

    var specRun = spawn(command, args, env),
      stdout = [],
      stderr = [];
    specRun.stdout.on('data', function (data) {
      stdout.push(data.toString());
    });

    specRun.stderr.on('data', function (data) {
      stderr.push(data.toString());
    });

    specRun.stderr.on('error', function (err) {
      err.plugin = 'specs';
      return done(new gulpUtil.PluginError(err));
    });

    specRun.on('close', function (code) {
      if(code !== 0){
        var err = new gulpUtil.PluginError({
          plugin: 'specs',
          message: stdout.join('')
        });
        return done(err);
      } else {
        gulpUtil.log(stdout.join(''));
      }
      return done();
    });
  }
}

// usage: gulp specs [--arch=<ia32|x64>] [--name=<name>]
//        --arch: override current system architecture.
//                This is only relevant on 64-bit machines to test 32-bit builds.
//        --name: override package name in package.json
//                Must match the same name configured during the build (used in path)
gulp.task('specs', ['specs:unit', 'specs:e2e']);

gulp.task('specs:unit', ['build'], runSpecSuite(paths.unitTestLocation));
gulp.task('specs:e2e', ['build'], runSpecSuite(paths.e2eTestLocation));
