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
			this.pitchSpeed = null
			this.loadImages();

	}
	throwPitch(){
		this.pitchStart = this.game.roundTime;
		this.pitchSpeed = 10;

	}
	loadImages(){
		this.platformImages = [];
		let drawing = new Image();
		drawing.src = "./dist/images/pitcher.png"; // can also be a remote URL e.g. http://

		this.platformImages.push(drawing);
		
	}
	draw(ctx){
   			ctx.drawImage(this.platformImages[0],500,40); // draw first batter image
	}
	
}


