function sum(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function multi(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

// ES6
// export { sum, sub, multi, div };
// CommonJS
module.exports = {
    sum,
    sub,
    multi,
    div
};