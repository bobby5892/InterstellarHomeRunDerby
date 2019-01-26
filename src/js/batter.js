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
		this.batterBoxLimitRight = 500;
		this.batterBoxLimitLeft = 300;

		this.batterLocationX = 550;
		this.batterLocationY = 300;

		/* bind */
		this.keyDownAction.bind(this);
		this.keyUpAction.bind(this);

		console.log(this.batterLocationX + " x " + this.batterLocationY);
	}
	loadImages(){
		this.batterImages = [];

		let drawing = new Image();
		drawing.src = "./dist/images/batter.png"; // can also be a remote URL e.g. http://
		this.batterImages.push(drawing);
	}
	draw(ctx){
   			ctx.drawImage(this.batterImages[0],this.batterLocationX,this.batterLocationY); // draw first batter image
   	}
	keyDownAction(e,batter){
		if(e.code == "Space"){
			
		}
		if(e.code == "ArrowLeft"){
			this.batter.batterLocationX--;
			
		}
		if(e.code == "ArrowRight"){
			this.batter.batterLocationX++;
			
		}
		

	}
	keyUpAction(e){
		if(e.code == "Space"){
			console.log("Up Space");

			/* set swingTime to roundTimer
				swingTime = swingTime - game.pitcher.pitchStart 
				call ballHit*/
		}
		//console.log("keyup" + ` ${e.code}`);
	}

}
