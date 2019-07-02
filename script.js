const calculator = document.getElementById('calculator');
const buttons = document.getElementById('keys');
const display = document.getElementById('displayText');
let decimalUse = 0;

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
                document.getElementsByClassName('equal').removeAttribute("disabled", "");
            }else{
                display.textContent += keyContent;
            }
        }else if(action == "decimal"){
            display.textContent += '.';
            document.getElementById('decimal').setAttribute("disabled", "");
        }else if(action == "add" || action == "subtract" || action == "multiply" || action == "divide"){
            key.classList.add('focus');
            calculator.dataset.firstNum = displayedNum;
            calculator.dataset.operator = action;
            calculator.dataset.previous = 'operator';
            document.getElementById('decimal').removeAttribute("disabled", "");
            document.getElementsByClassName('equal').setAttribute("disabled", "");
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
        res = Math.floor(Number(a) * Number(b) * 10000000) / 10000000;
    }else{
        if(b == 0){
            return "Nice try ;)";
        }
        res = Math.floor(Number(a) / Number(b) * 10000000) / 10000000;
    }
    return res
}