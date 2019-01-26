import Sprite from './sprite.js';
export default class Pitcher extends Sprite{

	constructor(game){
		super(game);
		console.log("I'm a pitcher");

			/* For calculating ball position */
			this.throwSpeed = null;
	}
}
/* Throws a pitch */

