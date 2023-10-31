import GameEnv from './GameEnv.js';
import Character from './Character.js';

const MonkeyAnimation = {
    // Sprite properties
    scale: 0.25,
    width: 225,
    height: 225,
    d: { row: 0, frames: 0, idleFrame: { column: 0, frames: 0 } }, // Walk right with 'd' key
    a: { row: 0, frames: 0, idleFrame: { column: 0, frames: 0 } }, // Walk left with 'a' key
    w: { row: 0, frames: 0 }
}

const defaultIdleFrame = { row: 0, column: 0, frames: 0 };
const gameOverContainer = document.getElementById('gameOverContainer');

function showGameOverScreen() {
    // Make the game over container visible
    gameOverContainer.classList.remove('hidden');
    // You may want to pause the game loop and perform other actions here
}

export class CharacterMonkey extends Character {
    // constructors sets up Character object 
    constructor(monkeyCanvas, image, speedRatio) {
        super(monkeyCanvas,
            image,
            speedRatio,
            MonkeyAnimation.width,
            MonkeyAnimation.height,
            MonkeyAnimation.scale
        );
        // Initial position at the bottom center
        this.position = {
            x: 447.5,
            y: 1920
        }
        this.isIdle = true;
        this.gravityEnabled = false;

        this.yVelocity = 0;
    }

    // Monkey perform a unique update
    update() {
        if (this.frameY === MonkeyAnimation.a.row && !this.isIdle) {
            this.x -= this.speed;  // Move the monkey to the left
        }
        else if (this.frameY === MonkeyAnimation.d.row && !this.isIdle) {
            this.x += this.speed;
        } else if (GameEnv.bottom <= this.y) {
            // do idle frame
            this.setFrameY(defaultIdleFrame.row);
            this.setFrameX(defaultIdleFrame.column);
            this.setMaxFrame(defaultIdleFrame.frames);
            this.idle = true;
        }

        if (GameEnv.bottom > this.y) {
            // gravity (using acceleration instead of velocity, needed for jump implementation)
            this.yVelocity += 0.5;
        } else {
            // normal force (basically disables gravity if on the ground)
            this.yVelocity = Math.min(0, this.yVelocity);
        }

        this.y += this.yVelocity;

        // Perform super update actions
        super.update();
    }

    collisionAction() {
        // Check for collisions with other game objects (e.g., coyote)
        for (const coyote of GameObject.gameObjectArray) {
            // Check if the monkey and coyote have collided based on their positions
            if (
                this.x < coyote.x + coyote.width &&
                this.x + this.width > coyote.x &&
                this.y < coyote.y + coyote.height &&
                this.y + this.height > coyote.y
            ) {
                // Handle the collision, e.g., show the game over screen
                showGameOverScreen();
                // You can also add other actions here, like stopping the game loop
            }
        }
    }
}

gameOverContainer.style.display = 'none';

// Can add specific initialization parameters for the monkey here
// In this case the monkey is following the default character initialization
export function initMonkey(canvasId, image, gameSpeed, speedRatio) {
    // Create the Monkey character
    var monkey = new CharacterMonkey(canvasId, image, gameSpeed, speedRatio);

    // Set initial Animation
    monkey.setFrameY(MonkeyAnimation['a'].row);
    monkey.setFrameX(MonkeyAnimation['a'].idleFrame.column);
    monkey.setMaxFrame(MonkeyAnimation['a'].idleFrame.frames);

    /* Monkey Control 
    * changes FrameY value (selected row in sprite)
    * change MaxFrame according to value in selected animation
    */
    // ...
    document.addEventListener('keydown', function (event) {
        if (MonkeyAnimation.hasOwnProperty(event.key)) {
            // Set variables based on the key that is pressed
            const selectedAnimation = event.key;
            monkey.setFrameY(MonkeyAnimation[selectedAnimation].row);
            monkey.setMaxFrame(MonkeyAnimation[selectedAnimation].frames);
            monkey.isIdle = false;
        }
        
        if (event.key === 'a') {
            monkey.setFrameY(MonkeyAnimation['a'].row);
            monkey.setFrameX(MonkeyAnimation['a'].idleFrame.column);
            monkey.setMaxFrame(MonkeyAnimation['a'].idleFrame.frames);
            monkey.isIdle = false;
            monkey.velocity.x = -monkey.speed;  // Move the monkey to the left
        } else if (event.key === 'd') {
            monkey.setFrameY(MonkeyAnimation['d'].row);
            monkey.setFrameX(MonkeyAnimation['d'].idleFrame.column);
            monkey.setMaxFrame(MonkeyAnimation['d'].idleFrame.frames);
            monkey.isIdle = false;
            monkey.velocity.x = -monkey.speed;  // Move the monkey to the right
        }
    });
    

document.addEventListener('keyup', function (event) {
    if (MonkeyAnimation.hasOwnProperty(event.key)) {
        // If no button is pressed then idle
        const selectedAnimation = event.key;
        if (MonkeyAnimation[selectedAnimation].idleFrame) {
            monkey.setFrameY(MonkeyAnimation[selectedAnimation].row);
            monkey.setFrameX(MonkeyAnimation[selectedAnimation].idleFrame.column);
            monkey.setMaxFrame(MonkeyAnimation[selectedAnimation].idleFrame.frames);
        }

        monkey.isIdle = true;
        monkey.velocity.x = 0;  // Stop horizontal movement when the key is released
    }
});
// ...

    document.addEventListener('keyup', function (event) {
        if (MonkeyAnimation.hasOwnProperty(event.key)) {
            // If no button is pressed then idle
            const selectedAnimation = event.key;
            if (MonkeyAnimation[selectedAnimation].idleFrame) {
                monkey.setFrameY(MonkeyAnimation[selectedAnimation].row);
                monkey.setFrameX(MonkeyAnimation[selectedAnimation].idleFrame.column);
                monkey.setMaxFrame(MonkeyAnimation[selectedAnimation].idleFrame.frames);
            }

            monkey.isIdle = true;
        }
    });

    // Monkey Object
    return monkey;
}

export default CharacterMonkey;
