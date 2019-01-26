import Sprite from './sprite.js';
export default class Pitcher extends Sprite{

	constructor(game){
		super();
		console.log("I'm a pitcher");
		this.game = game;
			
			/* For calculating ball position */
			this.throwSpeed = null;

			/* For calculating where the pitch is*/
			this.pitchStart = null;

		}

	}

/* Throws a pitch */
throwPitch(){
	/* set pitchStart to game.roundTimer */
	}


}
	
}