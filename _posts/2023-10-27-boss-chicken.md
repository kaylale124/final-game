---
comments: false
layout: default
title: Boss Chicken
type: hacks
courses: { compsci: {week: 7} }
image: /images/whitechicken.png
images:
  chicken:
    src: /images/whitechicken.png
  boss:
    src: /images/final-boss.png
---
<!-- Liquid code, run by Jekyll, used to define location of asset(s) -->
{% assign chickenSpriteImage = site.baseurl | append: page.images.boss.src %}
{% assign coyoteSpriteImage = site.baseurl | append: page.images.coyote.src %}

<!-- Prepare DOM elements -->
<!-- Wrap both the dog canvas and controls in a container div -->
 <style>
        #controls {
            position: relative;
            z-index: 2; /*Ensure the controls are on top*/
        }
</style>

<div id="canvasContainer">
    <div id="controls"> 
 </div>
</div>

<script type="module">
    import player from '{{site.baseurl}}/images/whitechicken.png';
    import boss from '{{site.baseurl}}/assets/js/alienWorld/CharacterChicken.js';

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
        for (var gameObj of GameObject.gameObjectArray){
            boss.update();
            boss.draw();
        }
        requestAnimationFrame(gameLoop);  // cycle game, aka recursion
    }

    // Window resize
    window.addEventListener('resize', function () {
        GameEnv.setGameEnv();  // Update GameEnv dimensions

        // Call the sizing method on all game objects
        for (var gameObj of GameObject.gameObjectArray){
            gameObj.size();
        }
    });

</script>