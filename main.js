const HUMAN_WINS = 0;
const COMPUTER_WINS = 1;
const TIE = 2;

function numberToGameValue(number) {
    switch (number) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
        default:
            return "Unknown value encountered";
    }
}

function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3) ;
    return numberToGameValue(choice);
}

function getHumanChoice() {
    const choice = Number.parseInt(prompt("Enter choice:\n\t0 = rock\n\t1 = paper\n\t2 = scissors"));
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
            break;1
    }

    return humanWins ? HUMAN_WINS : COMPUTER_WINS;
}

function getOutcomeMessage(outcome, humanChoice, computerChoice) {
    switch (outcome) {
        case TIE:
            return "No winner! Both chose " + capitalize(humanChoice);
        case COMPUTER_WINS:
            return "You lose! " + capitalize(computerChoice) + " defeats " + capitalize(humanChoice);
        case HUMAN_WINS:
            return "You win! " + capitalize(humanChoice) + " defeats " + capitalize(computerChoice);
        default:
            return "Error! Unknown value for outcome parameter: " + outcome;
    }
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        const humanChoiceLower = humanChoice.toLowerCase();
        const computerChoiceLower = computerChoice.toLowerCase();

        const outcome = getOutcome(humanChoice, computerChoice);
        const message = getOutcomeMessage(outcome, humanChoiceLower, computerChoiceLower);

        if (outcome === HUMAN_WINS) {
            humanScore++;
        } else if (outcome === COMPUTER_WINS) {
            computerScore++;
        }

        console.log(message);
    }

    for (let turn = 0; turn < 5; turn++) {

        let humanSelection = getHumanChoice();
        let computerSelection = getComputerChoice();

        playRound(humanSelection, computerSelection);
    }

    console.log("Score: you: " + humanScore + ", computer " + computerScore);
}

playGame();