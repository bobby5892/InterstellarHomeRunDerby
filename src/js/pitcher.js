import Sprite from './sprite.js';
export default class Pitcher extends Sprite{

constructor(){
			super();
			console.log("I'm a pitcher");

			/* For calculating ball position */
			this.throwSpeed = null;

			/* Timer for calculating ball position */
			this.Timer = null;
			this.tickTime = 50;

			/* Throw timer variables */
			this.throwStart = null;
		}
	}

/* Throws a pitch */
throwPitch(){
	/*

	*/
	
	}
}
	
}