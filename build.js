#!/usr/bin/env node

// This is a wrapper script around electron-packager and other tasks for output.
var exec = require('child_process').execSync,
	rimraf = require('rimraf'),
	args = require('minimist')(process.argv.slice(2)),
	out = args.out || './builds',
	arch = args.arch || process.arch,
	platform = args.platform || process.platform,
	productName = args.name || require('./package.json').productName,
	nodeVersion = parseFloat(process.version.substr(1, 5)),
	adjustedOut = out + '/' + platform + '/' + arch,
	asar = !!args.asar;

if (nodeVersion < 0.12) {
	process.stderr.write('This project requires node >= 0.12');
	process.exit(1);
}

var electronPackager = [
	'node',
	'./node_modules/electron-packager/cli.js',
	'.',
	productName,
	'--prune',
	'--arch=' + arch,
	'--version=0.26.1',
	'--out=' + adjustedOut,
	'--platform=' + platform,
	'--ignore=./builds',
	'--ignore=./gulpfile.js',
	'--ignore=./gulpfile.config.js',
	'--ignore=./readme.md',
    '--ignore=./build'
];

if (asar) {
	electronPackager.push('--asar');
}

rimraf.sync(adjustedOut);
exec(electronPackager.join(' '), {
	cwd: __dirname
});
