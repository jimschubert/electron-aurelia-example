'use strict';
var args = require('minimist')(process.argv.slice(2)),
  validBumpTypes = "major|minor|patch|prerelease".split("|"),
  bump = (args.bump || 'patch').toLowerCase();

if(validBumpTypes.indexOf(bump) === -1) {
  throw new Error('Unrecognized bump "' + bump + '".');
}

module.exports = args;
