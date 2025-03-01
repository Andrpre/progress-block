import ProgressBlock from './ProgressBlock/ProgressBlock.js';

const spinner = new ProgressBlock();
document.querySelector('.spinner').append(spinner.elem);


// spinner.progress = 35;

// spinner.state = "animated";
spinner.state = "normal";

// let timer = 0;
// setInterval(() => {
//   spinner.progress = timer;
//   timer = timer + 10;
// }, 100);

const input = document.querySelector('.controls__value-input');
input.addEventListener('input', () => {
    spinner.progress = input.value;
});