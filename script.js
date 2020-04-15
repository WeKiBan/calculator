let displayVal;
let savedVal;
let result;
let operand;
let displaySel = document.getElementById('display-p');
let buttonSel = Array.from(document.getElementsByClassName('button'));
let operandSel = Array.from(document.getElementsByClassName('operate'));
let equalsBtn = document.getElementById('equals');
let clearBtn = document.getElementById('clear');
const keyTable = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    "-": 'subtract',
    "+": 'add',
    "*": 'multiply',
    "/": 'divide',
    "=": 'equals',
    "Enter": 'equals',
    "Backspace": 'clear',
}





add = (num1, num2) => num1 + num2;

subtract = (num1, num2) => num1 - num2;

multiply = (num1, num2) => num1 * num2;

divide = (num1, num2) => num2 === 0 ? "Error" : num1 / num2;

operate = (num1, operand, num2) => {

    let result;

    switch (operand) {
        case "add":
            result = add(num1, num2);
            break;
        case "subtract":
            result = subtract(num1, num2);
            break;
        case "multiply":
            result = multiply(num1, num2);
            break;
        case "divide":
            result = divide(num1, num2);
            break;
    }



    function countDecimals(num) {
        if (num % 1 === 0) {
            return 0;
        } else {
            return num.toString().split('.')[1].length;
        }
    }

    if (result === 'Error') {
        alert("Cannot divide a number by 0");
        return 'Error';

    }

    let decimalPoints = countDecimals(result);


    if (decimalPoints > 5) {
        return result.toFixed('5');
    } else if (result.toString().split('').length > 7) {
        return result.toExponential(3);
    } else {
        return result;
    }

}



clearBtn.addEventListener('click', function (e) {
    if (displayVal) {
        let deleteDisplay = displayVal.split('');
        deleteDisplay.pop();
        displayVal = deleteDisplay.join('');
        return displaySel.textContent = displayVal;
    }

    displayVal = null;
    savedVal = null;
    operand = null;
    displaySel.textContent = '0';
});

equalsBtn.addEventListener('click', function (e) {
    if (!displayVal || !savedVal) return;
    savedVal = operate(savedVal, operand, parseInt(displayVal))
    displaySel.textContent = savedVal;
    displayVal = null;
    operand = 'equals'
});


buttonSel.forEach(button => {
    button.addEventListener("click", function (e) {
        let buttonId = e.target.textContent;
        populateDisplay(buttonId);
    });
});

function populateDisplay(buttonPressed) {
    if (operand === 'equals') savedVal = null;
    if (buttonPressed === '.' && displayVal.includes('.')) return;

    if (!displayVal) {
        displayVal = buttonPressed;

    } else if (displayVal.split('').length > 7) {
        return;
    } else {
        displayVal = displayVal += buttonPressed;
    }
    displaySel.textContent = displayVal;
}

operandSel.forEach(item => {
    item.addEventListener("click", function (e) {
        storeNumbers(e.target.id)
        operand = e.target.id;
    });
})

function storeNumbers(e) {

    if (!savedVal) {
        savedVal = parseFloat(displayVal);
        displayVal = null;
    } else if (!displayVal) {
        return operand = e;
    } else {
        savedVal = operate(savedVal, operand, parseFloat(displayVal));
        displaySel.textContent = savedVal;
        displayVal = null;
    }
}


document.onkeydown = function (e) {
    let keyId = keyTable[e.key];
    if(!keyId) return;
    document.getElementById(keyId).style.opacity = 0.4;
    return document.getElementById(keyId).click();
};

document.onkeyup = function (e) {
    let keyId = keyTable[e.key];
    if(!keyId) return;
    return document.getElementById(keyId).style.opacity = 1;
};

