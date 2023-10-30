---
layout: base
title: Mort 2
description: Use JavaScript without external libraries to loop background moving across the screen. Depends on Background.js and GameObject.js.
type: hacks
courses: { compsci: {week: 7} }
image: /images/background2.jpg
images:
  background:
    src: /images/background2.jpg
  chicken:
    src: /images/whitechicken.png
  coyote:
    src: /images/wolf-animation2.png
---

<!-- Liquid code, run by Jekyll, used to define the location of assets -->
{% assign backgroundFile = site.baseurl | append: page.images.background.src %}
{% assign chickenSpriteImage = site.baseurl | append: page.images.chicken.src %}
{% assign coyoteSpriteImage = site.baseurl | append: page.images.coyote.src %}
<link rel="stylesheet" type="text/css" href="{{site.baseurl}}/assets/css/spaceBkg/Styles.css">

<!-- Prepare DOM elements -->
<!-- Wrap both the canvas and controls in a container div -->
<div id="canvasContainer">
<div id="score" class="score-display">Score: 100</div>
    <div id="controls"> <!-- Controls -->
        <!-- Background controls -->
        <button id="toggleCanvasEffect"></button>
    </div>
</div>

<script type="module">
    import GameEnv from '{{site.baseurl}}/assets/js/alienWorld/GameEnv.js';
    import GameObject from '{{site.baseurl}}/assets/js/alienWorld/GameObject.js';
    import Background from '{{site.baseurl}}/assets/js/alienWorld/Background.js';
    import Character from '{{site.baseurl}}/assets/js/alienWorld/Character.js';
    import { initChicken } from '{{site.baseurl}}/assets/js/alienWorld/CharacterChicken.js';
    import { initCoyote } from '{{site.baseurl}}/assets/js/alienWorld/CharacterCoyote2.js';
    import { increaseScore, updateScore } from '{{site.baseurl}}/assets/js/alienWorld/Scoring.js';
    // Array to store visible coyotes
    const visibleCoyotes = [];

