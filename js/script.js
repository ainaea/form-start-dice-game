//Element seletion
const playerZero = el('.player--0');
const playerOne = el('.player--1');
const scoreZero = el("#score--0");
const scoreOne = el("#score--1");
const currentZero = el("#current--0");
const currentOne = el("#current--1");
const input0 = el(`#inPlayer0`);
const input1 = el(`#inPlayer1`);
const inputForm = el(`#inputForm`);
const main = el(`#main`);
const inputEnter = el(`#inputEnter`);
const endNum = el(`#endNum`);


const diceEl = el('.dice');
const diceEl1 = el('.dice1');
const btnNew = el('.btn--new');
const btnRoll = el('.btn--roll');
const btnHold = el('.btn--hold');
const name1 = el(`#name--0`);
const name2 = el(`#name--1`);
const names = [];

let scores, currentScore, activePlayer, playing, scoreBoard, endNumber;
//State variable

scores = [0,0];
currentScore = 0;
activePlayer = 0;
playing = true;
scoreBoard = [0,0]

//Setting all values to zero
scoreZero.textContent = 0;
scoreOne.textContent = 0;
currentZero.textContent = 0;
currentOne.textContent = 0;

diceEl.classList.add('hidden');
diceEl1.classList.add('hidden');
playerZero.classList.add('player--active');
playerOne.classList.remove('player--active');


//Add event listener
inputEnter.addEventListener('click', ()=>startGame())


btnRoll.addEventListener("click", function () {
    if (playing){
        //Generate a random dice roll and display display
            const dice = Math.floor(Math.random() *6) + 1;
            diceEl.classList.remove('hidden');
            diceEl.src = `images/dice-${dice}.png`;

            const dice1 = Math.floor(Math.random() *6) + 1;
            diceEl1.classList.remove('hidden');
            diceEl1.src = `images/dice-${dice1}.png`;

            // Add dice to current score
            if (dice !== 1 && dice1 !== 1 && dice1 + dice !== 12) {
                currentScore += dice + dice1;
                el(`#current--${activePlayer}`).textContent = currentScore;
            } else {
                diceThrowOne()
            }

    }
        
})


//Add event listener to the hold button
btnHold.addEventListener('click', function (){
    if (playing && currentScore != 0){
            //Add current score to active players score
        scores[activePlayer] += currentScore;
        el(`#score--${activePlayer}`).textContent = scores[activePlayer];

        //Check if active player's score is >=100
        if (scores[activePlayer] >= endNumber ){
            //change game state
            playing = false;
            // lastWinner = activePlayer;
            el(`#score--${activePlayer}`).textContent = 'Winner';
            el(`#score--${1-activePlayer}`).textContent = 'Loser';
            // el(`#score--${1-activePlayer}`).classList.add('hidden');
            btnRoll.classList.add('hidden');
            btnHold.classList.add('hidden');
            scoreBoard[activePlayer] +=1; 
            //Hide he dice
            diceEl1.classList.add('hidden');
            el(`#current--${0}`).textContent = `${scores[0]}; Overall ${scoreBoard[0]}`;
            el(`#current--${1}`).textContent = `${scores[1]}; Overall ${scoreBoard[1]}`;
            diceEl.src = `images/gam.webp`;
            el(`.player--${activePlayer}`).classList.add('player--winner');
            el(`.player--${activePlayer}`).classList.remove('player--active');

            if ( scoreBoard[0] + scoreBoard[1] == 10 ){
                var winner= noOne;
                scoreBoard[0]>scoreBoard[1] ? winner == 0: null;
                scoreBoard[0]<scoreBoard[1]? winner == 1: null;
                //force game to end
            }

        }

        else{
            diceThrowOne();
        }
    }
    
})


//Add event listener to create new game
btnNew.addEventListener(`click`, function (){
restoreDefault();

})

function el(inc) {
    return  document.querySelector(inc);
}

function diceThrowOne(){
    currentScore = 0;
    el(`#current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer == 0? 1: 0;
    playerZero.classList.toggle('player--active');
    playerOne.classList.toggle('player--active');
}

function restoreDefault(){
// el(`#score--${1-activePlayer}`).classList.remove('hidden');
scores = [0,0];
currentScore = 0;
activePlayer = activePlayer == 0? 1:0;
playing = true;

scoreZero.textContent = 0;
scoreOne.textContent = 0;
currentZero.textContent = 0;
currentOne.textContent = 0;
diceEl.classList.add('hidden');
diceEl1.classList.add('hidden');
playerZero.classList.remove('player--winner');
playerOne.classList.remove('player--winner');
playerZero.classList.remove('player--active');
playerOne.classList.remove('player--active');
el(`.player--${activePlayer}`).classList.add('player--active');
btnRoll.classList.remove('hidden');
btnHold.classList.remove('hidden');
}

function startGame (){
    names[0] = input0.value;
    names[1] = input1.value;
    endNumber = endNum.value

    if (input0.value !='' && input1.value !=''){
    inputForm.classList.add('hidden');
    main.classList.remove('hidden');
    }
    el(`#name--0`).textContent = names[0];
    el(`#name--1`).textContent = names[1];
    // alert(endNumber);

}