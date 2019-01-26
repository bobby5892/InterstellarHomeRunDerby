import Batter from './batter.js';
import Sprite from './sprite.js';
import Pitcher from './pitcher.js';
import Ball from './ball.js';
class Game{
	constructor(){
		console.log("game.js");
		this.canvas =  document.getElementsByTagName("canvas")[0];
        this.ctx    = this.canvas.getContext('2d');

		this.batter = new Batter();
		this.pitcher = new Pitcher();
		this.ball = new Ball();

		/* Some Defaults */
		this.backgroundColor = "#000000";

		/* Timer */
		this.timer = null;
        this.tickTime = 100;

        /* stretch canvas */
        this.initCanvas();
        // Start Game Rendering
        this.animateGame();
	}
	initCanvas(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}
	animateGame(){
		this.timer = setInterval(() => {
            // Clear the Canvas
            this.clearCanvas();
            // Draw the Batter
            this.batter.draw(this.ctx);

        }), this.tickTime;
    
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