---
toc: true
comments: false
layout: post
title: Game Ideation Working Plan
description: Ideation plan for space invaders-type game
type: plans
courses: { compsci: {week: 7} }
---

## Brain Write (Lore)

In a chicken apocalypse far, far, FAR away...

There were space coyotes. Many space coyotes. An invading species bent on venegance and the intensive hunger for colorful chickens. Lead by none other than the Chunky Carniverous Coyote. They raid the chicken's home planet far and wide, infecting the land with discord and agony. But you are not like the other chickens. You have seem your brethren bleed and cry and feel pain you never though imaginable. You are not a chicken. You are THE chicken. A brave hero for justice, a symbol of nature using their gift to wipe away the dreaded stain of these cretans. With your egg-shooting, you shall defeat every rank of coyote until none are left, and you shall bring havoc to their coyote kingdom. You shall be the bringer of demise to King Chunky.

Let us welcome Armeneggon.

## Setting up Canvas + Player Character

### Characters

- Chicken (player)
    - Moves left and right (x), stays the same height (y)
    - Poops out eggs vertically
        - Hurts enemy --> have to add interaction
    - If the enemy touches the chicken, life is lost
    - Will get 3 lives

- Space coyotes (enemies)
    - Makes another sprite for dead coyote
    - A group of them appear and start shooting lasers at the chicken
    - Keep spawning indefinitely

### Object

- Egg
    - Find pixelated egg sprite
    - Eggs shoot from chicken's butt

### Canvas

Portrait oriented/vertical space background

## Implementing Enemies

Enemy behavior (space coyotes):

- every 2 seconds new rows of 4 coyotes come down 
- every second coyotes shoot something (haven't decided yet)

## Designing Platforms and Collision Detection

Collision Detection
- Make sure the chicken stays within borders
- Make a counter that subtracts health from space coyotes when they are hit with eggs
    - Make eggs disappear upon collision
    - Add to player score when space coyotes die upon enough collisions

## Interactive Blocks and Power-Ups

Interactive Blocks: 

Power-Ups:
- Golden egg: doubles eggs per second shot

## Creating a Dynamic Background (if time)
<br><br><br><br><br><br><br><br>


## Screen 1: Starting Page
### Game Start Screen
Design and text for start screen
Background
Identity
Should include an option for chicken skin
Player chooses color for chicken (2 colors + 4 colors for each team member?)
Team members name their chickens
## Screen 2: The Game Itself
Characters
- Chicken (player)
- Moves left and right, stays the same height
- Poops out eggs vertically (hurts the enemy -> have to add interaction)
- If the enemy touches the chicken, life is lost
- Will get 3 lives
- Space wolves/coyotes (enemy)
- Make another sprite for space wolf
- A group of them appears and slowly descend towards the chicken
- They keep spwaning indefinetely
- Add 3 Lives Feature to the Game
- Object (Egg)
- Find egg sprite that’s pixelated
- Eggs should shoot from chicken’s butt
- Enemey Behavior (space coyotes):
- Space coyotes spawn randomly and move downwards
- Player (chicken) would lose 1 life per hit (upon colliding with space coyotes)
- Player also loses health when space coyotes reach the bottom of the border
- Can implement an object/set coordinates that indicates when the coyotes would reach the bottom -> loses player health
- Tall Vertical (Portrait) Space Background
