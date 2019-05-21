var fs = require('fs');
var data = require('./data.json');

console.log("This is our data, defined using { var data = require('./data.json') }:");
console.log("data: ", data, "\n");
console.log("This is data.name, called from the data variable defined above:");
console.log("data.name: ", data.name);

// Asynchronous function, so requies a second paramater, which is the callback
// Provide an anonymous function like so:

/*
fs.readFile('./data.json', function(err, data)

)};
*/

// It is more succinct to use the => notation, however

// This will output hex code without formatting the output as utf-8
fs.readFile('./data.json', 'utf-8' ,(err, data) => {
    console.log("\nBelow is the data, called within the readFile function:");
    console.log("data: ", data);
    console.log("This is our data.name, within the readFile function:");
    console.log("data.name: ", data.name);

    // Now, lets parse data in JSON format:
    var data = JSON.parse(data);
    console.log("\nBelow is the data, called within the readFile function, parsed as JSON:");
    console.log("data: ", data);
    console.log("This is our data.name, within the readFile function, parsed as JSON:");
    console.log("data.name: ", data.name);
});
