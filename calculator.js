// Constants

const buttonNumber = document.getElementsByName('data-number');
const buttonOperation = document.getElementsByName('data-operation');
const buttonResult = document.getElementsByName('data-result')[0];
const buttonDelete = document.getElementsByName('data-delete')[0];
const buttonDeleteValue = document.getElementsByName('data-delete-value')[0];
const buttonNegative = document.getElementsByName('data-negative')[0];

// Initial variables

var result = document.getElementById('result');

var opeCurrent = '';
var opePrevious = '';
var operation = undefined;
var calculation;

// Buttons functions

buttonNumber.forEach(function(button) {
    button.addEventListener('click', function(){
        addNumber(button.innerText);
    })
});

buttonOperation.forEach(function(button){
    button.addEventListener('click', function(){
        selectOperation(button.innerText);
    })
});

buttonResult.addEventListener('click',function(){
    calculate();
    refreshDisplay();
});

buttonDelete.addEventListener('click', function(){
    clear();
    refreshDisplay();
});

buttonDeleteValue.addEventListener('click', function(){
    if(opeCurrent === calculation){
        clear();
        calculation = undefined;
    }
    else{
        removeValue();
    }
    refreshDisplay();
});

buttonNegative.addEventListener('click', function(){
    negativeValue();
    refreshDisplay();
});

// Methods and Calculations

function addNumber(num){
    if(opeCurrent === calculation){
        clear();
        calculation = undefined;
    }
    opeCurrent = opeCurrent.toString() + num.toString();
    refreshDisplay();
}

function selectOperation(ope) {
    if (opeCurrent === '') return;
    if (opePrevious !== ''){
        calculate();
    }
    operation = ope.toString();
    opePrevious = opeCurrent;
    opeCurrent = '';
}

function calculate(){
    const previous = parseFloat(opePrevious);
    const current = parseFloat(opeCurrent);
    if(isNaN(previous) || isNaN(current)) return;
    switch(operation){
        case '+':
            calculation = previous + current;
            break;
        case '-':
            calculation = previous - current;
            break;
        case 'x':
            calculation = previous * current;
            break;
        case '/':
            calculation = previous / current;
            break;
        case '^':
            var j = previous;
            for(i = 1; i < current; i++) {
                j *= previous;
            };
            calculation = j;   
            break;
        default:
            return;        
    }
    opeCurrent = calculation;
    operation = undefined;
    opePrevious = '';
}

function clear() {
    opeCurrent = '';
    opePrevious = '';
    operation = undefined;
}

function removeValue(){
    opeCurrent = opeCurrent.slice(0, -1);
}

function negativeValue(){
    var temp = opeCurrent;
    if (opeCurrent >= 0) {
        var neg = '-';
        temp = neg.concat(opeCurrent);
    }
    if (opeCurrent < 0) {
        temp = opeCurrent.slice(1);
    }
    opeCurrent = temp;
}

function refreshDisplay(){
    result.value = opeCurrent;
}