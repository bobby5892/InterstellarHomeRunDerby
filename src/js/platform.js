import Sprite from './sprite.js';
export default class Platform extends Sprite{
	constructor(game){
		super(game);
		this.game = game;
		console.log("I'm a platform");
		
		
		this.platformImages = null;

		this.loadImages();
	}
	loadImages(){
		this.platformImages = [];
		let drawing = new Image();
		drawing.src = "./dist/images/platform.png"; // can also be a remote URL e.g. http://

		this.platformImages.push(drawing);
		
	}
	draw(ctx){
   			ctx.drawImage(this.platformImages[0],this.centerX+(this.platformImages[0].width/2),this.game.canvas.height-this.platformImages[0].height); // draw first batter image
	}
}