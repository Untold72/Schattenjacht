import { 
    COLS, 
    ENEMY_SIZE,
    ROWS 
} from './Settings.js';
import Circle from './Circle.js';
import GameObject from './GameObject.js';

export default class Enemy extends GameObject {
    constructor(world, x, y, color = 'red') {
        super(world, new Circle(x, y, ENEMY_SIZE, color), 'enemy');
    }

    draw() {
        this.body.draw();
    }

    move() {
        const validPositions = this.getValidPositions();
        if (validPositions.length === 0) {
            return;
        }

        const nextPosition = validPositions[Math.floor(Math.random() * validPositions.length)];

        this.world.moveObject(this, nextPosition);
    }

    getValidPositions() {
        const nextPositions = [
            { x: this.body.x, y: this.body.y },
            { x: this.body.x, y: this.body.y - 1 },
            { x: this.body.x, y: this.body.y + 1 },
            { x: this.body.x - 1, y: this.body.y },
            { x: this.body.x + 1, y: this.body.y },
        ];

        const validPositions = [];

        for (let nextPosition of nextPositions) {
            let isValid = true;
            
            if (nextPosition.x < 0 || nextPosition.x >= COLS || nextPosition.y < 0 || nextPosition.y >= ROWS) {
                isValid = false;
            }

            const object = this.world.getObjectAtPosition(nextPosition);
            if (['wall', 'enemy', 'treasure'].includes(object?.ref) && object !== this) {
                isValid = false;
            }

            const playerPosition = this.world.player.body;
            if (nextPosition.x === playerPosition.x && nextPosition.y === playerPosition.y) {
                isValid = false;
            }

            if (isValid) {
                validPositions.push(nextPosition);
            }
        }

        return validPositions;
    }
}