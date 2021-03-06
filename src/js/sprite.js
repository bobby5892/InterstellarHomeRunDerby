/*
	Interstellar Home Run Derby
	License: Attribution-NonCommercial-ShareAlike 3.0 United States (CC BY-NC-SA 3.0 US)

	Developed By

	Lead Art 
	----------
	Eric Hill  
		twitter.com/erichill1232
		instagram.com/eric.hill.1232
		https://www.deviantart.com/beza
		https://nightmarenetherworld.tumblr.com/

	Lead Programming
	----------
	Robert Moore
		http://www.eugeneprogramming.com
		https://www.linkedin.com/in/robertbenmoore/

	Programming
	----------
	Gordon Wallace

	Q & A / System Design
	----------
	Jack Kimball

	Github Copy @ 
	https://github.com/bobby5892/InterstellarHomeRunDerby



*/
export default class Sprite{
	constructor(game){
		this.game = game;
		/* Where on the canvas is it */
		this.positionX = 0;
		this.positionY = 0;
		/* How fast is it going */
		this.speed = 0;
		
		/* Where is it going */

		this.destinationX = 0;
		this.destinationY = 0;

		/* Do we draw this in the canvas */
		this.visible = false;

		/* Center of Screen */
		this.centerX = this.game.canvas.width/2;
		this.centerY = this.game.canvas.height/2;

		
	}
}