import Sprite from './sprite.js';
export default class Pitcher extends Sprite{

	constructor(game){
		super(game);
		console.log("I'm a pitcher");
		this.game = game;
			
			/* For calculating ball position */
			this.throwSpeed = null;

			this.pitchThrown = true;

			/* For calculating where the pitch is*/
			this.pitchStart = null;
			this.pitchSpeed = null;

			//  Storage of actual loaded images
			this.pitcherImages = null;
			// For Animation
			this.pitchTime = null;
			
			this.frameIndex = 0;
			this.tickCount = 0;
			this.ticksPerFrame = 20;

			this.pitching = false;

			/* pitcher location */
			this.pitcherX = 480;
			this.pitcherY = 20;

			/* how often to pitch*/
			this.pitchInterval = 800;
			this.loadImages();

	}
	updatePitch() {
		// 0,6,7,8,9,10
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
        	this.tickCount = 1;
            // Go to the next frame
           	this.frameIndex += 1;
        }
        // Stop swinging at end of animation
        if(this.frameIndex==11){
        	this.frameIndex = 0;
        	this.pitching = false;
        }
        else if (this.frameIndex==6){
        	this.game.ball.startBalling();
        }
    }
    // Animation
    startPitch(){
    	this.tickCount = 5;
    	this.pitching = true;
    	this.game.batter.throwIsHit = false;
    }
	throwPitch(){
		this.pitchSpeed = 10;
		this.startPitch();

	}
	loadImages(){
		this.pitcherImages = [];
		let drawing = new Image();
		drawing.src = "./dist/images/pitcher.png"; // can also be a remote URL e.g. http://

		this.pitcherImages.push(drawing);
		
	}

	draw(ctx){
   		//	ctx.drawImage(this.platformImages[0],500,40); // draw first batter image
   			ctx.drawImage(this.pitcherImages[0],
   			this.frameIndex * this.pitcherImages[0].width / 11, //
   			0, //
   			90, // 1314 / 7
   			120, //
   			this.pitcherX, // 
   			this.pitcherY, //
   			90,//
   			120 ); //

   			if(this.pitching){
   				this.updatePitch();
   			}

   			// Trigger Pitches if game is playing
   			if(this.game.roundStarted && this.game.roundTime%this.pitchInterval == 0){
   				this.throwPitch();
   			}
	}
	
}


