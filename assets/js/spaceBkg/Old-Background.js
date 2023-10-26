import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

export class Background extends GameObject {
    constructor(canvas, image) {
        super(canvas, image);
    }
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y);
        this.ctx.drawImage(this.image, this.x + this.width, this.y);
    }
    size() {
        // Setup background constants from background image
        const ASPECT_RATIO = WIDTH / HEIGHT;
        const ADJUST = 1.42; // visual layer adjust, use “1” for a perfect loop   
         
        // Set Dimensions to match the image width
        const canvasWidth = maxWidth;
        const canvasHeight = canvasWidth / ASPECT_RATIO;  // height is oriented by width
        const canvasLeft = 0;
        const canvasTop = 60;
    
        // Set dimensions for the background canvas
        canvas.width = WIDTH / ADJUST;
        canvas.height = HEIGHT / ADJUST;

        // Set Style properties for the background canvas
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
        canvas.style.position = 'absolute';
        canvas.style.left = `${canvasLeft}px`;
        canvas.style.top = `${canvasTop}px`;
}
}

export default Background;