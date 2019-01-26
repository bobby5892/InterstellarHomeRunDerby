import Sprite from './sprite.js';
export default class Pitcher extends Sprite{

	constructor(game){
		super(game);
		console.log("I'm a pitcher");
		this.game = game;
			
			/* For calculating ball position */
			this.throwSpeed = null;


			/* For calculating where the pitch is*/
			this.pitchStart = null;
			this.pitchSpeed = null

	}
	throwPitch(){
		this.pitchStart = this.game.roundTime;
		this.pitchSpeed = 10;
		
	}
	
}


