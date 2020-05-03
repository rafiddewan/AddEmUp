var scores, roundScore, activePlayer, gamePlaying, prevRoll, scoreAtBeginning; //declare variables
var scores = [0, 0]; //array of score
intialize(); //initialize the game

/**
 * ROLL BUTTON
 */
//callback fucntion, a function we pass that will be called by another function
//in this case event listener is calling the btn function somewhere
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //game state is playing
    //randomize number
    var dice = Math.floor(Math.random() * 6) + 1;
    //display result
    document.querySelector(".dice").style.display = "block";
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "img/dice-" + dice + ".png";
    //update round score if the rolled number was NOT a 1

    if (dice !== 1) {
      //check the previous roll and current roll to see if the dice is the same value
      //if they are different, then set the score and the round score to 0
      //alternate to the next players turn
      if (prevRoll != 0 && prevRoll === 6 && dice === 6) {
        scores[activePlayer] = 0;
        prevRoll = 0;
        roundScore = 0;
        nextPlayer();
      } else {
        prevRoll = dice;
        //Add score
        roundScore += dice;
        document.getElementById(
          "current-" + activePlayer
        ).textContent = roundScore;
      }
    } else {
      //Next Player
      roundScore = 0; //reset round score to 0
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      nextPlayer();
      document.getElementById("current-0").textContent = "0";
      document.getElementById("current-1").textContent = "0";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("active");
      document.querySelector(".dice").style.display = "none";
    }
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
    if (scores[activePlayer] >= 100) {
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
      prevRoll = 0;
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", intialize);

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
  document.querySelector(".dice").style.display = "none";
  gamePlaying = true; //turn on game
  prevRoll = 0;
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
}
