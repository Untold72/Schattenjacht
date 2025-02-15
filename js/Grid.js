import { BG_COLOR } from "./Settings.js";

export default class Grid {
    constructor(rows, cols, cellSize, lineWidth = 1, color = 'green') {
        const canvas = document.getElementById('canvas');
        canvas.style.backgroundColor = BG_COLOR

        this.ctx = canvas.getContext('2d');        
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.lineWidth = lineWidth;
        this.color = color;

        this.ctx.canvas.width = this.cols * this.cellSize;
        this.ctx.canvas.height = this.rows * this.cellSize;
    }

    draw() {
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;

        for (let i = 0; i <= this.rows; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.cellSize);
            this.ctx.lineTo(this.cols * this.cellSize, i * this.cellSize);
            this.ctx.stroke();
        }

        for (let i = 0; i <= this.cols; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.cellSize, 0);
            this.ctx.lineTo(i * this.cellSize, this.rows * this.cellSize);
            this.ctx.stroke();
        }
    }
}
