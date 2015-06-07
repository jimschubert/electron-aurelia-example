'use strict';
var args = require('yargs').argv,
  validBumpTypes = "major|minor|patch|prerelease".split("|"),
  bump = (args.bump || 'patch').toLowerCase();

if(validBumpTypes.indexOf(bump) === -1) {
  throw new Error('Unrecognized bump "' + bump + '".');
}

module.exports = args;
