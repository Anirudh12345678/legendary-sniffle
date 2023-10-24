const gameBoard = document.querySelector("#gameBoard")
const ctx = gameBoard.getContext("2d")
const scoreText = document.querySelector('#scoreText')
const resetBtn = document.querySelector("#resetBtn")
const gameWidth = gameBoard.width
const gameheight = gameBoard.height
const boardClr = "forestgreen"
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black"
const ballClr = "orange"
const ballRadius = 12.5
const paddleSpeed = 50
let intervalId
let ballSpeed=1
let ballX = gameWidth / 2
let ballY = gameheight / 2
let ballXdirection = 0
let ballYdirection = 0
let player1Score = 0
let player2Score = 0
let paddle1 = {
    width: 25,
    height: 100,
    x:0,
    y:0
}

let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth-25,
    y: gameheight-100
}

window.addEventListener("keydown",changeDirection)
resetBtn.addEventListener("click",resetGame)

startGame()

function startGame(){
    createBall()
    nextTick()
}

function nextTick(){
    intervalId = setTimeout( ()=> {
        clearBoard()
        drawPaddles()
        moveBall()
        drawBall(ballX,ballY)
        checkCollision()
        nextTick()
    },10)
}

function clearBoard(){
    ctx.fillStyle = boardClr
    ctx.fillRect(0,0,gameWidth,gameheight)
}

function drawPaddles(){
    ctx.strokeStyle = paddleBorder
    ctx.fillStyle = paddle1Color
    ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height)

    ctx.fillStyle = paddle2Color
    ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height)
}

function createBall(){
    ballSpeed=1
    if(Math.round(Math.random()) == 1){
        ballXdirection = 1
    }
    else{
        ballXdirection = -1
    }
    
    if(Math.round(Math.random()) == 1){
        ballYdirection = Math.random() * 1; //more random directions
    }
    else{
        ballYdirection = Math.random() * -1; //more random directions
    }
    ballX = gameWidth / 2;
    ballY = gameheight / 2;
    drawBall(ballX, ballY);
}

function moveBall(){
    ballX += (ballSpeed*ballXdirection)
    ballY += (ballSpeed*ballYdirection)
}

function drawBall(ballX,ballY){
    ctx.fillStyle = ballClr
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function checkCollision(){
    if(ballY <= 0+ballRadius){
        ballYdirection*= -1
    }
    if(ballY >= gameheight - ballRadius){
        ballYdirection*= -1
    }
    if(ballX <= 0){
        player2Score+=1
        updateScore()
        createBall()
        return
    }
    if(ballX >= gameWidth){
        player1Score+=1
        updateScore()
        createBall()
        return
    }
    if(ballX <= (paddle1.x+paddle1.width+ballRadius)){
        if(ballY > paddle1.y && ballY < (paddle1.y+paddle1.height)){
            ballX = (paddle1.x + paddle1.width) + ballRadius; // if ball gets stuck
            ballXdirection *= -1
            ballSpeed += 0.5;
        }
    }
    if(ballX >= (paddle2.x - ballRadius)){
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
            ballX = paddle2.x - ballRadius;
            ballXdirection *= -1;
            ballSpeed += 0.5;
        }
    }
}

function changeDirection(event){
    const keyPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    switch(keyPressed){
        case(paddle1Up):
            if(paddle1.y > 0){
                paddle1.y -= paddleSpeed;
            }
            break;
        case(paddle1Down):
            if(paddle1.y < gameheight - paddle1.height){
                paddle1.y += paddleSpeed;
            }
            break;
        case(paddle2Up):
            if(paddle2.y > 0){
                paddle2.y -= paddleSpeed;
            }
            break;
        case(paddle2Down):
            if(paddle2.y < gameheight - paddle2.height){
                paddle2.y += paddleSpeed;
            }
            break;
    }
}

function updateScore(){
    scoreText.textContent = `${player1Score} : ${player2Score}`
}

function resetGame(){
    player1Score = 0;
    player2Score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameheight - 100
    };
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXdirection = 0;
    ballYdirection = 0;
    updateScore();
    clearInterval(intervalId);
    startGame();
}