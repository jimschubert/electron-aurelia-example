exports = module.exports = function PageObject_Skeleton(client){
    this.getCurrentPageTitle = function(cb) {
      return client.title(function(err, result){
        cb(err, result && result.value);
      });
    };

  this.navigateTo = function(href){
    return client.click('a[href="' + href + '"]')
      .waitForHttpDone();
  };
};