// Function to remove coyotes after a delay
function removeCoyote(coyote) {
    setTimeout(() => {
        const index = visibleCoyotes.indexOf(coyote);
        if (index !== -1) {
            visibleCoyotes.splice(index, 1);

            // Remove the coyote from the DOM
            const coyoteCanvas = coyote.canvas;
            coyoteCanvas.parentNode.removeChild(coyoteCanvas);
        }
    }, 12500); // Remove after 3 seconds (3000 milliseconds)
}

    // Create a function to load an image and return a Promise
    async function loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => resolve(image);
            image.onerror = reject;
        });
    }

    // Game loop
    function gameLoop() {
        for (var gameObj of GameObject.gameObjectArray) {
            gameObj.update();
            gameObj.draw();
        }

// Check if any coyotes have been visible for 3 seconds and remove them
const currentTime = performance.now();
for (let i = visibleCoyotes.length - 1; i >= 0; i--) {
    const coyote = visibleCoyotes[i];
    if (currentTime - coyote.startTime >= 12500) {
        // Remove the coyote canvas from the DOM
        const coyoteCanvas = coyote.coyote.canvas;
        coyoteCanvas.parentNode.removeChild(coyoteCanvas);
        visibleCoyotes.splice(i, 1);
    }
}

        requestAnimationFrame(gameLoop);  // cycle the game, aka recursion
    }

    // Window resize
    window.addEventListener('resize', function () {
        GameEnv.setGameEnv();  // Update GameEnv dimensions

        // Call the sizing method on all game objects
        for (var gameObj of GameObject.gameObjectArray) {
            gameObj.size();
        }
    });

    // Toggle "canvas filter property" between alien and normal
    var isFilterEnabled = true;
    const defaultFilter = getComputedStyle(document.documentElement).getPropertyValue('--default-canvas-filter');
    toggleCanvasEffect.addEventListener("click", function () {
        for (var gameObj of GameObject.gameObjectArray) {
            if (gameObj.invert && isFilterEnabled) {  // toggle off
                gameObj.canvas.style.filter = "none";  // remove filter
            } else if (gameObj.invert) { // toggle on
                gameObj.canvas.style.filter = defaultFilter;  // remove filter
            } else {
                gameObj.canvas.style.filter = "none";  // remove filter
            }
        }
        isFilterEnabled = !isFilterEnabled;  // switch boolean value
    });

    // Setup and store Game Objects
    async function setupGame() {
        try {
            // Open image files for Game Objects
            const [backgroundImg, chickenImg, coyoteImg] = await Promise.all([
                loadImage('{{backgroundFile}}'),
                loadImage('{{chickenSpriteImage}}'),
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
            const backgroundSpeedRatio = 0;
            new Background(backgroundCanvas, backgroundImg, backgroundSpeedRatio);

            // Prepare HTML with Chicken Canvas
            const chickenCanvas = document.createElement("canvas");
            chickenCanvas.id = "characters";
            document.querySelector("#canvasContainer").appendChild(chickenCanvas);
            // Chicken object
            const chickenSpeedRatio = 0;
            initChicken(chickenCanvas, chickenImg, chickenSpeedRatio);

            // Prepare HTML with many Coyotes
            for (var i = 0; i < 10; i++) {
                const coyoteCanvas = document.createElement("canvas");
                coyoteCanvas.id = "characters";
                document.querySelector("#canvasContainer").appendChild(coyoteCanvas);
                // Coyote object
                const coyoteSpeedRatio = 0;
                const coyote = initCoyote(coyoteCanvas, coyoteImg, coyoteSpeedRatio);
                // Add the coyote to the visibleCoyotes array
                visibleCoyotes.push({
                    coyote: coyote,
                    startTime: performance.now(),
                });
                // Remove the coyote after 3 seconds
                removeCoyote(coyote);
            }

        // Trap errors on failed image loads
        } catch (error) {
            console.error('Failed to load one or more images:', error);
        }
    }

    // Call and wait for Game Objects to be ready
    setupGame().then(() => {
        // Trigger a resize at start up
        window.dispatchEvent(new Event('resize'));
        toggleCanvasEffect.dispatchEvent(new Event('click'));

        // Start the game
        gameLoop();
    });

    class Player {
        constructor() {
            this.position = {
                x: canvas.width / 2,
                y: canvas.height / 2
            };

            this.velocity = {
                x: 0,
                y: 0
            };

            this.rotation = 0;
            this.speed = 5;

            const image = new Image();
            image.src = "{{site.baseurl}}/images/whitechicken.png";
            image.onload = () => {
                // After the image has loaded, update and draw the player
                this.image = image;
                this.width = 100;
                this.height = 100;
                this.draw();
            };
        }
        draw() {
            if (this.image) {
                ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
            }
        }
        update() {
            this.draw();
            this.position.x += this.velocity.x;
        }
    }

    const player = new Player();

    document.addEventListener('keydown', (event) => {
        if (event.key === 'a') {
            player.velocity.x = -player.speed;
        } else if (event.key === 'd') {
            player.velocity.x = player.speed;
        } else if (event.key === ' ' || event.key === 'w' && player.image) {
            // Shoot a projectile when the space bar is pressed
            const projectile = new Projectile(player.position.x, player.position.y, 5, "{{site.baseurl}}/images/egg-projectile.png");
            projectiles.push(projectile);
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'a' || event.key === 'd') {
            player.velocity.x = 0;
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        backgroundObj.draw();
        player.update();

        for (let i = projectiles.length - 1; i >= 0; i--) {
            projectiles[i].update();
            // Remove projectiles that are out of view
            if (projectiles[i].position.y < 0) {
                projectiles.splice(i, 1);
            }
            player.draw();
        }
    }
</script>
