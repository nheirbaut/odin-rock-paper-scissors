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

let humanScore = 0;
let computerScore = 0;

