import Character from './Character.js';
import GameObject from './GameObject.js';
import GameEnv from './GameEnv.js';

const CoyoteAnimation = {
    // Sprite properties
    scale: 0.30,
    width: 85,
    height: 165,
    scene1: { row: 0, frames: 4 },
    scene2: { row: 1, frames: 4 }
}

export class CharacterCoyote extends Character {
    constructor(canvas, image, speedRatio) {
        super(
            canvas,
            image,
            speedRatio,
            CoyoteAnimation.width,
            CoyoteAnimation.height,
            CoyoteAnimation.scale
        );
        this.delay = 0;
        this.collidedWithFloor = false; // Track if the coyote already collided with the floor
    }

    // Perform a unique update
    update() {
        // Slower animation
        if (this.delay === 1) {
            this.delay = 0;
            // Perform super update actions (collision checks)
            super.update();
        } else {
            this.delay++;
        }
    }

    size() {
        super.size();
        if (!GameEnv.prevInnerWidth) {
            this.setY(GameEnv.top);
        }
    }

    // Override default GameObject action
    floorAction() {
        // Decrement the score when a collision with the floor occurs
        if (!this.collidedWithFloor) {
            GameEnv.decrementScore(1); // Adjust the decrement value as needed
            GameEnv.updateScoreDisplay(); // Update the score display
            this.collidedWithFloor = true; // Mark the collision to prevent further decrements
        }

        const object = this;
        const canvas = this.canvas;
        const duration = 1000; // Adjust the duration as needed
        let startTime = null;

        // Load the explosion GIF
        const explosionGif = new Image();
        explosionGif.src = './explosion-gif.gif'; // Specify the correct path

        explosionGif.onload = () => {
            // Set the canvas to display the explosion GIF
            canvas.width = CoyoteAnimation.width; // Adjust canvas size as needed
            canvas.height = CoyoteAnimation.height; // Adjust canvas size as needed
            const ctx = canvas.getContext('2d');
            ctx.drawImage(explosionGif, 0, 0, CoyoteAnimation.width, CoyoteAnimation.height);
        }

        function spiral(timestamp) {
            if (!startTime) {
                startTime = timestamp;
            }

            const elapsed = timestamp - startTime;
            if (elapsed < duration) {
                const progress = elapsed / duration;

                // Adjust opacity based on the progress
                canvas.style.opacity = 1 - progress;

                // Rotate the canvas
                const rotationAngle = progress * (Math.random() * 2880); // Adjust the rotation speed as needed
                canvas.style.transform = `rotate(${rotationAngle}deg`;

                requestAnimationFrame(spiral); // continue the animation loop
            } else {
                object.destroy(); // remove object from the game
            }
        }

        // Start the animation
        requestAnimationFrame(spiral);
    }
}

// Can add specific initialization parameters for the dog here
// In this case the dog is following the default character initialization
export function initCoyote(canvasId, image, speedRatio) {
    // Create the Dog character
    var coyote = new CharacterCoyote(canvasId, image, speedRatio);

    // Set initial Animation
    coyote.setFrameY(CoyoteAnimation.scene1.row);
    coyote.setMaxFrame(CoyoteAnimation.scene1.frames);

    // Dog Object
    return coyote;
}

export default CharacterCoyote;
