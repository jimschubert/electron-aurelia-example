'use strict';
global.shellStartTime = global.shellStartTime || +new Date();

const app = require('electron').app;
const path = require('path');
const { BrowserWindow, dialog, crashReporter } = require('electron');
const yargs = require('yargs');

// report crashes to the Electron project
crashReporter.start({
  productName: 'James Davis',
  companyName: 'Company Name',
  submitURL: 'http://localhost/electron/crash-report',
  autoSubmit: true
})

// prevent window being GC'd
let mainWindow = null;

yargs
  .alias('d', 'dev').boolean('d').describe('d', 'Run in development mode.')
  .alias('c', 'ci').boolean('c').describe('c', 'Run in continuous integration mode during testing.')
  .alias('h', 'help').boolean('h').describe('h', 'Print this usage message.')
  .alias('r', 'resource-path').string('r').describe('r', 'Set the path to the App source directory and enable dev-mode.')
  .alias('s', 'specs-location').string('s').describe('s', 'Set the path to the specs which should be run (requires --test).')
  .alias('t', 'test').boolean('t').describe('t', 'Run the specified specs and exit with error code on failures.')
  .alias('v', 'version').boolean('v').describe('v', 'Print the version.');

function getArgs(){
  var args = yargs.parse(process.argv);

  if(args.help){
    yargs.showHelp('log');
    process.exit(0);
  }

  if(args.version){
    process.stdout.write(`${app.getVersion()}\n`);
    process.exit(0);
  }

  if(args.ci){
    args.test = true;
    args.dev = true;
  }

  args.resourcePath = args['resource-path'] || global.devResourcePath;
  if(args.resourcePath){
    args.dev = true;
  }

  args.specsLocation = args['specs-location'];

  args.e2e =  args.e2e || args['test-type'] === 'webdriver';

  args._root = __dirname + '/';

  return args;
}

var args = getArgs();
global.args = args;

// Enable ES6
app.commandLine.appendSwitch('js-flags', '--harmony');

if(args.dev) {
  app.commandLine.appendSwitch('remote-debugging-port', '8315');
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (args.ci) {
  process.removeAllListeners('uncaughtException');
  process.on('uncaughtException', function(error) {
    console.error(error, error.stack);
    process.exit(1);
  });
}

app.on('ready', function () {
  if(args.test){
    var script;
    try {
      // Load from resourcePath (e.g. new dev tests against previously built app)
      script = require.resolve(path.resolve(args.resourcePath, 'spec', 'init'))
    } catch (e){
      script = require.resolve(path.resolve(__dirname, 'spec', 'init'))
    }

    args.specsInit = script;

    if(!args.specsLocation){
      args.specsLocation = path.dirname(script);
    }

    args.requires = [script];
  }

  mainWindow = new BrowserWindow({
    width: args.e2e ? 800 : 600,
    height: args.e2e ? 600 : 400,
    resizable: false,
    // show: !args.e2e,
    'node-integration': true,
    'web-preferences': {
      javascript: true,
      'web-security': false,
      'experimental-features': true
    }
  });

  mainWindow.loadURL(`file://${__dirname}/client/index.html`);

  mainWindow.on('closed', function () {
    // deref the window
    // for multiple windows store them in an array
    mainWindow = null;
  });

  mainWindow.on('unresponsive', function() {
    var chosen = dialog.showMessageBox(mainWindow, {
      type: 'warning',
      buttons: ['Close', 'Keep Waiting'],
      message: 'Window is not responsing',
      detail: 'The window is not responding. Would you like to force close it or just keep waiting?'
    });
    if (chosen == 0) mainWindow.destroy();
  });

  if(!args.dev) {
    console.log(`App load time: ${Date.now() - global.shellStartTime}ms`);
  }
});
