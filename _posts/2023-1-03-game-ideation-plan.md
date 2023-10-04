---
toc: true
comments: false
layout: post
title: Game Ideation Working Plan
description: Ideation plan for space invaders-type game
type: plans
courses: { compsci: {week: 7} }
---

## Brain Write

Start typing here

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


## Designing Platforms and Collision Detection

Collision Detection
- Make sure the chicken stays within borders
- Make a counter that subtracts health from space coyotes when they are hit with eggs
    - Make eggs disappear upon collision
    - Add to player score when space coyotes die upon enough collisions

## Interactive Blocks and Power-Ups

Interactive Blocks: 

Power-Ups:
- Golden egg

## Creating a Dynamic Background (if time)
