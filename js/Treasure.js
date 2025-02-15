import { TREASURE_SIZE } from "./Settings.js";
import Square from "./Square.js";
import GameObject from "./GameObject.js";

export default class Treasure extends GameObject {
    constructor(world, x, y, color = 'gold') {
        super(world, new Square(x, y, TREASURE_SIZE, color), 'treasure');
    }

    draw() {
        this.body.draw();
    }
}