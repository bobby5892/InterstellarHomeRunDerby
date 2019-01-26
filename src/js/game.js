import Batter from './batter.js';
import Sprite from './sprite.js';
import Pitcher from './pitcher.js';
import Ball from './ball.js';

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

		/* Some Defaults */
		this.backgroundColor = "#000000";

		/* Timer */
		this.timer = null;
        this.tickTime = 100;

        this.RoundTime = 0;
 		// Round has begun
        this.roundStarted = true;
    

     /* Call Methods */
        /* stretch canvas */
        this.initCanvas();

         // Round Timer
        this.startRoundTimer();


        // Start Game Rendering  - Last Method
        this.animateGame();
	}

	initCanvas(){

		this.canvas.width = 960;
		this.canvas.height = 540;
	}

	animateGame(){
		this.timer = setInterval(() => {
            // Clear the Canvas
            this.clearCanvas();
             // Draw the platform
            this.platform.draw(this.ctx);
            // Draw the Batter
            this.batter.draw(this.ctx);
            // Draw the pitcher
            this.pitcher.draw(this.ctx);
            // Round Timer Update
            this.roundTimerTick();
            
        }), this.tickTime;
    
	}
	startRoundTimer(){
		this.RoundTime = 6000;
	}
	roundTimerTick(){
		if(this.roundStarted){
			if(this.RoundTime > 0){
				this.RoundTime--;  // so this is 100ms
				console.log(this.roundTime);
			}
		}
	}
	clearCanvas(){

         this.ctx.fillStyle = this.backgroundColor;
         this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

let game;
window.addEventListener('load', () => {
	game = new Game();
});

window.addEventListener('resize', () =>{
	console.log("Window Changed");
});