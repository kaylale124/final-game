---
layout: post
toc: True
title: Lilian Individual Review
description: This page will include my contributions, trial and errors, etc.
type: tangibles
courses: {'compsci': {'week': 8}}
---
## Issues
[(all my commits)](https://github.com/kaylale124/final-game/commits?author=LiliWuu)
### [Week 1](https://github.com/kaylale124/final-game/commit/563c2c9f005510ef8c312dd8fc15fd0f6573f420)
- Picked enemy sprite image (coyote)
- Made the coyote sprite animation (enemy) show up 
    - Adjusted the dimensions of image
- Added downward translaton of coyote grid

### [Week 2](https://github.com/kaylale124/final-game/commit/88fc4181fa3d61ca91553741f45163bd23ac0c5f)
- Made the grid of coyotes independent sprites
- Changed the grid format to an upside-down pyramid
- Created the game screen
- Integrated the background and coyotes most of the week
- Made the coyotes appear from the top of the page and move downwards
- Tried setting up a score system
### [Week 3](https://github.com/kaylale124/final-game/commit/0a792af965592520afa532f326ea31e42028b0d7)
- Worked on a scoring system (failed)
    - Problems: wrong integration of coyotes and background, wrong place to use collisions (should use on mainpage with everything already integrated), y-coordinate of coyotes to determine score deduction did not work
    - Suggestions: use object oriented programming, refer to teacher's code instead of just using ChatGPT, seek teammates for more help
- Added teacher's coyote code to our repository and made few adjustments
- Plan: work on local storage, scoring system, final boss?

### Challenges with GitHub Commits
- Commiting changes for one person can override uncommited work of another
    - Had to communicate
    - Frequently did Liveshares
- Learned to gitpush when uncommited changes are still present
- Needed to commit frequently (various times) in order for a lot of changes to show up
    - [Commiting once for a file after many changes doesn't show all the changes](https://github.com/kaylale124/final-game/commit/88fc4181fa3d61ca91553741f45163bd23ac0c5f) 

### Javascript
### Scoring 
Made a Scoring.js file for scores 
````javascript
import GameEnv from './GameEnv.js';

// scoring.js

// Initialize the player's score to 30
let score = 30;

// Select the score display element with the "score-display" class
const scoreElement = document.querySelector('.score-display');

if (scoreElement) {
    // Apply the styles
    scoreElement.style.position = 'absolute';
    scoreElement.style.top = '10px';
    scoreElement.style.left = '10px';
    scoreElement.style.fontSize = '16px';
    scoreElement.style.color = 'white';
    scoreElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    scoreElement.style.padding = '5px';
    scoreElement.style.borderRadius = '5px';
}

export function updateScore() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
    } else {
        console.error("Element with id 'score' not found.");
    }
}

// Function to increase the score
export function increaseScore(points) {
    score += points;
    updateScore();
}

// Call the updateScore function to display the initial score
document.addEventListener("DOMContentLoaded", function () {
    updateScore();
});

export default score;
````
Added scoring system to md file and made it display
````javascript
<!-- Prepare DOM elements -->
<!-- Wrap both the dog canvas and controls in a container div -->
<div id="canvasContainer">
<div id="score" class="score-display">Score: 30</div>
        <!-- Background controls -->
        <button id="toggleCanvasEffect"></button>
</div>

<script type="module">
    import GameEnv from '{{site.baseurl}}/assets/js/alienWorld/GameEnv.js';
    import GameObject from '{{site.baseurl}}/assets/js/alienWorld/GameObject.js';
    import Background from '{{site.baseurl}}/assets/js/alienWorld/Background.js';
    import Character from '{{site.baseurl}}/assets/js/alienWorld/Character.js';
    import { initChicken } from '{{site.baseurl}}/assets/js/alienWorld/CharacterChicken.js';
    import { initCoyote } from '{{site.baseurl}}/assets/js/alienWorld/CharacterCoyote2.js';
    import { initMonkey } from '{{site.baseurl}}/assets/js/alienWorld/CharacterMonkey.js';
    import { increaseScore, updateScore } from '{{site.baseurl}}/assets/js/alienWorld/Scoring.js';

````
Added scoring to GameEnv.js for display and decrementing
````javascript
    static score = 30;  //decrement this in floorAction and display this in DOM
````
````javascript
static updateScoreDisplay() {
        // Get the score element from the DOM
        const scoreElement = document.getElementById('score');

        if (scoreElement) {
            // Update the score display with the current score value
            scoreElement.textContent = `Score: ${this.score}`;
        }
    }
    static decrementScore(amount){
        this.score -=amount;
    }
````
### Coyotes
Included default functions in GameObject.js to allow coyotes to spiral and be destroyed upon touching the floor
````javascript
/* Destroy Game Object
    * remove canvas element of object
    * remove object from GameObject array
    */
    destroy() {
        const index = GameObject.gameObjectArray.indexOf(this);
        if (index !== -1) {
            // Remove the canvas from the DOM
            this.canvas.parentNode.removeChild(this.canvas);
            GameObject.gameObjectArray.splice(index, 1);
        }
    }

    /* Default collision action is no action
     * override when you extend for custom action
    */
    collisionAction(){
        // no action
    }

    /* Default floor action is no action
     * override when you extend for custom action
    */
    floorAction(){
        // no action
    }

````


### Failed Code/Attempts
Turned coyotes into a pyramid
````javascript
// Create an array to manage individual coyote objects
      const coyotes = [];
  
      // Create an upside-down pyramid layout with varying rows (5, 4, 3, 2, 1)
      const numRows = [5, 4, 3, 2, 1];
      let rowCounter = 0;
      numRows.forEach((rowCount) => {
        for (let row = 0; row < rowCount; row++) {
          const colsInThisRow = rowCount - row;
          for (let col = 0; col < colsInThisRow; col++) {
            const x = col * SPRITE_WIDTH * SCALE_FACTOR + (row * SPRITE_WIDTH * SCALE_FACTOR) / 2;
            const y = rowCounter * SPRITE_HEIGHT * SCALE_FACTOR;
            coyotes.push(new Coyote(x, y));
          }
          rowCounter++;
        }
      });
````
Tried to make the coyotes explode instead spiraling
````javascript
  // Load the explosion GIF
        const explosionGif = new Image();
        explosionGif.src = './explosion.gif'; // Specify the correct path

        explosionGif.onload = () => {
            // Set the canvas to display the explosion GIF
            canvas.width = CoyoteAnimation.width; // Adjust canvas size as needed
            canvas.height = CoyoteAnimation.height; // Adjust canvas size as needed
            const ctx = canvas.getContext('2d');
            ctx.drawImage(explosionGif, 0, 0, CoyoteAnimation.width, CoyoteAnimation.height);
        }

````
Tried to make chicken spiral after collision with coyote (collision happened but stopped the code)
````javascript
collisionAction() {
        // Check if the object to collide with is a coyote
        if (this.CharacterCoyote.isCollidingWith(CharacterMonkey)) {
            // Start the spiraling animation for the chicken
            const canvas = this.canvas;
            const duration = 1000; // Adjust the duration as needed
            let startTime = null;
        }
}
````