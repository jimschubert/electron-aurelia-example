#!/usr/bin/env node

// This is a wrapper script around electron-packager and other tasks for output.
var exec = require('child_process').execSync,
	rimraf = require('rimraf'),
	args = require('yargs').argv,
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
} else {
  process.stdout.write('Preparing app for platform ' + platform + ' ' + arch + '\n');
}

var electronPackager = [
	'node',
	'./node_modules/electron-packager/cli.js',
	'.',
	productName,
	// '--prune',
	'--arch=' + arch,
	'--version=1.3.4',
	'--out=' + adjustedOut,
	'--platform=' + platform,
	'--ignore=./builds/',
	'--ignore=./gulpfile.js'
];

if (asar) {
	electronPackager.push('--asar');
}

process.stdout.write('Removing ' + adjustedOut + '\n');
rimraf.sync(adjustedOut);

process.stdout.write('Executing ' + electronPackager.join(' ') + '\n');
exec(electronPackager.join(' '), {
	cwd: __dirname
});
