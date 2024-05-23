const symbols = '+-*/';
const digits ='0123456789';
const mainText = document.querySelector('#main-text');
const subText = document.querySelector('#sub-text');
const buttonContainer = document.querySelector('#button-container');

let currentResult = 0;
let newCalculaltion = false;

buttonContainer.addEventListener('click', function(event){
    if(event.target.tagName === 'BUTTON'){  

        if(newCalculaltion && !event.target.matches('.math-symbol')) {
            console.log(true);
            mainText.textContent = '';
        }
        newCalculaltion = false;
        subText.textContent = `Ans = ${currentResult}`;

        if(event.target.matches('.nums')){
                mainText.textContent += event.target.textContent;
        }
        else if(event.target.matches('.math-symbol')){
            if(checkCurrentValidLength()){
                calculate();
                mainText.textContent = `${currentResult}` + (' ' + event.target.textContent + ' ');
            }
            else if(!symbols.includes(mainText.textContent.slice(-2, -1)) || mainText.textContent.slice(-2, -1) === ''){
                mainText.textContent += (' ' + event.target.textContent + ' ');
            }
            else if(mainText.textContent.slice(0, 1) === '-'){
                mainText.textContent += (' ' + event.target.textContent + ' ');
            }
            else if(symbols.includes(mainText.textContent.slice(-2, -1))){
                mainText.textContent = mainText.textContent.slice(0, -3) + ' ' + event.target.textContent + ' ';
            }      
        }
        else if(event.target.matches('.function')){
            handlefunctionClick(event.target.textContent);
        }
    }
});

function handlefunctionClick(func){
    if(func === '='){
        calculate();
        newCalculaltion = true;
        if(mainText.textContent !== 'ERROR'){
            subText.textContent = `${mainText.textContent}`;
            mainText.textContent = `${currentResult}`;
        }
    }
    else if(func === 'AC'){
        mainText.textContent = '';
        subText.textContent = '';
        newCalculaltion = true;
    }
    else if(func === 'DEL'){
        numberPop();
        console.log(mainText.textContent);
        if(mainText.textContent === '' || mainText.textContent === ' ' ){
            subText.textContent = '';
        }
    }
    else if(func === 'Ans'){
        mainText.textContent += 'Ans';
    }
    else{
        const elements = mainText.textContent.trim().split(' ');
        if(mainText.textContent.slice(-1) === 's'){
            currentResult = (-1) * currentResult;
            subText.textContent = `Ans = ${currentResult}`;
            return;
        }
        if(elements.length === 1){
            elements[0] = (-1) * elements[0];
            mainText.textContent = elements[0];
        }      
        else if(elements.length === 3){
            elements[2] = (-1) * elements[2];
            mainText.textContent = elements.join(' ');
        }
    }
}

function numberPop(){
    if(symbols.includes(mainText.textContent.slice(-2, -1))){
        mainText.textContent = mainText.textContent.slice(0, -3);
    }
    else if(mainText.textContent.slice(-1) === 's'){
        mainText.textContent = mainText.textContent.slice(0, -3);
    }
    else mainText.textContent = mainText.textContent.slice(0, -1);

}

function calculate(){
    const calculateElements = mainText.textContent.trim().split(' ');
    if(calculateElements[0] === 'Ans') calculateElements[0] = currentResult;
    if(calculateElements[2] === 'Ans') calculateElements[2] = currentResult;

    if(calculateElements.length === 1 && !symbols.includes(calculateElements[0])){
        currentResult = calculateElements[0];
    }
    else if(calculateElements.length === 2|| (isNaN(+calculateElements[0]) || isNaN(+calculateElements[2]))){
        console.log('ERROR');
        mainText.textContent = 'ERROR';
        subText.textContent = '';
        return;
    }
    else {
        if(calculateElements[1] === '+'){
            currentResult = +calculateElements[0] + +calculateElements[2];
        }
        else if(calculateElements[1] === '-'){
            currentResult = +calculateElements[0] - +calculateElements[2];
        }
        else if(calculateElements[1] === '*'){
            currentResult = +calculateElements[0] * +calculateElements[2];
        }
        else if(calculateElements[1] === '/'){
            currentResult = +calculateElements[0] / +calculateElements[2];
        }
    }

    currentResult = Math.round(currentResult * 100) / 100;
}

function checkCurrentValidLength(){
    const elements = mainText.textContent.trim().split(' ');
    if(elements.length === 3 ) return true;
    else return false;
}

document.addEventListener('keydown', function(event){
    console.log(event.key);
    const key = event.key;
    if(digits.includes(key)){
        const digitButton = document.querySelector(`#button-${key}`);
        if(digitButton) digitButton.click();
    }
    else if(symbols.includes(key)){
        let symbolButton = 0;
        switch(key){
            case '+':
                symbolButton = document.querySelector('#button-plus');
                break;
            case '-':
                symbolButton = document.querySelector('#button-minus');
                break;
            case '*':
                symbolButton = document.querySelector('#button-mutiply');
                break;
            case '/':
                symbolButton = document.querySelector('#button-divide');
                break;
        };
        if(symbolButton) symbolButton.click();
    }
    else if(key === 'f'){
        const flipButton = document.querySelector(`#button-flip`);
        if(flipButton) flipButton.click();
    }
    else if(key === 'Escape'){
        const ACButton = document.querySelector(`#button-AC`);
        if(ACButton) ACButton.click();
    }
    else if(key === 'Backspace'){
        const DELButton = document.querySelector(`#button-delete`);
        if(DELButton) DELButton.click();
    }
    else if(key === '.'){
        const dotButton = document.querySelector(`#button-dot`);
        if(dotButton) dotButton.click();
    }
    else if(key === 'a'){
        const ansButton = document.querySelector(`#button-Ans`);
        if(ansButton) ansButton.click();
    }
    else if(key === 'Enter'){
        const equalButton = document.querySelector(`#button-equal`);
        if(equalButton) equalButton.click();
    }
});