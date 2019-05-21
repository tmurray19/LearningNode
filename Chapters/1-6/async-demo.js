// This showcases Asynchronous Tasks
// The code is still read line by line
// But is executed as it is finished

fs = require('fs');

function phoneNumber(err, data) {
    console.log('data: ', data);
};

fs.readdir('e:/', phoneNumber);

// This actually comes before the line above.
console.log("This comes after.");
