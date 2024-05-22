const symbols = '+-*/';
const mainText = document.querySelector('#main-text');
const subText = document.querySelector('#sub-text');
const buttonContainer = document.querySelector('#button-container');

let currentResult = 0;
let newCalculaltion = false;

buttonContainer.addEventListener('click', function(event){
    if(event.target.tagName === 'BUTTON'){  

        if(newCalculaltion && event.target.matches('.nums')) {
            console.log(true);
            mainText.textContent = '';
        }
        newCalculaltion = false;
        subText.textContent = `Ans = ${currentResult}`;

        if(event.target.matches('.nums')){
                mainText.textContent += event.target.textContent;
        }
        else if(event.target.matches('.math-symbol')){
            console.log(mainText.textContent);
            if(!symbols.includes(mainText.textContent.slice(-2, -1)) || mainText.textContent.slice(-2, -1) === ''){
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
        subText.textContent = `${mainText.textContent}`;
        mainText.textContent = `${currentResult}`;
    }
    else if(func === 'AC'){
        mainText.textContent = '';
        subText.textContent = '';
        newCalculaltion = true;
    }
    else if(func === 'DEL'){
        numberPop();
    }
    else if(func === 'Ans'){
        mainText.textContent += 'Ans';
    }
    else{
        const elements = mainText.textContent.trim().split(' ');
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
    else mainText.textContent = mainText.textContent.slice(0, -1);
}

function calculate(){
    const calculateElements = mainText.textContent.trim().split(' ');
    if(calculateElements[0] === 'Ans') calculateElements[0] = currentResult;
    if(calculateElements[1] === 'Ans') calculateElements[1] = currentResult;

    if(calculateElements.length === 1 && !symbols.includes(calculateElements[0])){
        currentResult = calculateElements[0];
    }
    else if(!checkCurrentValidLength() || (isNaN(+calculateElements[0]) || isNaN(+calculateElements[2]))){
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
    if(elements.length === 3 || (elements.length === 1 && !symbols.includes(elements[0]))) return true;
    else return false;
}