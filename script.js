const symbols = '+-*/';
const mainText = document.querySelector('#main-text');
const subText = document.querySelector('#sub-text');
const buttonContainer = document.querySelector('#button-container');
const equalButton = document.querySelector('#button-equal');


let previousResult = 0;
let currentResult = 0

equalButton.addEventListener('click', calculate);

buttonContainer.addEventListener('click', function(event){
    if(event.target.tagName === 'BUTTON'){  
        console.log(event.target.textContent)
        if(event.target.matches('.nums')){
            mainText.textContent += event.target.textContent;
        }
        else if(event.target.matches('.math-symbol')){
            console.log(`symbol:${mainText.textContent.slice(-2, -1)}`)
            if(!symbols.includes(mainText.textContent.slice(-2, -1))){
                console.log(true);
                mainText.textContent += (' ' + event.target.textContent + ' ');
            }
            else {
                console.log(`slice:${mainText.textContent.slice(0, -3)}`)
                mainText.textContent = mainText.textContent.slice(0, -3) + ' ' + event.target.textContent + ' ';
            }
            console.log(`text:${mainText.textContent}`)
            
        }
        else if(event.target.matches('.function')){
            handlefunctionClick(event.target.textContent);
        }
    }
});

function handlefunctionClick(func){
    if(func === 'AC'){
        mainText.textContent = '';
        subText.textContent = '';
        resetInputs();
    }
    if(func === 'DEL'){
        numberPop();
    }
}

function numberPop(){
    if(symbols.includes(mainText.textContent.slice(-2, -1))){
        mainText.textContent = mainText.textContent.slice(0, -3);
    }
    else mainText.textContent = mainText.textContent.slice(0, -1);
}

function calculate(){

}


function resetInputs(){
    inputs = {
        previousNum: null,
        currentNum: null,
        previousInput: null,
        currentInput: null,
        currentOperator: null,
        percentOperator: false,
    };
}