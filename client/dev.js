if(args.dev){
  // Make the main window centered, visible, and opened with dev tools
  var currentWindow = require('remote').getCurrentWindow();
  currentWindow.setSize(800, 600);
  currentWindow.center();
  currentWindow.show();
  currentWindow.openDevTools();
}
