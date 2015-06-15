var PageObject_Welcome = require('./welcome.po');
var PageObject_Skeleton = require('./skeleton.po');

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var path = require('path');
var basePath = path.normalize(__dirname + '/../../');


chai.config.includeStack = true;
chai.config.showDiff = false;
chai.config.truncateThreshold = 0; // disable truncating

describe('aurelia skeleton app', function () {
  var po_welcome,
    po_skeleton;

  beforeEach(function (done) {
    po_skeleton = new PageObject_Skeleton(browser);
    po_welcome = new PageObject_Welcome(browser);

    browser.loadAndWaitForAureliaPage('file://'+ basePath + 'client/index.html', done);
  });

  after(function(){
    browser.done();
  });

  it('should load the page and display the initial page title', function(done){
    po_skeleton.getCurrentPageTitle(function(err, result){
      expect(err).to.not.exist;
      process.stdout.write(JSON.stringify(arguments));
      expect(result).to.equal('Welcome | Aurelia');
      done();
    });
  });

  it('should display greeting', function(done){
    po_welcome.getGreeting(function (err, result) {
      expect(err).to.not.exist;
      expect(result).to.equal('Welcome to the Aurelia Navigation App!');
      done();
    });
  });

  it('should automatically write down the fullname', function(done){
    po_welcome.setFirstname('Rob');
    po_welcome.setLastname('Eisenberg');

    browser.pause(1200);

    po_welcome.getFullname(function(err, result){
      expect(err).to.not.exist;
      expect(result).to.be.equal('ROB EISENBERG');
      done();
    });
  });

  it('should show alert message when clicking submit button', function(done) {
    po_welcome.openAlertDialog(function(){
      done();
    });
  });

  it('should navigate to flickr page', function(done){
    po_skeleton.navigateTo('#/flickr');
    po_skeleton.getCurrentPageTitle(function(err, result){
      expect(err).to.not.exist;
      expect(result).to.be.equal('Flickr | Aurelia');
      done();
    });
  });
});
