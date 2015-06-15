/* Aurelia Webdriver Plugin */

exports = module.exports = function(client){
  client.timeouts('page load',20000);
  client.timeouts('script',30000);
  client.timeoutsImplicitWait(30000);

  client.addCommand('waitForAureliaPage', function(cb){
    this.executeAsync(function(done){
      document.addEventListener("aurelia-composed", function (e) {
        done(true)
      });
    }, cb);
  });

  client.addCommand('waitForHttpDone', function(cb){
    this.executeAsync(function(done){
      document.addEventListener("aurelia-http-client-requests-drained", function (e) {
        done(true)
      });
    }, cb);
  });

  client.addCommand('valueBind', function(element, parent, cb){
    var callback;
    if('undefined' === typeof(cb)){
      callback = parent;
      parent = null;
    } else {
      callback = cb;
    }

    this.executeAsync(function(bindingModel, opt_parentElement, done){
      var using = opt_parentElement || document;
      var matches = using.querySelectorAll('*[value\\.bind="' + bindingModel +'"]');
      var result;

      if (matches.length === 0) {
        result = null;
      } else if (matches.length === 1) {
        result = matches[0];
      } else {
        result = matches;
      }
      done(result);
    }, element, parent, callback);
  });

  client.addCommand("loadAndWaitForAureliaPage", function(pageUrl, cb) {
    // TODO: Investigate chromedriver/webdriver async command uncertainty
    // There seems to be an issue with chromedriver executing
    // the next tests before the page loaded call completes, pause seems
    // to help this and should be considered only temporary.
    // Calling this command's callback on process.nextTick is a last-ditch effort.
    this.url(pageUrl)
      .waitForAureliaPage()
      .pause(200)
      .call(function(){
        // Attempt to avoid electron<->chromedriver issues with applying webdriverio extensions.
        process.nextTick(cb);
      });
  });
};
