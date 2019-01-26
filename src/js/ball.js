import Sprite from './sprite.js';
export default class Ball extends Sprite{
	constructor(game){
		super(game);
		console.log("I'm a ball");

		this.ballImages = null;
		this.ballX = 490;
		this.ballY = 20;
		this.loadImages();

		this.Ydelta = 1;

		this.balling = false;
		this.frameIndex = 0;
		this.tickCount = 0;
		this.ticksPerFrame = 85;



	}
	loadImages(){
		this.ballImages = [];
		let drawing = new Image();
		drawing.src = "./dist/images/ball.png"; // can also be a remote URL e.g. http://

		this.ballImages.push(drawing);
		
	}
	updateBall(){
	// 0,6,7,8,9,10
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
        	this.tickCount = 1;
            // Go to the next frame
           	this.frameIndex -= 1;
        }
        // Stop swinging at end of animation
        
        if(this.frameIndex==0){
        	this.frameIndex = 7;
        	this.balling = false;
        }
        this.ballY += this.Ydelta;
    }
	startBalling(){
		this.balling = true;
		this.frameIndex=6;
		/* Starting Location */
		this.ballX = 490;
		this.ballY = -20;

		this.destinationX = 480;
		this.destinationY = 540;
	}
	draw(ctx){
   			//ctx.drawImage(this.ballImages[0],this.ballX,this.ballY); // draw first batter image
   			ctx.drawImage(this.ballImages[0],
   			this.frameIndex * this.ballImages[0].width / 6, //
   			0, //
   			50, // 1314 / 7
   			90, //
   			this.ballX, // 
   			this.ballY, //
   			50,//
   			90 ); //

   			if(this.balling){
   				this.updateBall();
   			}
   			// Trigger Pitches if game is playing
   			if(this.game.roundStarted && this.game.RoundTime%this.game.pitcher.pitchInterval == 0){
   				this.startBalling();
  			}

  			// Stop the ball
  			if(this.BallY > window.innerHeight){
  				this.balling = false;
  			}
	}
}