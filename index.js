// Export Machine.pack() object for convenience
var path = require('path');

module.exports = require('node-machine').pack({
  pkg: require('./package.json'),
  dir: path.resolve(__dirname, 'machines')
});
