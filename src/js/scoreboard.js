import Sprite from './sprite.js';
export default class Scoreboard extends Sprite{
	constructor(game){
		super(game);
		this.game = game;
		console.log("I'm a scoreboard");
		this.scoreboardImages = null;
		this.loadImages();
	}
	loadImages(){
		this.scoreboardImages = [];
		let drawing = new Image();
		drawing.src = "./dist/images/scoreboard.png"; // can also be a remote URL e.g. http://

		this.scoreboardImages.push(drawing);

	}
	draw(ctx){
   			ctx.drawImage(this.scoreboardImages[0],0,0); // draw first batter image
	}
}