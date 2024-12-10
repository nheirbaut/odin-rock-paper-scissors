const HUMAN_WINS = 0;
const COMPUTER_WINS = 1;
const TIE = 2;

const startPlayingButton = document.querySelector('#start-playing-button');
const playerActionButtons = document.querySelector('#player-action-buttons');
const roundWinnerDiv = document.querySelector('#round-winner');
const gameWinnerDiv = document.querySelector('#game-winner');
const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');

let roundsWonByPlayer = 0;
let roundsWonByComputer = 0;

startPlayingButton.addEventListener('click', () => {
    roundsWonByPlayer = 0;
    roundsWonByComputer = 0;

    playerScore.textContent = roundsWonByPlayer;
    computerScore.textContent = roundsWonByComputer;

    startPlayingButton.classList.toggle('hidden', true);
    playerActionButtons.classList.toggle('hidden', false);
    roundWinnerDiv.classList.toggle('hidden', true);
    gameWinnerDiv.classList.toggle('hidden', true);
});

playerActionButtons.addEventListener('click', e => {
    switch (e.target.id) {
        case 'rock':
            // fallthrough
        case 'paper':
            // fallthrough
        case 'scissors':
            playRound(e.target.id);
            break;
        default:
            console.error(`Invalid player choice: ${e.target.id}`);
            break;
    }
});

function playRound(playerChoice) {
    roundWinnerDiv.classList.toggle('hidden', false);

    let computerChoice = getComputerChoice();
    let outcome = getOutcome(playerChoice, computerChoice);

    const winsMessage = roundWinnerDiv.querySelector('#wins-message');
    const computersChoiceMessage = roundWinnerDiv.querySelector('#computers-choice');

    if (outcome === HUMAN_WINS) {
        roundsWonByPlayer++;
        winsMessage.textContent = 'You win this round.';
    } else if (outcome === COMPUTER_WINS) {
        roundsWonByComputer++;
        winsMessage.textContent = 'Computer wins this round.';
    }
    else {
        winsMessage.textContent = 'Tie-break.';
    }

    computersChoiceMessage.textContent = `${capitalize(computerChoice)}`

    playerScore.textContent = roundsWonByPlayer;
    computerScore.textContent = roundsWonByComputer;

    if (roundsWonByPlayer >= 5 || roundsWonByComputer >= 5 ) {
        startPlayingButton.classList.toggle('hidden', false);
        playerActionButtons.classList.toggle('hidden', true);
        roundWinnerDiv.classList.toggle('hidden', true);
        gameWinnerDiv.classList.toggle('hidden', false);

        const winner = document.querySelector('#winner');

        if (roundsWonByPlayer >= 5) {
            winner.textContent = 'You'
        }
        else {
            winner.textContent = 'Computer'
        }
    }
}


function numberToGameValue(choice) {
    const choices = ['rock', 'paper', 'scissors'];

    if (choice < 0 || choice >= choices.length) {
        console.error(`Value out of range [0-3]: ${choice}`);
        return '';
    }

    return choices[choice];
}

function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3) ;
    return numberToGameValue(choice);
}

function capitalize(word)
{
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function getOutcome(humanChoice, computerChoice) {

    if (humanChoice === computerChoice) {
        return TIE;
    }

    let humanWins = false;

    switch (humanChoice) {
        case "rock":
            humanWins = (computerChoice === "scissors");
            break;
        case "paper":
            humanWins = (computerChoice === "rock");
            break;
        case "scissors":
            humanWins = (computerChoice === "paper");
            break;
    }

    return humanWins ? HUMAN_WINS : COMPUTER_WINS;
}
