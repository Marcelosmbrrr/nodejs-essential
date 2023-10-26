const { stdin: input, stdout: output } = require('process');
const wrfiles = require('./wr-files.js');

// I/O
const rl = system.createInterface({ input, output });
console.log('============= FILE MODULE =============');
rl.question('1 - Create | 2 - Read | 3 - Delete: ', (option) => {

    if (option == 1) {
        rl.question('File name: ', (name) => {
            rl.question('File content: ', (content) => {
                wrfiles.writeFile(name, content);
                console.log('File created!');
                rl.close();
            });
        });
    } else if (option == 2) {
        rl.question('File name: ', (name) => {
            wrfiles.readFile(name);
            rl.close();
        });
    } else if (option == 3) {
        rl.question('File name: ', (name) => {
            wrfiles.deleteFile(name);
            rl.close();
        });
    }

    rl.close();
});