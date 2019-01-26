import Sprite from './sprite.js';
export default class Platform extends Sprite{
	constructor(game){
		super();
		console.log("I'm a platform");
		console.log(this.centerX);
		console.log(window.innerWidth);
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
   			ctx.drawImage(this.platformImages[0],this.centerX,0); // draw first batter image
	}
}