const playerScoreEl = document.querySelector("#playerScore");
const computerScoreEl = document.querySelector("#computerScore");
const playerChoiceEl = document.querySelector("#playerChoice");
const computerChoiceEl = document.querySelector("#computerChoice");
const resetEl = document.querySelector("#reset");
const resultText = document.querySelector("#result-text");

//Group Icons Elemnts
const playerIcons = document.querySelectorAll("#player i");
const computerIcons = document.querySelectorAll("#computer i");
const gameIconsAll = document.querySelectorAll(".far");

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

let computerChoiceTitle = "";
let playerScore = 0;
let computerScore = 0;
let resultAnnounce = "";

function resetStyle() {
  gameIconsAll.forEach((icon) => icon.classList.remove("selected"));
}

function computerSelection() {
  let randomNumber = Math.floor(Math.random() * 4 + 1);
  computerIcons[randomNumber].classList.add("selected");
  return computerIcons[randomNumber].title;
}

function getWinner(playerTitle, computerTitle) {
  let choiceObj = choices[playerTitle];
  let isPlayerSuccesss = choiceObj.defeats.some(
    (choice) => choice === computerTitle
  );
  //decide who wins curren round
  if (isPlayerSuccesss) {
    playerScore += 1;
    resultAnnounce = "Hurray!! You Won the Round";
  } else if (playerTitle === computerTitle) {
    resultAnnounce = "Tie! Better Luck Next Time";
  } else {
    computerScore += 1;
    resultAnnounce = "Uff!! You Loss the Round";
  }
}

//Show score and choice of player and computer
function setScore(scoreElem, choiceEl, score, choice) {
  scoreElem.textContent = `${score}`;
  choiceEl.textContent = choice.length>0 ? `---${choice}`: "";
}

//Show user win or loss on each round
function showWinnerScreen() {
  resultText.textContent = resultAnnounce;
}

//set choice by user and computer
function selectIcon(e) {
  resetStyle();
  let playerChoice = e.srcElement;
  let playerChoiceTitle = playerChoice.title;
  let computerChoiceTitle = computerSelection();
  playerChoice.classList.add("selected");

  //evaluate winner according choice of user and computer
  getWinner(playerChoiceTitle.toLowerCase(), computerChoiceTitle.toLowerCase());

  //Set score for user and computer
  setScore(playerScoreEl, playerChoiceEl, playerScore, playerChoiceTitle);
  setScore(
    computerScoreEl,
    computerChoiceEl,
    computerScore,
    computerChoiceTitle
  );

  //show winner on screen
  showWinnerScreen();
}

function resetResult()
{
  resetStyle();
  playerScore=0;
  computerScore=0;
  setScore(playerScoreEl, playerChoiceEl, playerScore, "");
  setScore(
    computerScoreEl,
    computerChoiceEl,
    computerScore,
    ""
  );
  resultAnnounce="Start A new Game!";
  showWinnerScreen();
}

playerIcons.forEach((icon) => icon.addEventListener("click", selectIcon));
resetEl.addEventListener("click", resetResult);