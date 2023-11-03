---
layout: post
toc: True
title: Kayla Individual Review
description: This page will include my contributions, trial and errors, etc.
type: tangibles
courses: {'compsci': {'week': 8}}
---
## Issues
[(all commits)](https://github.com/kaylale124/final-game/commits?author=kaylale124)
### Week 1
[(make chicken move)](https://github.com/kaylale124/final-game/commit/8060ade50e21097dde8103afd0c993ff5a3cf543)
<br>
[(make chicken tilt)](https://github.com/kaylale124/final-game/commit/febde0c74b1dcf5860b974256cfc7f20b70ba276)
- Picked chicken image
- Made chicken move left to right
    - Also when moving right or left it tilts to the side a bit
- Added an invert button

### [Week 2](https://github.com/kaylale124/final-game/commit/a7ea387a687cdcfdebc164c9c43c9d8367d9f99d)

- Started to integrate (failed)
    - Problem: When integrating the chicken into the background, the chicken would show up.
    - Solution: Refer to teacher's code (CharacterMonkey.js worked similarly to the chicken).
- Make a character selection screen
    - After clicking start it bring you to a Character selection screen where you chose between 7 chickens

### Week 3

[(intgretion)](https://github.com/kaylale124/final-game/commit/0a792af965592520afa532f326ea31e42028b0d7)
<br>
[(collision)](https://github.com/kaylale124/final-game/commit/edb40f189c95277e669fa156b689699fecdb9211)
- Continue to integrate, as well as try doing collsion detection (failed)
    - Able to integrate (FINALLY): Used teacher code (used CharacterMonkey.js as teacher suggested)
- Tried collision detection: unable to make chicken spin and die when coyotes touched it

### Challenges 
- Working on the same file as someone can create merge conflicts
    - Solution: Had to communicate with team members on what file you are working on 

### Javascript
### Integration
Used CharacterMonkey.js for chicken
````javascript
import GameEnv from './GameEnv.js';
import Character from './Character.js';
import GameObject from './GameObject.js'
import CharacterCoyote from './CharacterCoyote2.js';

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

    collisionAction() {
        // Check if the object to collide with is a coyote
        if (this.sceneStarted === false && this.collisionData.touchPoints.this.right){
            this.sceneStarted = true;
            // Start the spiraling animation for the chicken
            const canvas = this.canvas;
            const duration = 1000; // Adjust the duration as needed
            let startTime = null;

            // Load the explosion GIF or game over image
            const explosionGif = new Image();
            explosionGif.src = '/final-game/images/explosion.gif';

            explosionGif.onload = () => {
                // Set the canvas to display the explosion GIF or game over image
                canvas.width = MonkeyAnimation.width;
                canvas.height = MonkeyAnimation.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(explosionGif, 0, 0, MonkeyAnimation.width, MonkeyAnimation.height);
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
                }
            }
            // Start the animation
            requestAnimationFrame(spiral);
        }
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
````
Import CharacterMonkey.js into md file
````javascript
<script type="module">
    import GameEnv from '{{site.baseurl}}/assets/js/alienWorld/GameEnv.js';
    import GameObject from '{{site.baseurl}}/assets/js/alienWorld/GameObject.js';
    import Background from '{{site.baseurl}}/assets/js/alienWorld/Background.js';
    import Character from '{{site.baseurl}}/assets/js/alienWorld/Character.js';
    import { initChicken } from '{{site.baseurl}}/assets/js/alienWorld/CharacterChicken.js';
    import { initCoyote } from '{{site.baseurl}}/assets/js/alienWorld/CharacterCoyote2.js';
    import { initMonkey } from '{{site.baseurl}}/assets/js/alienWorld/CharacterMonkey.js';
    import { increaseScore, updateScore } from '{{site.baseurl}}/assets/js/alienWorld/Scoring.js;
````
Load Chicken onto screen
```` javascript
        async function setupGame() {
        try {
            // Open image files for Game Objects
            const [backgroundImg, chickenImg, monkeyImg, coyoteImg] = await Promise.all([
                loadImage('{{backgroundFile}}'),
                loadImage('{{chickenSpriteImage}}'),
                 loadImage('{{site.baseurl}}/images/whitechicken2.png'),
                loadImage('{{coyoteSpriteImage}}'),
            ]);

            // Setup Globals
            GameEnv.gameSpeed = 2;
            GameEnv.gravity = 3;

            // Prepare HTML with Background Canvas
            const backgroundCanvas = document.createElement("canvas");
            backgroundCanvas.id = "background";
            document.querySelector("#canvasContainer").appendChild(backgroundCanvas);
            // Background object
            const backgroundSpeedRatio = 0
            new Background(backgroundCanvas, backgroundImg, backgroundSpeedRatio);  // Background Class calls GameObject Array which stores the instance

            // Prepare HTML with Chicken Canvas
            const chickenCanvas = document.createElement("canvas");
            chickenCanvas.id = "characters";
            document.querySelector("#canvasContainer").appendChild(chickenCanvas);
            // Chicken object
            const chickenSpeedRatio = 0
            initChicken(chickenCanvas, chickenImg, chickenSpeedRatio);

            const monkeyCanvas = document.createElement("canvas");
            monkeyCanvas.id = "characters";
            document.querySelector("#canvasContainer").appendChild(monkeyCanvas);
            // Monkey object
            const monkeySpeedRatio = 2
            initMonkey(monkeyCanvas, monkeyImg, monkeySpeedRatio);
            
            // Prepare HTML with many Coyotes
            for (var i = 0; i < 10; i++) {
                const coyoteCanvas = document.createElement("canvas");
                coyoteCanvas.id = "characters";
                document.querySelector("#canvasContainer").appendChild(coyoteCanvas);
                // Coyote object
                const coyoteSpeedRatio = 0
                initCoyote(coyoteCanvas, coyoteImg, coyoteSpeedRatio);
            }   
        }
    }
````
### Failed Code
Collsion Detection: tried using code similar to coyote code (some elements missing)
````javascript
    collisionAction() {
        // Check if the object to collide with is a coyote
        if (this.sceneStarted === false && this.collisionData.touchPoints.this.right){
            this.sceneStarted = true;
            // Start the spiraling animation for the chicken
            const canvas = this.canvas;
            const duration = 1000; // Adjust the duration as needed
            let startTime = null;

            // Load the explosion GIF or game over image
            const explosionGif = new Image();
            explosionGif.src = '/final-game/images/explosion.gif';

            explosionGif.onload = () => {
                // Set the canvas to display the explosion GIF or game over image
                canvas.width = MonkeyAnimation.width;
                canvas.height = MonkeyAnimation.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(explosionGif, 0, 0, MonkeyAnimation.width, MonkeyAnimation.height);
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
                }
            }
            // Start the animation
            requestAnimationFrame(spiral);
        }
    }
````