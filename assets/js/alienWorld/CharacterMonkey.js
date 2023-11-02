import GameEnv from './GameEnv.js';
import Character from './Character.js';

const MonkeyAnimation = {
    // Sprite properties
    scale: 2,
    width: 36,
    height: 32.5,
	d: { row: 0, frames: 0, idleFrame: { column: 0, frames: 0 } }, // Walk right with 'd' key
	a: { row: 1, frames: 0, idleFrame: { column: 0, frames: 0 } }, // Walk left with 'a' key
}

const defaultIdleFrame = { row: 0, column: 0, frames: 0 };

export class CharacterMonkey extends Character{
    // constructors sets up Character object 
    constructor(monkeyCanvas, image, speedRatio){
        super(monkeyCanvas, 
            image, 
            speedRatio,
            MonkeyAnimation.width, 
            MonkeyAnimation.height, 
            MonkeyAnimation.scale
        );
        // Initial position at the bottom center
        this.position = {
            x: this.canvas.width / 2,
            y: 0
        }
        this.isIdle = true;
        this.gravityEnabled = false;

        this.yVelocity = 0;
    }

    size() {
        super.size();
        if (!GameEnv.prevInnerWidth) {
            this.setY(GameEnv.bottom);
        }
        this.setX(GameEnv.innerWidth/2);
    }

    // Monkey perform a unique update
    update() {
        if (this.frameY === MonkeyAnimation.a.row && !this.isIdle) {
            this.x -= this.speed;  // Move the monkey to the left
        }
        else if (this.frameY === MonkeyAnimation.d.row && !this.isIdle){
            this.x += this.speed;
        } else if (GameEnv.bottom <= this.y) {
            // do idle frame
            this.setFrameY(defaultIdleFrame.row);
            this.setFrameX(defaultIdleFrame.column)
            this.setMaxFrame(defaultIdleFrame.frames);
            this.idle = true;
        }
        // Add logic to update the position based on velocity
    
        /* i think this code isnt needed but will keep in comment for now
        if (GameEnv.bottom > this.y) {
            // gravity (using acceleration instead of velocity, needed for jump implementation)
            this.yVelocity += 0.5;
        } else {
            // normal force (basically disabels gravity if on the ground)
            this.yVelocity = Math.min(0, this.yVelocity);
        }

        this.y += this.yVelocity;
        */

        // Perform super update actions
        super.update();
    }


}

// Can add specific initialization parameters for the monkey here
// In this case the monkey is following the default character initialization
export function initMonkey(canvasId, image, gameSpeed, speedRatio){
    // Create the Monkey character
    var monkey = new CharacterMonkey(canvasId, image, gameSpeed, speedRatio);

    // Set initial Animation
    monkey.setFrameY(MonkeyAnimation['a'].row);
    monkey.setFrameX(MonkeyAnimation['a'].idleFrame.column)
    monkey.setMaxFrame(MonkeyAnimation['a'].idleFrame.frames);

    /* Monkey Control 
    * changes FrameY value (selected row in sprite)
    * change MaxFrame according to value in selected animation
    */ 
   
    document.addEventListener('keydown', function (event) {
        if (MonkeyAnimation.hasOwnProperty(event.key)) {
            // Set variables based on the key that is pressed
            const selectedAnimation = event.key;
            monkey.setFrameY(MonkeyAnimation[selectedAnimation].row);
            monkey.setMaxFrame(MonkeyAnimation[selectedAnimation].frames);
            monkey.isIdle = false;
        }
        /* else if (event.key === 'a') {
            monkey.isIdle = false;
            monkey.velocity.x -= monkey.speed;  // Move the monkey to the left
            update();
        } else if (event.key === 'd') {
            monkey.isIdle = false;
            monkey.velocity.x += monkey.speed;  // Move the monkey to the right
            update();
        }
        */
    });


    document.addEventListener('keyup', function (event) {
        if (MonkeyAnimation.hasOwnProperty(event.key)) {
            // If no button is pressed then idle
            const selectedAnimation = event.key;
            if (MonkeyAnimation[selectedAnimation].idleFrame) {
                monkey.setFrameY(MonkeyAnimation[selectedAnimation].row);
                monkey.setFrameX(MonkeyAnimation[selectedAnimation].idleFrame.column)
                monkey.setMaxFrame(MonkeyAnimation[selectedAnimation].idleFrame.frames);
                monkey.isIdle = true;
                monkey.velocity.x = 0;
            }

        }
    });

    // Monkey Object
    return monkey;
}

export default CharacterMonkey;