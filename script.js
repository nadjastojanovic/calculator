const calculator = document.getElementById('calculator');
const buttons = document.getElementById('keys');
const display = document.getElementById('displayText');
let decimalUse = 0;
const operators = document.getElementsByClassName("operator");
let i = 0;
let operator;

buttons.addEventListener('click', e =>{
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        if(!action){
            Array.from(key.parentNode.children).forEach(k => k.classList.remove('focus'));
            if(displayedNum == '0' || calculator.dataset.previous == 'operator'){
                display.textContent = keyContent;
                calculator.dataset.previous = 'num';
                document.getElementById('equal').removeAttribute("disabled", "");
            }else{
                display.textContent += keyContent;
            }
        }else if(action == "decimal"){
            display.textContent += '.';
            document.getElementById('point').setAttribute("disabled", "");
        }else if(action == "add" || action == "subtract" || action == "multiply" || action == "divide"){
            i += 1;
            key.classList.add('focus');
            if(i > 1){
                calculator.dataset.operator = action;
                let secondNum = displayedNum;
                let firstNum = calculator.dataset.firstNum;
                
                firstNum = calculate(firstNum, operator, secondNum);
                calculator.dataset.firstNum = firstNum;
                display.textContent = firstNum;
                calculator.dataset.previous = 'operator';
                console.log(operator);


                operator = calculator.dataset.operator;
            }else{
                calculator.dataset.firstNum = displayedNum;
                calculator.dataset.operator = action;
                calculator.dataset.previous = 'operator';
                operator = calculator.dataset.operator;
                console.log(calculator.dataset.operator);
            }

            document.getElementById('point').removeAttribute("disabled", "");
            document.getElementById('equal').setAttribute("disabled", "");

        }else if(action == "calculate"){
            let secondNum = displayedNum;
            let operator = calculator.dataset.operator;
            let firstNum = calculator.dataset.firstNum;

            display.textContent = calculate(firstNum, operator, secondNum);
        }else if(action == "clear"){
            location.reload();
        }
    }
});

function calculate(a, o, b){
    let res;
    if(o == "add"){
        res = Number(a) + Number(b);
    }else if(o == "subtract"){
        res = Number(a) - Number(b);
    }else if(o == "multiply"){
        res = Math.floor(Number(a) * Number(b) * 10000000) / 10000000;
    }else{
        if(b == 0){
            return "Nice try ;)";
        }
        res = Math.floor(Number(a) / Number(b) * 10000000) / 10000000;
    }
    return res;
}

/* The function which simulates a click for
    the event of keydown on keyboard - keyboard support */

document.addEventListener("keydown", event => {
    let code = event.keyCode; 
    switch(code){
        case 48:
        case 45:
            document.getElementById('zero').click();
            break;
        case 49:
        case 35:
            document.getElementById('one').click();
            break;
        case 50:
        case 40:
            document.getElementById('two').click();
            break;
        case 51:
        case 34:
            document.getElementById('three').click();
            break;
        case 52:
        case 37:
            document.getElementById('four').click();
            break;
        case 53:
        case 12:
            document.getElementById('five').click();
            break;
        case 54:
        case 39:
            document.getElementById('six').click();
            break;
        case 55:
        case 36:
            document.getElementById('seven').click();
            break;
        case 56:
        case 38:
            document.getElementById('eight').click();
            break;
        case 57:
        case 33:
            document.getElementById('nine').click();
            break;
        case 61:
        case 107:
            document.getElementById('plus').click();
            break;
        case 173:
        case 109:
            document.getElementById('minus').click();
            break;
        case 56:
        case 106:
            document.getElementById('multiplication').click();
            break;
        case 191:
        case 111:
            document.getElementById('division').click();
            break;
        case 190:
        case 188:
        case 46:
            document.getElementById('point').click();
            break;
        case 67:
            document.getElementById('clear').click();
            break;
        case 61:
        case 13:
            document.getElementById('equal').click();
            break;
    }
});