// declaring important variable of modales
let modal = document.querySelector(".start-game");
let overlay = document.querySelector(".overlay");
let gameover = document.querySelector(".game-over");
let winnerModal = document.querySelector(".winner");

// points and player lives
let playerPoints = 0;
let playerLives = 3;

//this function starts the game
function startGame(){
    modal.classList.add("hide");
    overlay.classList.add("hide");

    // Initial figures
    playerPoints = 0;
}

// run when player looses all lives
function gameOver(){
    overlay.classList.add("show");
    gameover.classList.add("show");
}

//  function to reset the game
function resetGame(){
    window.location.reload(true);
}

// funtion runs to check lives 
function checkLives(){
    if (alllives.length === 0){    
        gameOver()
    }
}

// when player gets all 5 keys and wins game function
function youWin(){
    overlay.classList.add("show");
    winnerModal.classList.add("show");
}

// Enemies class 
let Enemy = function(x, y, speed = 1) {
    // Variables applied to each of our instances
    this.x = x;
    this.y = y;
    this.location = ( x, y);
    this.speed = speed;

    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// To Update the enemy's position, required method for game-Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x += 100 * this.speed * dt;
    
    // collison detection
    if (parseInt(this.x)+ 100 >= playerX && parseInt(this.x) <= playerX + 40 && this.y === playerY){
        console.log("a collision just occured your player diessss");  
        player.reset();
        alllives.pop();
        playerLives -= 1
        if (playerPoints >= 50){
            playerPoints -= 50;
        }
    }
    checkLives();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// player class
let Player = function (x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-pink-girl.png';
};
let playerX
let playerY

Player.prototype.update = function(){
    playerX = this.x;
    playerY = this.y;
}

// this draws player on canvas
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// method to handleInput() 
Player.prototype.handleInput = function(pressedKeys){
    if (pressedKeys === 'left' && this.x > 33){
        this.x -= 100;
    }
    else if (pressedKeys === 'up'&& this.y > 18){
        this.y -= 80;
    }
    else if (pressedKeys === 'right' && this.x < 400){
        this.x += 100
    }
    else if (pressedKeys === 'down' && this.y < 380){
        this.y += 80
    }
};
// to reset player to original position
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
}

// Lives class
let Lives = function(x, y){
    this.x = x;
    this.y = y
    this.sprite = 'images/Heart.png';
};
// render method for Lives class
Lives.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 28, 42);
}

// Key class
let Key = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Key.png';
}
// draws keys on the canvas
Key.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 90, 130);
}


// winning block class to figure out when a player wins
let Winblock = function(x, y){
    this.x = x;
    this.y = y
}

let winblockX
let winblockY
Winblock.prototype.update = function(){
    winblockX = this.x;
    winblockY = this.y;

    if((-Math.abs(winblockY)) == playerY && this.x == playerX){
        allKeys.push(new Key(winblockX, winblockY));
        playerPoints += 100;
        player.reset();
    }
    if (allKeys.length == 5){
        console.log("You win Game");
        youWin();
    } 
}

// class to give player points
let Points = function(x, y, score){
    this.x = x;
    this.y = y;
    this.score = "Your points: "+ playerPoints
}
Points.prototype.render = function(){
    ctx.font = '20px serif';
    ctx.fillText(this.score, this.x, this.y);
}
Points.prototype.update = function(){
    this.score = "Your points: "+ playerPoints
}

// possible X-axis positions on board
let columns = [ -5, -100, -200, -300, -400];
let enemyX;

// possible Y-axis positions on board
let rows = [ 60, 140, 220];
let enemyY;

let enemySpeed;

// randomly pick locations for bugs
setInterval(function instances(){
    enemyX = columns[Math.floor(Math.random() * 5)],
    enemyY = rows[Math.floor(Math.random() * 3)],
    enemySpeed = Math.floor(Math.random() * 15),
    allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed)); 
},500)



// Now instantiate your objects.
// allEnemies- array of all enemy objects 
let allEnemies = [ new Enemy(-8, 60, 3), new Enemy(0, 140, 10), new Enemy(-5, 300, 15)];

// variable called player
let player = new Player( 200, 380);

// instantiate lives
let alllives = [ new Lives(10, 540), new Lives(40, 540), new Lives(70, 540)];

let allKeys = [ ];

// instantiate winning blocks
let winningblocks = [ new Winblock(0, 20), new Winblock(100, 20), new Winblock(200, 20), new Winblock(300, 20), new Winblock(400, 20)];

let points = new Points(350, 570)
 

// This listens for key press 
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
