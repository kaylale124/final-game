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

## Screen 1: Starting Page

### Game Start Screen
- Design and text for start screen
- Background

### Identity
- An option for chicken skin
    - 6 colors
- Team member names their chicken

## Screen 2: The Game

### Characters

- Maryam 
- Chicken (player)
    - Moves left and right (x), stays the same height (y)
    - Poops out eggs vertically
        - Hurts enemy --> have to add interaction
    - If the enemy touches the chicken, life is lost
    - Will get 3 lives

- Lilian 
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

### Implementing Enemies

Enemy behavior (space coyotes):

- every 2 seconds new rows of 4 coyotes come down 
- every second coyotes shoot something (haven't decided yet)

### Interactive Blocks and Power-Ups

Interactive Blocks: 

Power-Ups:
- Golden egg: doubles eggs per second shot

### Creating a Dynamic Background (if time)

## Screen 3: Game Over

### Designing Platforms and Collision Detection

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
