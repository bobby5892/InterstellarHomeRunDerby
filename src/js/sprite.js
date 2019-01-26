export default class Sprite{
	constructor(){
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

		
	}
}