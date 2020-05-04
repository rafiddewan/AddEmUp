/**
 * INPUT TEXT FIELD
 */
//disable score
input = document.getElementById("inputTotalScore");
input.addEventListener("mousewheel", function (event) {
  this.blur();
});
//disable null charcters and include characters that are from 0-9
input.addEventListener("keypress", function (evt) {
  if ((evt.which != 0 && evt.which < 48) || evt.which > 57) {
    evt.preventDefault();
  }
});

var goalScore;
let animation;

/*****
 * START BUTTON
 */
document.querySelector(".start-game").addEventListener("click", function () {
  goalScore = input.value;
  input.value = 100;
  document.querySelector(".main-menu").style.display = "none";
  document.querySelector(".gameplay").style.display = "block";
  intialize(); //initialize the game
});

var scores,
  counter,
  roundScore,
  activePlayer,
  gamePlaying,
  scoreAtBeginning; //declare variables
var scores = [0, 0]; //array of score
var prevDiceValue = [0,0];

/**
 * ROLL BUTTON
 */
//callback fucntion, a function we pass that will be called by another function
//in this case event listener is calling the btn function somewhere
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //game state is playing
    //randomize number
    var dice = [(Math.floor(Math.random() * 6) + 1), (Math.floor(Math.random() * 6) + 1)];
    //display result
    resetPrevDiceValue();
    animation = setInterval(diceAnimation, 200); //will loop every 200ms
    const animationPromise = waitAnimation();
    displayDice(dice, animationPromise);
  }
});

/**
 * HOLD BUTTON
 */
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //add roundScore score to scores for active player
    scores[activePlayer] += roundScore;
    //Update UI
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];
    document.getElementById("current-" + activePlayer).textContent = "0"; //reset
    roundScore = 0;
    //Check if player won the game
    if (scores[activePlayer] >= goalScore) {
      document.getElementById("name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document.querySelector(".dice").style.display = "none";
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", function () {
  intialize();
  document.querySelector(".gameplay").style.display = "none";
  document.querySelector(".main-menu").style.display = "block";
});

function intialize() {
  //reset scores
  roundScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;

  //reset texts
  document.getElementById("score-0").textContent = scores[0];
  document.getElementById("score-1").textContent = scores[1];
  document.getElementById("current-0").textContent = roundScore;
  document.getElementById("current-0").textContent = roundScore;
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  //hide dice
  document.getElementById("dice1").style.display = "none";
  document.getElementById("dice2").style.display = "none";
  gamePlaying = true; //turn on game
}

function nextPlayer() {
  roundScore = 0;
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("active");
  document.getElementById("current-0").textContent = roundScore;
  document.getElementById("current-1").textContent = roundScore;
}

function resetPrevDiceValue(){
  var prevDiceValue = [0,0];
}
function diceAnimation() {
  //Code goes here
  var diceDOM = [document.getElementById("dice1"), document.getElementById("dice2")];
  var i = 0;
  diceDOM.forEach(die => {
    var dieAnimationVal;
    die.style.display = "block";
    do{
      dieAnimationVal = Math.floor(Math.random() * 6) + 1;
    }
    while(prevDiceValue[i] === dieAnimationVal); //to make animations not "stall" with previous dice animations or the actual die value
    prevDiceValue[i] = dieAnimationVal;
    die.src = "img/dice-" + dieAnimationVal + ".png";  
    i++;
  });
}

async function waitAnimation() {
  let p = new Promise((resolve, reject) => {
    setTimeout(function () {
      clearInterval(animation);
      resolve();
    }, 2000);
  });
  return p;
}

async function displayDice(dice, animationPromise) {
  await animationPromise;
  var diceDOM = [document.getElementById("dice1"),document.getElementById("dice2")];
  var i = 0;
  diceDOM.forEach(die => {
    die.style.display = "block";
    die.src = "img/dice-" + dice[i] + ".png";  
    i++;
  });
  //update round score if the rolled number was NOT a 1
  if (dice[0] !== 1 && dice[1] !== 1) {
    //check to see if the two dice have the same value
    //if they are different, then set the score and the round score to 0
    //alternate to the next players turn
    if (dice[0] === 6 && dice[1] === 6) {
      scores[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } else {
      //Add score
      dice.forEach(die => {
        roundScore += die;
      });
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    }
  } else {
    //Next Player
    nextPlayer();
  }
}
