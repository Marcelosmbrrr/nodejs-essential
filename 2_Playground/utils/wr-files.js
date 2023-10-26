const fs = require('fs');

function writeFile(name, content) {
    fs.writeFile('./storage/' + name + ".*", content, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

function readFile(filename) {
    fs.readFile("./storage/" + filename + ".*", function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was opened!");
    });
}

function deleteFile(filename) {
    fs.unlink("./storage/" + filename + ".*", function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was deleted!");
    });
}

// ES6 
// export { writeFile, readFile, deleteFile };
// CommonJS
module.exports = {
    writeFile,
    readFile,
    deleteFile
}