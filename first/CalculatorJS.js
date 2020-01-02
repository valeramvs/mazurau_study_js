let display = document.getElementById('display');
let operation;

function getAugend(arg) {
    let number = new Number();
    number.augend(arg);
}

function clean() {
    display.value = '';
}

function operate(sign) {
    operation = display.value + sign;
    clean();
}

function result() {
    let term = operation.slice(-1);
    operation = parseInt(operation);
    switch (term) {
        case '+':
            operation += parseInt(display.value);
            console.log(operation);
            display.value = operation;
            break;
        case '-':
            operation -= parseInt(display.value);
            console.log(operation);
            display.value = operation;
            break;
        case '*':
            operation *= parseInt(display.value);
            console.log(operation);
            display.value = operation;
            break;
        case '/':
            if (display.value != 0) {
                operation /= parseInt(display.value);
                display.value = operation;
            } else {
                display.value = 'Division by Zero!';
            }
            console.log(operation);
            break;
    }
}

