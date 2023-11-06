---
layout: post
toc: True
title: B. Vrnda's Individual Review
description: This is my guide to my individual review. Including my commits, code, experiments, and problems w/ their solutions to show my general progress.
type: tangibles
courses: { compsci: {week: 12} } 
---

<!--
How I wanna structure it:

- Each file has:
    - link to commit + issue 
    - purpose of the file
    - what code I used (i.e. JS OOP -> to have two separate objects)
    - fails
    - solutions + what I learned 

- Conclusion:
    - what I developed over the tri
    - general learnings

-->

## Coding Contributions

[(All my commits)](https://github.com/kaylale124/final-game/commits?author=BVrndaKanhye)

### Week 1-2: Making Projectile

#### [Week 1 Issue](https://github.com/kaylale124/final-game/issues/1#issue-1933785897): 
    - Make egg projectile 

#### What I did:
    - Used a [space invaders tutorial](https://www.youtube.com/watch?v=MCVU0w73uKI) to make a mini version of space invaders with a chicken placeholder + circular projectile using OOP
        - I made a class Player and class Projectile to have two game objects appear on the screen

#### Code for reference:
    - *Unavailable because I deleted that file before being aware I should've saved it for reference*
    - Will explain in week 2 code

#### [Week 2 Issue](https://github.com/kaylale124/final-game/issues/1#issue-1933785897): 
    - egg-shaped projectile (try replacing w/ image)
    - egg integrate with chicken

#### What I did:
    - Managed to change the draw function from small circles -> our egg image
        - Altered OOP Programming

#### Code for reference:

````js
// class Player code

        class Projectile {
            constructor(canvas, ctx, x, y, speed, image) {
                this.canvas = canvas;
                this.ctx = ctx;
                this.x = x;
                this.y = y;
                this.speed = speed;
                this.image = image;
            }

            move() {
                this.y -= this.speed;
            }

            draw() {
                this.ctx.drawImage(this.image, this.x, this.y);
            }
        }

        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        //to ensure the projectiles come in an array
        let projectiles = [];

        // to have the projectile always get generated as the same image
        const projectileImage = new Image();
        projectileImage.src = "{{site.baseurl}}/images/egg-projectile.png";

        const player = new Player(canvas, ctx);

    // addEventListenener code + drawing player and canvas

    // interesting ChatGPT way of having projectile continously spawn w/out woNKY
            for (let i = projectiles.length - 1; i >= 0; i--) {
                projectiles[i].move();
                projectiles[i].draw();

                if (projectiles[i].y < 0) {
                    projectiles.splice(i, 1);
                }
            }

            requestAnimationFrame(draw);

        draw();
````

#### Failures -> Reasons/Solutions
- I struggled to implement the background into this code ->  I didn't realize til later that I was using css in "display: block" which wouldn't allow an image to be loaded
- Egg wasn't showing up at first -> I had to define the image source and call it to load with the event listeners for w and space because draw and ctx.fillStyle were to describe drawing w/ color & shape
- Couldn't change the block to a chicken and integrate the two -> had to do something similar like the projectile where I called/used draw function to have image appear (Solved in W3)

### Week 3-4: Chicken and INTEGRATION

#### Week 3 Issue:
    - Change chicken placeholder to chicken image
    - Figure out how to customize chicken in game (?)

#### What I did:
    - MUCH trial and error w/ ChatGPT and the space invaders tutorial
        - using an image source and calling on that + making it constant = chicken showing up on the screen
        - had to add a lot of specifications to ensure the image would show up correctly, move, and go at the right speed/direction
            - newPlayer part is there because the screen is technically constantly refreshing and addign a new frame w/ draw feature

#### Code for reference:

```` js
 //site.baseurl would be final-game
const image = new Image();

                image.src = "{{site.baseurl}}/images/whitechicken.png";
                image.onload = () => {
                    // After the image has loaded, update and draw the player
                    this.image = image;
                    this.width = 100;
                    this.height = 100;
                    this.draw();
                };

            draw() {
                if (this.image) {
                    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
                }
            }

            update() {
                this.draw();
                this.position.x += this.velocity.x;
            }

        const defaultChickenImageSrc = "whitechicken.png"; // Default chicken image source
       // have a space because that's what works ;-;
        const player = new Player(defaultChickenImageSrc);

        // Function to change the chicken image source
        function changeChicken(imageSrc) {
            player.image.src = imageSrc;
        }

        //keep no space so chicken shows up
        constplayer = new Player();
````

#### Week 4 Issue
    - FULL INTEGRATION!
    - Make it so you can choose which chicken you play w/

#### What I did:
    - Tried using ChatGPT to make my simplistic html file with js -> more advanced like Mr. Mort's code w/ the pulling og js files (didn't work out, extremely diff code)
    - Then I tried...
        1: Making separate js files for projectile and chicken, chicken being the monkey file (which everyone kept the same the rest of the integration phase)
        2: Copy and pasting my code into one js file
        3: Trying to replace my current bakground w/ our game background

#### Code for reference:

1 / 2: Making separate js files for projectile and chicken, chicken being the monkey file (which everyone kept the same the rest of the integration phase) / Copy and pasting my code into one js file
````js
class Monkey {
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

const defaultChickenImageSrc = "whitechicken.png"; // Default chicken image source
// have a space because that's what works ;-;
const player = new Player(defaultChickenImageSrc);

// Function to change the chicken image source
function changeChicken(imageSrc) {
    player.image.src = imageSrc;
}

//keep no space so chicken shows up
constplayer = new Player();

document.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        player.velocity.x = -player.speed;
    } else if (event.key === 'd') {
        player.velocity.x = player.speed;
        //case 87 = w key
    } else if (event.key === ' ','w' && player.image) {
        // Shoot a projectile when space bar is pressed
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
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();

    for (let i = projectiles.length - 1; i >= 0; i--) {
        projectiles[i].update();
        // Remove projectiles that are out of view
        if (projectiles[i].position.y < 0) {
            projectiles.splice(i, 1);
        }
    }
}

const projectiles = [];

class Projectile {
    constructor(x, y, speed, imageSrc) {
        this.position = {
            x,
            y
        };
        this.speed = speed;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.y -= this.speed;
    }
}

animate();
```` 
    
#### Failures -> Reasons/Solutions
    - 1+2: Chicken js file worked, projectile did not work (didn't show up on main file) -> didn't work on it enough (considering the diff thingd affecting it, correctly idendtifying things directly based on Mort's code) + original code wasn't accustomed for the game env/obj settings described in Mort's files that we used
    - 3: Image wouldn't show up or nothing would -> calling background image source the wrong way by just defining const image = image path

## Trimester 1 Reflection (positive accomplishments)
    - Learning some basics of how OOP functions
    - A better strategy of committing small changes and testing oen thing at a time when coding
    - Having two game objects correspond and having projectiles shoot with add event listeners 

## Memories <3
    - Getting projectiles to look like eggs and shoot right before the review that week
    - naming our chickens
    - Planning in the long and short term together
    - Being frustrated at code in harmony

## Aims for Tri 2
    - Growing more independent from ChatGPT
    - Learning the basics of js to learn to code in it more fluently