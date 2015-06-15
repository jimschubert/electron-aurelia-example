# electron-aurelia-example

> An example desktop application written with Electron and Aurelia. 

Based on [aurelia/skeleton-navigation](https://github.com/aurelia/skeleton-navigation), early versions of this repository are based heavily on Aurelia's project structure and the skeleton application.

## Dev

First, install dependencies. This will also trigger `jspm install` for client deps.

```
$ npm install
```

The default gulp task will run lint on your ES6 files.

```
$ gulp
```

For a list of available tasks, run `gulp help`.

Some tasks support debugging of streams being processed. Check those tasks by passing a debug switch:

```
$ gulp --debug
```

### Run

To start an electron instance:

```
$ npm start
```

### Testing

Unit tests are executed from within a running instance of the app. This allows the unit tests to interact with app source as it is included through jspm. Currently, these tests are written using jasmine.

End-to-end (e2e) tests are executed outside of the application through chromedriver and webdriverio using gulp-webdriver. The package is currently referenced from `jimschubert/gulp-webdriver` with pending changes I hope to have integrated upstream. Because the module executes a standalone selenium server, you'll only need to download and start chromedriver. Get the most recent binaries from [Electron's releases](https://github.com/atom/electron/releases) for your development environment and start chromedriver:

```
$ ./chromedriver --url-base=/wd/hub --port=4321
```

Run `gulp specs` to run unit tests (`gulp specs:unit`) and e2e tests (`gulp specs:e2e`). 

### Build

Execute a build specific to your dev machine using the `build.js` wrapper script (which provides system defaults and other stuff around electron-packager).

```
$ node build.js
```

On x64 OS X for example, you can now run this from the `builds` directory:

```
$ open builds/darwin/x64/ElectronAureliaExample.app
```

You may also run a specific build using the defined gulp tasks. These are pre-configured invocations of `node build.js`.

```
$ gulp build:linux:32
$ gulp build:linux:64
$ gulp build:darwin:64
$ gulp build:windows:32
$ gulp build:windows:64
```

Running all cross-platform builds is rolled up into `gulp release`. Running `gulp release` will roll the revision number in your package.json and update `CHANGELOG.md`.

## TODO

* Packaging of cross-platform releases?
* Icon settings
* OS X Signing

## License

MIT © [Jim Schubert](http://ipreferjim.com)

[aurelia/skeleton-navigation](https://github.com/aurelia/skeleton-navigation) is MIT © 2014 Durandal Inc.
