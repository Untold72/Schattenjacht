import { CELL_SIZE } from "./Settings.js";

export default class Square {
    constructor( x, y, size, color = 'black') {
        const canvas = document.getElementById('canvas');

        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    draw() {
        this.ctx.fillStyle = this.color;

        const xPos = this.x * CELL_SIZE + (CELL_SIZE - this.size) / 2;
        const yPos = this.y * CELL_SIZE + (CELL_SIZE - this.size) / 2;

        this.ctx.fillRect(xPos, yPos, this.size, this.size);
    }
}