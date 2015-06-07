'use babel';
process.throwDeprecation = true;

(function(){
  'use strict';

  let async = require('async');
  let path = require('path');
  let remote = require('remote');
  let args = remote.getGlobal('args') || {};

  if (args.ci) {
    let win = remote.getCurrentWindow();
    win.show();
    win.focus();
  }

  var walk = require('walkdir');

  var tasks = [];
  var specBaseDir = path.dirname(args.specsInit);
  var specDir = args.specsLocation;

  // creates an async task that imports a spec, then triggers the next task.
  function createTask(spec){
    return function(next){
      System.import(spec).then(function(){
        next();
      });
    }
  }

  // Synchronously walk the directory and load all specs
  walk.sync(specDir, function(file, stat){
    if (/-spec.js$/.test(file)) {
      // convert full path to relative path under spec base directory without .js extension
      // also, prefix with spec: for jspm alias (defined in test.js)
      var spec = file.replace(specBaseDir, '').replace(/^\//, '').replace(/^/, 'spec:').replace(/.js$/, '');
      tasks.push(createTask(spec));
    }
  });

  // Load all jasmine tests, then execute the test runner.
  async.waterfall(tasks, function(){
    window.jasmine.getEnv().execute();
  });
})();
