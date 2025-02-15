import { CELL_SIZE } from './Settings.js';

export default class Circle {
    constructor(x, y, diameter, color = 'black') {
        const canvas = document.getElementById('canvas');

        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.radius = diameter / 2;
        this.color = color;
    }

    draw() {
        this.ctx.fillStyle = this.color;

        const xPos = this.x * CELL_SIZE + CELL_SIZE / 2;
        const yPos = this.y * CELL_SIZE + CELL_SIZE / 2;

        this.ctx.beginPath();
        this.ctx.arc(xPos, yPos, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
    