import Character from './Character.js';

const CoyoteAnimation = {
    // Sprite properties
    scale: 0.30,
    width: 85,
    height: 165,
	scene1: { row: 0, frames: 4 },
	scene2: { row: 1, frames: 4 }
}

export class CharacterCoyote2 extends Character{
    // constructors sets up Character object 
    constructor(canvas, image, speedRatio){
        super(canvas, 
            image, 
            speedRatio,
            CoyoteAnimation.width, 
            CoyoteAnimation.height, 
            CoyoteAnimation.scale
        );
        this.delay = 0;
        
    }

    collisionAction() {
        this.remove(); // Remove the coyote when it collides with something
        this.canvas.remove();
        /*
        canvas.remove()
        backgroundImage.src="{{overFile}}"
        */
    }

    collisionAction() {
        // Check for collisions with other game objects (e.g., coyote)
        for (const monkey of GameObject.gameObjectArray) {
            // Check if the monkey and coyote have collided based on their positions
            if (
                this.x < monkey.x + monkey.width &&
                this.x + this.width > monkey.x &&
                this.y < monkey.y + monkey.height &&
                this.y + this.height > monkey.y
            ) {
                // Handle the collision, e.g., show the game over screen
                showGameOverScreen();
                // You can also add other actions here, like stopping the game loop
            }
        }
    }

    // Perform a unique update
    update() {
        // slower animation 
        if (this.delay === 1) {
            this.delay = 0;
            // Perform super update actions (collision checks)
            super.update();
        } else {
            this.delay++;
        }
    }

}


// Can add specific initialization parameters for the dog here
// In this case the dog is following the default character initialization
export function initCoyote(canvasId, image, speedRatio){
    // Create the Dog character
    var coyote = new CharacterCoyote2(canvasId, image, speedRatio);

    // Set initial Animation
    coyote.setFrameY(CoyoteAnimation.scene1.row);
    coyote.setMaxFrame(CoyoteAnimation.scene1.frames);

    // Dog Object
    return coyote;
}

export default CharacterCoyote2;