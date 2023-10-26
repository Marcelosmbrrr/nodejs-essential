const os = require('os');

function getPlataform() {
    return "Your plataform is: " + process.platform;
}

// ES6
// export { getOsName, getOsEOL };
// CommonJS
module.exports = {
    getPlataform
};

