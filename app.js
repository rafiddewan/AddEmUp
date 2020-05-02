var scores, roundScore, activePlayer; //declare variables

scores = [0, 0]; //scores initially set to 0
roundScore = 0; //round score is initially set to 0
activePlayer = 1; //0 for player 1, 1 for player 2
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; Don't want italics 
//document.querySelector('#current-'  + activePlayer).textContent = dice;
document.getElementById('score-0').textContent = scores[0];
document.getElementById('score-1').textContent = scores[1];
document.getElementById('current-0').textContent = roundScore;
document.getElementById('current-0').textContent = roundScore;

document.querySelector('.dice').style.display = 'none';

//callback fucntion, a function we pass that will be called by another function
//in this case event listener is calling the btn function somewhere
document.querySelector('.btn-roll').addEventListener('click', function(){
    //randomize number
    var dice = Math.floor(Math.random() * 6) + 1;

    //display result
    document.querySelector('.dice').style.display = 'block';
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'img/dice-' + dice + '.png';
    //update round score if the rolled number was NOT a 1

    if(dice !== 1){
        //Add score
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        //Next Player
        roundScore = 0; //reset round score to 0
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    }
});