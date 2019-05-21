// Reading or writing files require fs
var fs = require('fs')
/*
// This reads all the files of a given directory
fs.readdir('e:/', (err, data) => {
    console.log(data);
});
*/
// This code snippet writes to a file
var data = {
    name: 'Roberto Montoya'
}

// Alternative
/*
fs.writeFileSync('data.json', JSON.stringify(data));
*/

fs.writeFile('data.json', JSON.stringify(data), (err) =>{
    console.log('Write finished.', err)
})
