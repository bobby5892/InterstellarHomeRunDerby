import Sprite from './sprite.js';
export default class Batter extends Sprite{

	constructor(game){
		super(game);
		console.log("Made a Batter");
		this.game = game;

		/* Bind Event Handlers */
		window.addEventListener('keydown', this.keyDownAction.bind(this.game));
		window.addEventListener('keyup',   this.keyUpAction.bind(this.game));

		/* Will hold an array of prerendered batting images */
		this.batterImages = null;
		this.loadImages();

		/* Time at which bat is swung from roundTimer */
		this.swingTime = null;
		this.batterBoxLimitRight = 575;
		this.batterBoxLimitLeft = 525;

		this.batterLocationX = 550;
		this.batterLocationY = 315;

		/* bind */
		this.keyDownAction.bind(this);
		this.keyUpAction.bind(this);

		console.log(this.batterLocationX + " x " + this.batterLocationY);
		
		//http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
		
		this.frameIndex = 0;
		this.tickCount = 0;
		this.ticksPerFrame = 20;
		this.swinging = false;
	}
	loadImages(){
		this.batterImages = [];

		let drawing = new Image();
		drawing.src = "./dist/images/batter.png"; // can also be a remote URL e.g. http://
		this.batterImages.push(drawing);

	}
	draw(ctx){
   			//ctx.drawImage(this.batterImages[0],this.batterLocationX,this.batterLocationY); // draw first batter image
   			ctx.drawImage(this.batterImages[0],
   			this.frameIndex * this.batterImages[0].width / 7, //
   			0, //
   			186, // 1314 / 7
   			154, //
   			this.batterLocationX, // 
   			this.batterLocationY, //
   			186,//
   			154 ); //

   			if(this.swinging){
   				this.updateSwing();
   			}
   	}
   	updateSwing() {
   		console.log("update swing" + this.tickCount);
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
        	this.tickCount = 1;
            // Go to the next frame
            this.frameIndex += 1; 
        }
        // Stop swinging at end of animation
        if(this.frameIndex==7){
        	this.frameIndex = 0;
        	this.swinging = false;
        }
    }
    startSwing(){
    	console.log("starting swing"); 
    	this.swinging = true;
    	this.frameIndex = 0;
    	this.tickCount = 0;
    }
	keyDownAction(e,batter){
		if(e.code == "Space"){
			this.batter.startSwing();
		}
		if(e.code == "ArrowLeft"){
			if(this.batter.batterLocationX > this.batter.batterBoxLimitLeft){
				this.batter.batterLocationX--;
			}
		}
		if(e.code == "ArrowRight"){
			if(this.batter.batterLocationX < this.batter.batterBoxLimitRight){
				this.batter.batterLocationX++;
			}
		}
		

	}
	keyUpAction(e){
		if(e.code == "Space"){
		//	console.log("Up Space");

			/* set swingTime to roundTimer
				swingTime = swingTime - game.pitcher.pitchStart 
				call ballHit*/
		}
		//console.log("keyup" + ` ${e.code}`);
	}

}
