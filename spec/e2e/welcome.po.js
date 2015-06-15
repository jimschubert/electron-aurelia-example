exports = module.exports = function PageObject_Welcome(client) {

  this.getGreeting = function(cb) {
    return client.getText('h2',cb);
  };

  this.setFirstname = function (value) {
    return client.setValue('*[value\\.bind="firstName"]', value);
  };

  this.setLastname = function(value) {
    return client.setValue('*[value\\.bind="lastName"]', value);
  };

  this.getFullname = function(cb) {
    return client.getText('.help-block', cb);
  };


  this.pressSubmitButton = function(cb) {
    return client.click('button[type="submit"]', cb);
  };

  this.openAlertDialog = function(cb) {
    // TODO: need to figure out programmatically clicking on an alert in electron's UI
    //this.pressSubmitButton(function(){
    //  browser.alertAccept(cb);
    //});
    cb();
  }
};
