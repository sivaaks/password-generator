
const API_URL= 'https://passwordinator.herokuapp.com/generate?&num=&char=true&caps=true';
let length=8;
let passwordGenerated='';

(function(){

    const header = document.createElement('header');
    header.setAttribute('class', 'header');

    const headerContainer = document.createElement('div');
    headerContainer.setAttribute('class', 'header-container');

    const headingText= document.createElement('h1');
    headingText.setAttribute('class','title');
    headingText.innerText='Password generator';

    headerContainer.append(headingText);

    const inputContainer= document.createElement('div');
    inputContainer.setAttribute('class','input-container');

    const genPassButton = document.createElement('button');
    genPassButton.setAttribute('class','page-button');
    genPassButton.setAttribute('onclick','getPassword()');
    genPassButton.innerText='Generate password';

    const sliderContainer= document.createElement('div');
    sliderContainer.setAttribute('class','slider-container');

    const lengthSlider=document.createElement('input');
    lengthSlider.setAttribute('type','range');
    lengthSlider.setAttribute('min','6');
    lengthSlider.setAttribute('max','24');
    lengthSlider.setAttribute('value','12');
    lengthSlider.setAttribute('class','slider');
    lengthSlider.setAttribute('id','length');

    const lengthHeading= document.createElement('h4');
    lengthHeading.setAttribute('class','length-heading');
    lengthHeading.innerText='Length';

    const lengthText= document.createElement('h4');
    lengthText.setAttribute('class','length-text');
    lengthText.innerText=length;

    sliderContainer.append(lengthHeading,lengthSlider,lengthText);

    inputContainer.append(sliderContainer,genPassButton);

    header.append(headerContainer);

    const section = document.createElement('section');
    section.setAttribute('class', 'container');

    const displayContainer = document.createElement('div');
    displayContainer.setAttribute('class', 'display-container');

    const displayText = document.createElement('div');
    displayText.setAttribute('class', 'text');

    const copyButton=document.createElement('button');
    copyButton.setAttribute('class','page-button');
    copyButton.setAttribute('onclick','copyToClipboard()');
    copyButton.innerText='Copy password';

    displayContainer.append(displayText,copyButton);
    section.append(displayContainer);

    document.body.append(header,section,inputContainer);

})();

function displayPassword(password){

    const displayText = document.querySelector('.text');
    displayText.innerText=password;
    passwordGenerated=password;

}

function copyToClipboard(){

    navigator.clipboard.writeText(passwordGenerated);
    alert('Copied to clipboard');

}

async function getPassword() {

    try {
        const data = await fetch(`${API_URL}&len=${length}`);
        const response = await data.json();
        displayPassword(response.data);
    } catch (msg) {
        console.log(msg);
    }

}

const lengthSlider= document.querySelector('.slider');
const lengthText=document.querySelector('.length-text');

lengthSlider.oninput=function(){
    length=this.value;
    lengthText.innerText=length;
}

getPassword();