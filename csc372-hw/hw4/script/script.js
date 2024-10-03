document.addEventListener('DOMContentLoaded', function() {
    let playerChoice = '';
    let computerChoice = '';
    let choicesDisabled = false;
    let wins = 0;
    let losses = 0;
    let ties = 0;

    function handleButtonClick(choice) {
        if (choicesDisabled) {
            return;
        }

        playerChoice = choice;
        console.log('Player chose: ' + playerChoice);

        makeComputerChoice();
        changeSelectionColor(playerChoice);

        choicesDisabled = true;
    }

    function makeComputerChoice() {
        const compChoiceElement = document.getElementById('comp');
        compChoiceElement.classList.add('computer-choice');

        const choices = ['rock', 'paper', 'scissors'];
        const duration = 3000;
        const intervalID = setInterval(() => {
            const index = Math.floor(Math.random() * 3);
            compChoiceElement.innerHTML = `<img src="images/${choices[index]}.PNG" alt="">`;
            computerChoice = choices[index];
            console.log('change image: ' + computerChoice);
        }, 500);

        setTimeout(() => {
            clearInterval(intervalID);
            console.log('COMPUTER CHOICE: ' + computerChoice);
            const winner = decideWinner();

            const resultsElement = document.getElementById('results');
            resultsElement.innerHTML = `<p>RESULTS: ${winner}!</p>`;

            updateScore(winner);
        }, duration);
    }

    function decideWinner() {
        let winner;
        if (playerChoice === computerChoice) {
            winner = 'TIE';
            ties++;
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            winner = 'YOU WIN';
            wins++;
        } else {
            winner = 'COMPUTER WINS';
            losses++;
        }
        console.log(winner);
        return winner;
    }

    function changeSelectionColor(choice) {
        const image = document.getElementById(choice);
        image.classList.add('clickedChoice');
    }

    function handlePlayAgain() {
        const images = ['rock', 'paper', 'scissors'].map(id => document.getElementById(id));
        images.forEach(image => image.classList.remove('clickedChoice'));

        const comp = document.getElementById('comp');
        comp.classList.remove('computer-choice');
        comp.innerHTML = `<img src="images/question-mark.PNG" alt="">`;

        const results = document.getElementById('results');
        results.innerHTML = `<p>RESULTS: </p>`;

        choicesDisabled = false;
        console.log('Play Again');
    }

    function updateScore(winner) {
        const scoreElement = document.getElementById('score');
        scoreElement.innerHTML = `Wins: ${wins} | Losses: ${losses} | Ties: ${ties}`;
    }

    function handleReset() {
        wins = 0;
        losses = 0;
        ties = 0;
        updateScore();
    }

    document.getElementById('rock').addEventListener('click', function() {
        handleButtonClick('rock');
    });

    document.getElementById('paper').addEventListener('click', function() {
        handleButtonClick('paper');
    });

    document.getElementById('scissors').addEventListener('click', function() {
        handleButtonClick('scissors');
    });

    document.getElementById('play-again-btn').addEventListener('click', function() {
        handlePlayAgain();
    });

    document.getElementById('reset-btn').addEventListener('click', function() {
        handleReset();
    });
});