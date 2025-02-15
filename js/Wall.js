import { WALL_SIZE } from './Settings.js';
import Square from './Square.js';
import GameObject from './GameObject.js';

export default class Wall extends GameObject {
    constructor(world, x, y, color = 'brown') {
        super(world, new Square(x, y, WALL_SIZE, color), 'wall');
    }

    draw() {
        this.body.draw();
    }
}