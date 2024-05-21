const mainText = document.querySelector('#main-text');
const subText = document.querySelector('#sub-text');
const equalButton = document.querySelector('#button-equal');

let inputs = {
    previousResult: 0,
    previousNum: null,
    currentNum: null,
    previousInput: null,
    currentInput: null,
    currentOperator: null,
    percentOperator: false,
    result: null,
}


const buttonContainer = document.querySelector('#button-container');
buttonContainer.addEventListener('click', function(event){
    if(event.target.tagName === 'BUTTON'){  
        inputs.previousInput = inputs.currentInput;
        inputs.currentInput = event.target.textContent;
        console.log(event.target.textContent)
        if(event.target.matches('.nums')){
            mainText.textContent += event.target.textContent;
            handleNumsClick();
        }
        else if(event.target.matches('.math-symbol')){
            mainText.textContent += event.target.textContent;
        }
        else if(event.target.matches('.function')){
            mainText.textContent += event.target.textContent;
        }
    }
});

function handleNumsClick(){
    const symbols = '+-*/';

    console.log(typeof(+inputs.previousInput));
    if(symbols.includes(inputs.previousInput)){
        mainText.textContent = `${inputs.currentInput}`;
        inputs.previousNum = inputs.currentNum;
        inputs.currentNum = parseInt(inputs.currentInput);
    }
    else {
        inputs.currentNum = inputs.currentNum*10 + parseInt(inputs.currentInput);
    }
    console.log(inputs.currentNum);
}

function handleSymbolClick(symbol){

}

function handlefunctionClick(func){
}

