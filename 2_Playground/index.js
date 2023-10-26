// ====== CommonJS imports
const system = require('readline');
const { sum } = require('./utils/math.js');
const os = require('./utils/os.js');

// ====== Custom modules
console.log(sum(1, 2));
console.log(os.getPlataform());

// ====== Debugging
debugger;

// ====== Sync e Async routines

// Sync
console.log('Start');
// Assync
setTimeout(() => {
    console.log('2 seconds timer');
}, 2000);
// Sync
console.log('End');








