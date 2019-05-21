// This showcases Synchronous Tasks
// The code runs from top to bottom
// The next line doesn't execute until the previous line is fully parsed and understood

fs = require('fs');

data = fs.readdirSync('e:/');
console.log('data: ', data);

console.log("This comes after.");
