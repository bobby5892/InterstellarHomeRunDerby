import Sprite from './sprite.js';
export default class Ball extends Sprite{
	constructor(game){
		super(game);
		console.log("I'm a ball");
	}
}