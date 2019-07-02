const calculator = document.getElementById('calculator');
const buttons = document.getElementById('keys');
const display = document.getElementById('displayText');

buttons.addEventListener('click', e => {
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
            }else{
                display.textContent += keyContent;
            }
        }else if(action == "decimal"){
            display.textContent += '.';
        }else if(action == "add" || action == "subtract" || action == "multiply" || action == "divide"){
            key.classList.add('focus');
            calculator.dataset.firstNum = displayedNum;
            calculator.dataset.operator = action;
            calculator.dataset.previous = 'operator';
        }else if(action == "calculate"){
            const secondNum = displayedNum;
            const operator = calculator.dataset.operator;
            const firstNum = calculator.dataset.firstNum;

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
        res = Number(a) * Number(b);
    }else{
        res = Number(a) / Number(b);
    }
    return res;
}