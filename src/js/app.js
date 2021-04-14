const buttons = document.querySelectorAll('.pick');
const scoreEl = document.getElementById('score');
const main = document.getElementById('main');
const selection = document.getElementById('selection');
const reset = document.getElementById('reset');
const user_select = document.getElementById('user_select');
const computer_select = document.getElementById('computer_select');


// Modal button & stuff
const modal = document.getElementById('modal');
const btnClose = document.getElementById('close');
const btnOpen = document.getElementById('open');

const resultText = document.getElementById('result');

const choices = ['paper', 'rock', 'scissors'];

let score = 0;
let userChoice = undefined;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        userChoice = button.getAttribute('data-choice');

        checkWinner();
    });
});

reset.addEventListener("click", () => {
    // Show the main | hide the selection
    main.style.display = 'flex';
    selection.style.display = 'none';
});

btnOpen.addEventListener("click", () => {
    modal.style.display = 'flex';
});

btnClose.addEventListener("click", () => {
    modal.style.display = 'none';
});

function checkWinner() {
    const computerChoice = pickRandomChoice();

    updateSelection(user_select, userChoice);
    updateSelection(computer_select, computerChoice);
    
    if (userChoice === computerChoice) {
        // draw
        resultText.innerText = 'Draw';
    } else if (
        userChoice === 'paper' && computerChoice === 'rock' ||
        userChoice === 'rock' && computerChoice === 'scissors' ||
        userChoice === 'scissors' && computerChoice === 'paper'
    ) {
        // user won
        updateScore(1);
        resultText.innerText = 'Win';
    } else {
        // user lose
        updateScore(-1);
        resultText.innerText = 'Lose';
    }

    // Show the selection | hide the main
    main.style.display = 'none';
    selection.style.display = 'flex';
}

function updateScore(value) {
    score += value;

    scoreEl.innerText = score;
}

function pickRandomChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function updateSelection(selectionEl, choice) {
    // Class reset
    selectionEl.classList.remove('btn-paper');
    selectionEl.classList.remove('btn-rock');
    selectionEl.classList.remove('btn-scissors');

    const img = selectionEl.querySelector('img');
    selectionEl.classList.add(`btn-${choice}`);
    img.src = `./src/images/icon-${choice}.svg`;
    img.alt = choice;
}