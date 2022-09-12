//set the board with empty squares
let p1Score = document.querySelector('.p1Score')
let p2Score = document.querySelector('.p2Score')
let gameBoard = document.querySelector('.gameBoard')
let rollButton = document.getElementById('rollButton')
let rollText = document.querySelector('.rollText')
let roundCounter = document.querySelector('.roundCounter')
let resetButton = document.getElementById('resetButton')
let playerClick = []
let player1Score = 0
let player2Score = 0
let player1Turn = true
let player2Turn = false
let roundCount = 1
let overallDice
let pickedRandomNum = []

let flag = true
// playerr clicks all the right answers
//player gets a point
//now the player becomes player 2

const squareClicker = (event) => {
    if (player1Turn) {
        playerClick.push(Number(event.target.id))
        if (compareTheArrays(event)) {
            console.log('included')
            player1Score += 1
            p1Score.innerHTML = player1Score
            whoseTurn()
        } else {
            console.log('not included')
            alert("You have lost the game please RESTART")
        }
    } else if (player2Turn) {
        playerClick.push(Number(event.target.id))
        if (compareTheArrays(event)) {
            console.log('included')
            player2Score += 1
            p2Score.innerHTML = player2Score
            whoseTurn()
        } else {
            console.log('not included')
            alert("You have lost the game please RESTART")
        }
    }
}
const compareTheArrays = (event) => {
    // debugger
    return pickedRandomNum.includes(Number(event.target.id))
}
const whoseTurn = () => {
    if (player1Turn) {
        if (playerClick.length === pickedRandomNum.length) {

            playerClick = []
            player1Turn = false
            player2Turn = true
            console.log(`end of player1 turn`)
            return
        }
    } else if (player2Turn) {
        if (playerClick.length === pickedRandomNum.length) {
            playerClick = []
            player2Turn = false
            player1Turn = true
            console.log(`end of player2 turn`)
            roundCount += 1
            roundCounter.innerHTML = roundCount
            return
        }
    }

}
const makeBoard = () => {
    for (let i = 1; i <= 36; i++) {
        let createSquare = document.createElement('div')
        createSquare.addEventListener('click', squareClicker)
        createSquare.innerHTML = i
        createSquare.classList.add('square')
        createSquare.id = i.toString()
        createSquare.dataset.number = i
        gameBoard.append(createSquare)

    }
}
const changeColors = () => {
    for (let i = 0; i < pickedRandomNum.length; i++) {
        let pickedNum = document.getElementById(pickedRandomNum[i])
        pickedNum.style.backgroundColor = 'red' 
    }
}
const changeColorsBack = () => {
    for (let i = 1; i <= 36; i++) {
        let pickedNum = document.getElementById(i)
        pickedNum.style.backgroundColor = 'white'
    }
}
const rollingDices = () => {
    //dice 1
    pickedRandomNum = []
    let dice1 = Math.floor(Math.random() * (7 - 1) + 1)
    console.log(`dice1: ${dice1}`)
    //dice 2
    let dice2 = Math.floor(Math.random() * (7 - 1) + 1)
    console.log(`dice2: ${dice2}`)

    rollText.innerHTML = ` ${dice1 + dice2}`
    console.log(dice1 + dice2)
    overallDice = dice1 + dice2

    for (let i = 1; i <= overallDice; i++) {
        let randonNum = (Math.floor(Math.random() * (36 - 1) + 1))
        if (pickedRandomNum.includes(randonNum)) {
            i--
        } else {
            pickedRandomNum.push(randonNum)
        }

    }
    timer()
    console.log(pickedRandomNum)
    changeColors()
    return overallDice
}
const timer = () => {
    let sec = 10

    const timer = setInterval(function () {
        document.querySelector('.timer').innerHTML = ` ${sec}`;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            changeColorsBack();
        }
    }, 1000);

}
function reset() {
    flag = false
    globalThis.location.reload()
}
const game = () => {
    makeBoard()
    
    rollButton.addEventListener('click', rollingDices)
    resetButton.addEventListener('click', reset)
}
game()