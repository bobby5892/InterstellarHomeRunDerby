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
		drawing.src = "./dist/images/background.png"; // can also be a remote URL e.g. http://
		this.backgroundImages.push(drawing);
		drawing = new Image();
		drawing.src = "./dist/images/keys.png";
		this.backgroundImages.push(drawing);

		this.audio = [];
		this.audio.push(new Audio('./dist/audio/47356__fotoshop__oof.wav')); //0
		this.audio.push(new Audio('./dist/audio/fart01.wav')); // 1
		this.audio.push(new Audio('./dist/audio/hitbat_v1.wav')); // 2
		this.audio.push(new Audio('./dist/audio/stadiumcheer1.wav')); // 3
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
            // Round Timer Update
            this.roundTimerTick();
            

        }), this.tickTime;
	}
	startGame(){
		this.startroundTimer();
		this.roundStarted = true;
		this.roundScore = 0;
	}
	startroundTimer(){
		this.roundTime = 6000;
	}
	roundTimerTick(){
		if(this.roundStarted){
			if(this.roundTime > 0){
				this.roundTime--;  // so this is 100ms
				//console.log(this.roundTime);
			}
		}
	}
	clearCanvas(){
         //this.ctx.fillStyle = this.backgroundColor;
         //this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.drawImage(this.backgroundImages[0],0,0); // draw first batter image
		this.ctx.drawImage(this.backgroundImages[1],0,350);
	}
}
let game;
window.addEventListener('load', () => {
	game = new Game();
});
window.addEventListener('resize', () =>{
	console.log("Window Changed");
});