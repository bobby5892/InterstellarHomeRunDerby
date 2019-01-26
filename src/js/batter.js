import Sprite from './sprite.js';
export default class Batter extends Sprite{

	constructor(){
		super();
		console.log("Made a Batter");


		/* Bind Event Handlers */
		window.addEventListener('keydown', this.keyDownAction);
		window.addEventListener('keyup', this.keyUpAction);

		/* Will hold an array of prerendered batting images */
		this.batterImages = null;
		this.loadImages();
	}
	loadImages(){
		this.batterImages = [];

		let drawing = new Image();
		drawing.src = "./dist/images/batter.png"; // can also be a remote URL e.g. http://

		this.batterImages.push(drawing);
		
	}
	draw(ctx){
   			ctx.drawImage(this.batterImages[0],0,0); // draw first batter image
	}
	keyDownAction(e){
		if(e.code == "Space"){
			console.log("Down Space");
		}
		//console.log("keydown"+ ` ${e.code}`);

	}
	keyUpAction(e){
		if(e.code == "Space"){
			console.log("Up Space");
		}
		//console.log("keyup" + ` ${e.code}`);
	}

}
