var electronRebuild = require('electron-rebuild');
var fs = require('fs');
var path = require('path');

var electronPath = require('electron-prebuilt');
console.log('Electron path: ' + electronPath);

var electronVersion = fs.readFileSync(path.join(__dirname, 'node_modules/electron-prebuilt/dist/version'), 'utf-8');
electronVersion = electronVersion.split('v').join('');

console.log('Electron version: ' + electronVersion);

var ready = function(success, errors) {
  console.log('Rebuilding done.');
};

console.log('Rebuilding modules for electron...');
electronRebuild.installNodeHeaders(electronVersion).then(function() {
  console.log('Headers downloaded. Rebuilding...');
  electronRebuild.rebuildNativeModules(electronVersion, './node_modules', 'sqlite3').then(ready).catch(function(e) {
    console.log(e);
  });
});