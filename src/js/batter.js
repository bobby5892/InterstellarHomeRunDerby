import Sprite from './sprite.js';
export default class Batter extends Sprite{

	constructor(game){
		super(game);
		
		this.game = game;

		/* Bind Event Handlers */
		window.addEventListener('keydown', this.keyDownAction.bind(this.game));
		window.addEventListener('keyup',   this.keyUpAction.bind(this.game));

		/* Will hold an array of prerendered batting images */
		this.batterImages = null;
		this.loadImages();

		/* Time at which bat is swung from roundTimer */
		this.swingTime = null;
		this.batterBoxLimitRight = 550;
		this.batterBoxLimitLeft = 470;

		this.batterLocationX = 480;
		this.batterLocationY = 315;

		/* bind */
		this.keyDownAction.bind(this);
		this.keyUpAction.bind(this);

	
		this.throwIsHit = false;
		//http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
		
		this.maxShowFoulTimer = 300;
		this.foultimer = 0;

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

		drawing = new Image();
		drawing.src = "./dist/images/foul.png"
		this.batterImages.push(drawing);		
	}
	draw(ctx){
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
   			this.checkHit();

   			if(this.foultimer > 0){
   				this.yellFoul();
   				this.foultimer -= 1;
   			}
   			
   	}
   	updateSwing() {
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
    	this.swinging = true;
    	this.frameIndex = 0;
    	this.tickCount = 0;
    	
    }
    yellFoul(){
		/*let font = "60px Arial";
		let fontColor = "yellow";
    	this.game.ctx.font = font;
		this.game.ctx.fillStyle = fontColor;
		this.game.ctx.fillText("FOUL", 440, 250);*/
		this.game.ctx.drawImage(this.batterImages[1],440,250);
    }
    checkHit(){
		if(this.frameIndex == 5){
			if(this.game.ball.ballY > 270  && this.game.ball.ballY < 320){
				//console.log("hit" + this.throwIsHit);
				if(!this.throwIsHit){
					this.throwIsHit = true;
					this.game.ball.balling=false;
					this.game.ball.frameIndex=-1;
					this.game.roundScore +=1;
					this.startHitAnimation(this.game.ball.ballX,this.game.ball.ballY);
				}
			}
			else if((this.game.ball.ballY > 200  && this.game.ball.ballY < 269) || 
				(this.game.ball.ballY > 321  && this.game.ball.ballY < 350)){
				if(!this.throwIsHit){
					//console.log("fouler");
					this.throwIsHit = true;
					this.foultimer = this.maxShowFoulTimer;
					this.yellFoul();
				}
    		}
		}
	}
	keyDownAction(e,batter){
		if(e.code == "Space" || e.code == "KeyW"){
			//console.log("space" + this.batter.game.roundTime);
			if(this.batter.game.roundTime == 0){
			//	console.log("timer done");
				this.batter.game.startGame();
			}
			
		}
		if(e.code == "ArrowLeft" || e.code == "KeyA"){
			if(this.batter.batterLocationX > this.batter.batterBoxLimitLeft){
				this.batter.batterLocationX--;
			}
		}
		if(e.code == "ArrowRight" || e.code == "KeyD"){
			if(this.batter.batterLocationX < this.batter.batterBoxLimitRight){
				this.batter.batterLocationX++;
			}
		}
 	}
	keyUpAction(e){
		//console.log(e.code);
		if(e.code == "Space" || e.code == "KeyW"){
			console.log(this.batter.game.ball.ballY);
			this.batter.startSwing();
			/* set swingTime to roundTimer
				swingTime = swingTime - game.pitcher.pitchStart 
				call ballHit*/
		}

		//console.log("keyup" + ` ${e.code}`);
	}
	startHitAnimation(x,y){
		this.game.ball.balling = false;
		this.game.ball.hitAnimation = true;
		this.game.ball.ballX = x;
		this.game.ball.ballY = y;
	}
}
