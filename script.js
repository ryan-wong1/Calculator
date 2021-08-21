const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const decimal = document.querySelector('.decimal');
const del = document.querySelector('.delete');
const clear = document.querySelector('.ac');
const percent = document.querySelector('.percent');

//'count' is here so that equal sign cannot be activated more than once per calculation to prevent errors. 'count' resets back to 0 when operator/%/AC is activated afterwards.
let count = 0;
//When equal sign is clicked on, 'active' switches to false. Prevents all buttons except operators (+,-,*,/), AC, and % from being activated afterwards when equal sign is clicked on. Switches back to true after operator/AC/% is activated afterwards.
let active = true;
 
//top
const topDisplay = document.querySelector('.screen-top-message');
//bottom
const screenDisplay = document.querySelector('.screen-bottom-message');

//stores textContent for any number and/or operator clicked on
let inputArray = []; 

numbers.forEach((number) => {
    number.addEventListener('click', function() {
        if (active === true) {
            //appends value/textContent of each number to inputArray
            inputArray.push(number.textContent);
            // converts each item of inputArray to a single string. Used to prevent comma's from being displayed on the DOM for screenDisplay
            screenDisplay.textContent = inputArray.join('');
        }
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', function() {
        // 'inputArray.length > 0' is here to prevent operators from being displayed on DOM before any numbers are clicked on yet
        if (inputArray.length > 0) {
            //if last index in inputArray does not have any operator symbol, append operator symbol to end of inputArray
            if (inputArray[inputArray.length-1] !== '+' && inputArray[inputArray.length-1] !== '-' && inputArray[inputArray.length-1] !== '*' && inputArray[inputArray.length-1] !== '/') {
                inputArray.push(operator.textContent);
                screenDisplay.textContent = inputArray.join('');
                // count, topDisplay, active are reset to allow functionality on x buttons again. 
                count = 0;
                topDisplay.textContent = '';
                active = true;
            // if last index in indexArray does have any operator symbol, update current symbol with new symbol clicked on. Just allows only a single operator symbol to be displayed at at time despite multiple operator button clicks
            } else if (inputArray[inputArray.length-1] === '+' || inputArray[inputArray.length-1] === '-' || inputArray[inputArray.length-1] === '*' ||inputArray[inputArray.length-1] === '/') {
                inputArray[inputArray.length-1] = operator.textContent;
                screenDisplay.textContent = inputArray.join('');
                count = 0;
                topDisplay.textContent = '';
                active = true;
            }
        }
    })
})

equal.addEventListener('click', function() {
    if (inputArray.length > 0) {
        //displays calculation performed for 'total'. Displays answer on topDisplay. 'count === 0' is here so that equal sign cannot be activated more than once per calculation to prevent errors
        if (count === 0) {
            if (inputArray[inputArray.length-1] === '+' || inputArray[inputArray.length-1] === '-' || inputArray[inputArray.length-1] === '*' || inputArray[inputArray.length-1] === '/') {
                inputArray.pop();
            }
            topDisplay.textContent = inputArray.join('');
            count++;
        }
        if (inputArray[inputArray.length-1] === '+' || inputArray[inputArray.length-1] === '-' || inputArray[inputArray.length-1] === '*' || inputArray[inputArray.length-1] === '/') {
            inputArray.pop();
            let stringArray = inputArray.join('');
            //eval() does total calculation even when typeof is an object/string. ex: '5+10' = '50'. Saves me hastle of converting specific index's to typeof Number, etc.
            screenDisplay.textContent = eval(stringArray);
            inputArray = [eval(stringArray)];
            // 'active = false' deactivates any other buttons besides operators/AC/% from being triggered after equal sign is clicked on. 'active' will switch back to true after any operator is clicked on after calculation is displayed on DOM
            active = false;
        } else {
            let stringArray = inputArray.join(''); 
            screenDisplay.textContent = eval(stringArray);
            inputArray = [eval(stringArray)];
            active = false;
        }
    }
})

// very similar to the equal event listener. Main difference is that answer is divided by 100 before displaying, etc.
percent.addEventListener('click', function() {
    if (inputArray.length > 0) {
        if (inputArray[inputArray.length-1] === '+' || inputArray[inputArray.length-1] === '-' || inputArray[inputArray.length-1] === '*' || inputArray[inputArray.length-1] === '/') {
            inputArray.pop();
            let stringArray = inputArray.join('');
            screenDisplay.textContent = (eval(stringArray)/100);
            inputArray = [(eval(stringArray)/100)];
            count = 0;
            topDisplay.textContent = '';
        } else {
            let stringArray = inputArray.join('');
            screenDisplay.textContent = (eval(stringArray)/100);
            inputArray = [(eval(stringArray)/100)];
            count = 0;
            topDisplay.textContent = '';
        }
    }
})

decimal.addEventListener('click', function() {
    if (active === true) {
        inputArray.push(decimal.textContent);
        screenDisplay.textContent = inputArray.join('');
    }
})

//removes last index in inputArray with .pop()
del.addEventListener('click', function() {
    if (typeof inputArray[inputArray.length-1] ===  'string' && active === true) {
        console.log(inputArray);
        inputArray.pop();
        screenDisplay.textContent = inputArray.join('');
    }
})

//resets everything back to default
clear.addEventListener('click', function() {
    screenDisplay.textContent = '0';
    inputArray = [];
    count = 0;
    topDisplay.textContent = '';
    active = true;
})



