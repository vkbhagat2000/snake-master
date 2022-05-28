//board 18x18
var blockSize=25;
var rows= 20;
var cols= 20;
var board;
var context;
let score=0;

//snake head location
var snakeX= blockSize*5;
var snakeY= blockSize*5;

var velocityX = 0;
var velocityY = 0;

var snakeBody=[];

//red food location
var foodX;
var foodY;



window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;//20x25
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup",changeDirection);
    // update();
    setInterval(update, 1900/10); //update every 100 milliseconds 
}

function update()
{
    context.fillStyle= "khaki";
    context.fillRect(0, 0, board.width, board.height);//board from 0,0 to 20x25,20x25 black

    context.fillStyle="red";//colour to food(Red)
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX==foodX && snakeY==foodY)//if food and snake collide
    {
        snakeBody.push([foodX, foodY]);
        score+=1;
      
        scorebox.innerHTML ="score:"+score;
        placeFood();//after eating change food loaction
    }

    context.fillStyle="lime";//colour to snake head
    snakeX += velocityX * blockSize;//for reflecting the direction change
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    
}


function changeDirection(e)//changeing direction of snake
{
    if (e.code == "ArrowUp" && velocityY != 1) {//restricting opposite dir movement (!=1,-1)
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }


}


function placeFood()//randomly putting food at any position
{
        //(0-1) * cols -> (0-20) -> (0-19) * 25 working
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
}
// let hiscore= localStorage.getItem("hiscore");
// if(hiscore==null){
//     hiscoreval=0;
//     localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
// }
// else{
//     hiscoreval=JSON.parse(hiscore);
//     hiscorebox.innerHTML="HI SCORE:"+hiscore;
// }
// if(score>hiscoreval){
//     hiscoreval=score;
//     localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
//     hiscorebox.innerHTML="HI SCORE:"+hiscore;
// }