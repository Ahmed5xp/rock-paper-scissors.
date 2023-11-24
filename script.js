const gameElements = {
    gameScore:document.querySelector('.score'),
    gameWrapper:document.querySelector('.game-wrapper'),
    gameButtons:Array.from(document.querySelector('.game-wrapper').children),
    selection:document.querySelector('.selection-container'),
    playerSelectionBtn:document.querySelector('.player-selection'),
    houseSelectionBtn:document.querySelector('.house-selection'),
    thePlayer:document.querySelector('.the-player'),
    theComputer:document.querySelector('.the-computer'),
    gameResult:document.querySelector('.game-result'),
    gameResultText:document.querySelector('.game-result-text'),
    replay:document.querySelector('.repaly'),
    rulesBtn:document.querySelector('.rules-btn'),
    rulesContainer:document.querySelector('.rules-container'),
    closeBtn:document.querySelector('.close-btn'),
    overlay:document.querySelector('.overlay')
}

let houseSelection,playerSelection
let result = false

let score = localStorage.getItem('score') ? (JSON.parse(localStorage.getItem('score'))) : 0
console.log('score :',score) //for test and depug

gameElements.gameScore.textContent = score

for (let elem of gameElements.gameButtons) {
    elem.addEventListener('click',playRound)
}

function computerPlay () {
    let randomSelection = Math.floor(Math.random() * gameElements.gameButtons.length)
    houseSelection = gameElements.gameButtons[randomSelection].className
    return houseSelection
}

function playRound(event) {
    playerSelection = event.currentTarget.className
    houseSelection = computerPlay()
    getResult(playerSelection,houseSelection)
    renderResultScreen()
}

function getResult(playerSelection, houseSelection) {
    if (playerSelection === houseSelection) {
        result = undefined;
    } else if (playerSelection === 'paper' && houseSelection === 'rock') {
        result = true;
    } else if (playerSelection === 'rock' && houseSelection === 'sissors') {
        result = true;
    } else if (playerSelection === 'sissors' && houseSelection === 'paper') {
        result = true;
    } else {
        result = false;
    }
    return result;
}

function printResult () {
    switch (result) {
        case undefined:
            gameElements.gameResultText.textContent = 'it\'s a Draw'
            break;
            case false:
            // display the player selection when he lose
            gameElements.theComputer.classList.add(`${houseSelection}`)
            gameElements.gameResultText.textContent = 'you lose'
            score--
            gameElements.gameScore.textContent = score
            break;
        case true:
            // to display the player selection if he wins
            gameElements.thePlayer.classList.add(`${playerSelection}`)
            score++
            gameElements.gameResultText.textContent = 'you win'
            gameElements.gameScore.textContent = score
            break;
    }
    localStorage.setItem('score', JSON.stringify(score))
}

function renderResultScreen () {
    gameElements.gameWrapper.style.display = 'none'
    gameElements.selection.style.display = 'grid'
    gameElements.gameResult.style.display = 'none'
    gameElements.houseSelectionBtn.style.display = 'none'
    // add selected button to player selection 
    gameElements.thePlayer.classList.add(`${playerSelection}`);
    console.log(`your pick: ${playerSelection}`);

    setTimeout(function () {
        gameElements.theComputer.classList.add(`${houseSelection}`);
        console.log(`house pick: ${houseSelection}`); // for testing and debugging
        gameElements.houseSelectionBtn.style.display = 'grid';
        // show result box after another delay
        setTimeout(function () {
            printResult();
            gameElements.gameResult.style.display = 'flex';
        }, 500)
    }, 1000)

}

// hide result screen and reset all to game screen
function renderGameScreen() {
    gameElements.gameWrapper.style.display = 'grid';
    gameElements.gameResult.style.display = 'none';
    gameElements.selection.style.display = 'none';
    gameElements.thePlayer.classList.remove(`${playerSelection}`);
    gameElements.theComputer.classList.remove(`${houseSelection}`);
}

const displayRules = () => {
    gameElements.rulesContainer.style.display = 'flex'
    gameElements.overlay.style.display = 'flex'
}
const hideRules = () => {
    gameElements.rulesContainer.style.display = 'none'
    gameElements.overlay.style.display = 'none'
}
