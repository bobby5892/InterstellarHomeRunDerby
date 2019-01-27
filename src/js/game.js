import Batter from './batter.js';
import Sprite from './sprite.js';
import Pitcher from './pitcher.js';
import Ball from './ball.js';
import Scoreboard from './scoreboard.js';
import Platform from './platform.js';
class Game{
	constructor(game){
		console.log("game.js");
		this.canvas =  document.getElementsByTagName("canvas")[0];
        this.ctx    = this.canvas.getContext('2d');

        /* Refactor into array of sprites */

		
		this.batter = new Batter(this);
		this.pitcher = new Pitcher(this);
		this.ball = new Ball(this);
		this.platform = new Platform(this);
		this.scoreboard = new Scoreboard(this);
 
		/* Some Defaults */
		this.backgroundColor = "#000000";

		/* Timer */
		this.timer = null;
        this.tickTime = 100;

        this.roundTime = 0;
 		// Round has begun
        this.roundStarted = true;
    	
    	// Current Number of Runs
        this.roundScore = 0;
        this.backgroundImage = null;

        this.audio = null;
        /* array of images */
        this.backgroundImage = null;

        this.showPlayAgain = false;
	    /* Call Methods */
        /* stretch canvas */
        this.initCanvas();
      
 
         // Round Timer
        this.startroundTimer();

        // Start Game Rendering  - Last Method
        this.animateGame();
	}
	initCanvas(){ 
		this.canvas.width = 960;
		this.canvas.height = 540;
		this.backgroundImages = [];
		let drawing = new Image();
		drawing.src = "./dist/images/background.png"; // can also be a remote URL e.g. http:// // 0
		this.backgroundImages.push(drawing);
		
		drawing = new Image();
		drawing.src = "./dist/images/background-stars.png"; // 1
		this.backgroundImages.push(drawing);

		drawing = new Image();
		drawing.src = "./dist/images/background-stars2.png"; // 2
		this.backgroundImages.push(drawing);
		
		drawing = new Image();
		drawing.src = "./dist/images/keys.png"; // 3
		this.backgroundImages.push(drawing);

		drawing = new Image();
		drawing.src = "./dist/images/playagain.png"; // 4
		this.backgroundImages.push(drawing);

		this.audio = [];
		this.audio.push(new Audio('./dist/audio/47356__fotoshop__oof.wav')); //0
		this.audio.push(new Audio('./dist/audio/fart01.wav')); // 1 / 
		this.audio.push(new Audio('./dist/audio/hitbat_v1.wav')); // 2 / 
		this.audio.push(new Audio('./dist/audio/stadiumcheer1.wav')); // 3 / 
		this.audio.push(new Audio('./dist/audio/whooshbat1.wav')); //4 
		

	}
	animateGame(){
		this.timer = setInterval(() => {
            // Clear the Canvas
            this.clearCanvas();
             // Draw the platform
            this.platform.draw(this.ctx);
            // Draw the pitcher
            this.pitcher.draw(this.ctx);
            // Draw the scoreboard
            this.scoreboard.draw(this.ctx);
             // Draw the Ball
            this.ball.draw(this.ctx);
              // Draw the Batter
            this.batter.draw(this.ctx);

            // draw play again
            if(this.showPlayAgain){
         		this.drawPlayAgain();
            }

            // Round Timer Update
            this.roundTimerTick();
            

        }), this.tickTime;
	}
	startGame(){
		this.startroundTimer();
		this.roundStarted = true;
		this.roundScore = 0;
		this.showPlayAgain = false;
	}
	startroundTimer(){
		this.roundTime = 15000;
		//this.roundTime = 1000;
	}
	roundTimerTick(){
		if(this.roundStarted){
			if(this.roundTime > 0){
				this.roundTime--;  // so this is 100ms
			}
		}
		/* Lets show the play again */
		if(this.roundTime == 0){
			this.showPlayAgain = true;
			
		}
	}
	drawPlayAgain(){
		this.ctx.drawImage(this.backgroundImages[4],375,110);
		this.ctx.fillText("[space]", 450 , 250);
	}
	clearCanvas(){
		/*  main background */
		this.ctx.drawImage(this.backgroundImages[0],0,0); // draw first batter image
		
		/*  stars alt */
		if(this.roundTime%2 == 0){
			this.ctx.drawImage(this.backgroundImages[1],0,0);
		}
		/*  stars alt1 */
		else{ 
			this.ctx.drawImage(this.backgroundImages[2],0,0);
		}
		
		/*  keys */
		this.ctx.drawImage(this.backgroundImages[3],50,360);

	}
}
let game;
window.addEventListener('load', () => {
	game = new Game();
});
window.addEventListener('resize', () =>{
	console.log("Window Changed");
});