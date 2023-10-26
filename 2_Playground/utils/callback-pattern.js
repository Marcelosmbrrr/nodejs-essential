// Function definition
function sum(a, b, callback) {

    let result = a + b;

    if (result instanceof Number) {
        callback({
            message: result > 0 ? 'Result is positive' : 'Result is negative',
            error: false,
            data: result
        });
    } else {
        callback({
            message: 'Error! Result is not a number.',
            error: true,
            data: null
        });
    }

}

// Function call
// Parameters: a, b and callback definition
sum(1, 2, (response) => {
    console.log(response.message)
    if (!response.error) {
        console.log("Result is: " + response.data);
    }
});