if (args.test) {
  (function test() {
    // If testing the application, prepare test paths
    var path = require('path');
    System.paths['spec:*'] = path.relative(__dirname, path.dirname(args.specsInit)) + '/*.js';

    // Set up the test runner (jasmine)
    var jasmine = require('jasmine');
    jasmine(window.jasmine);

    // Report to the main process's console (not browser console)
    var reporter = new jasmine.ConsoleReporter({
      showColors: true,
      print: function (message) {
        remote.process.stdout.write(message);
      },

      // deprecated, but we'll dump it anyway.
      onComplete: function (passed) {
        remote.process.exit(passed ? 0 : 1);
      }
    });

    // Add the reporter
    window.jasmine.getEnv().addReporter(reporter);
  })();
}
