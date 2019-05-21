// Random number generator using lodash
// Installed using npm package manager

var _ = require('lodash');

// Using nodemon, we can automatically refresh the server anytime changes are made to the files
// Running this code with 'nodemon' instead of 'node'
// And updating the range will automatically generate a new random number in the range
console.log(_.random(1,85));
