import Sprite from './sprite.js';
export default class Batter extends Sprite{

	constructor(game){
		super(game);
		
		this.game = game;
		/* Bind Event Handlers */
		window.addEventListener('keydown', this.keyDownAction.bind(this.game));
		window.addEventListener('keyup',   this.keyUpAction.bind(this.game));
		// More needs done then this - need 
		window.addEventListener('touchstart',this.keyDownAction.bind(this.game));
		window.addEventListener('click',this.keyDownAction.bind(this.game));

		/* Will hold an array of prerendered batting images */
		this.batterImages = null;
		this.loadImages();

		/* Time at which bat is swung from roundTimer */
		this.swingTime = null;
		this.batterBoxLimitRight = 550;
		this.batterBoxLimitLeft = 470;

		this.positionX = 480;
		this.positionY = 315;

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
   			this.positionX, // 
   			this.positionY, //
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

		this.game.ctx.drawImage(this.batterImages[1],440,250);
    }
    checkHit(){
		if(this.frameIndex == 5){
			if(this.game.ball.positionY > 290  && this.game.ball.positionY < 340){
				if(!this.throwIsHit){
					this.throwIsHit = true;
					this.game.ball.balling=false;
					this.game.ball.frameIndex=-1;
					this.game.roundScore +=1;
					this.game.audio[2].play();
					this.startHitAnimation(this.game.ball.positionX,this.game.ball.positionY);
				}
			}
			else if((this.game.ball.positionY > 200  && this.game.ball.positionY < 269) || 
				(this.game.ball.positionY > 321  && this.game.ball.positionY < 350)){
				if(!this.throwIsHit){
					this.throwIsHit = true;
					this.foultimer = this.maxShowFoulTimer;
					this.game.audio[1].play();
					this.yellFoul();
				}
    		}
		}
	}
	keyDownAction(e,batter){
		/* For touch devices */
		if(e.code == null) {
			if(this.batter.game.roundTime <= 0){
				if(this.batter.game.firstload){
					this.batter.game.firstload = false;
				}
				this.batter.game.startGame();
			}
			this.batter.startSwing();
		}
		/* For Keyboard / Mouse */
		if(e.code == "Space" || e.code == "KeyW"){
			//console.log("space" + this.batter.game.roundTime);
			if(this.batter.game.roundTime <= 0){
				if(this.batter.game.firstload){
					this.batter.game.firstload = false;
				}
				this.batter.game.startGame();
			}
			
		}
		if(e.code == "ArrowLeft" || e.code == "KeyA"){
			if(this.batter.positionX > this.batter.batterBoxLimitLeft){
				this.batter.positionX--;
			}
		}
		if(e.code == "ArrowRight" || e.code == "KeyD"){
			if(this.batter.positionX < this.batter.batterBoxLimitRight){
				this.batter.positionX++;
			}
		}
 	}
	keyUpAction(e){
		//console.log(e.code);
		if(e.code == "Space" || e.code == "KeyW"){
			//console.log(this.batter.game.ball.positionY);
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
		this.game.ball.positionX = x;
		this.game.ball.positionY = y;
	}
}
