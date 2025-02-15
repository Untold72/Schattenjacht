import { 
    ROWS,
    COLS, 
    PLAYER_SIZE, 
    NUMBER_OF_TREASURES
} from './Settings.js';
import Circle from './Circle.js';
import GameObject from './GameObject.js';

export default class Player extends GameObject {
    constructor(world, x, y, color = 'blue') {
        super(world, new Circle(x, y, PLAYER_SIZE, color), 'player');

        this.isDead = false;
        this.lives = 3;
        this.score = 0;
    }

    moveUp() {
        this.body.y--;
    }

    moveDown() {
        this.body.y++;
    }

    moveLeft() {
        this.body.x--;
    }

    moveRight() {
        this.body.x++;
    }

    move(e) {
        const nextPosition = this.getNextPosition(e);

        this.body.x = nextPosition.x;
        this.body.y = nextPosition.y;

        const object = this.world.getObjectAtPosition(nextPosition);

        if (object?.ref === 'treasure') {
            this.collectTreasure();
        } else if (object?.ref === 'enemy') {
            this.collideWithEnemy();
        }
    }

    collectTreasure() {
        this.score++;
        this.world.removeObjectAtPosition(this.body);
    }

    collideWithEnemy() {
        this.lives--;
        this.world.removeObjectAtPosition(this.body);

        if (this.lives === 0) {
            this.isDead = true;
        }
    }
    
    validateMovement(e) {
        if (this.isDead) {
            return false;
        }

        if (this.score === NUMBER_OF_TREASURES) {
            return false;
        }

        const nextPosition = this.getNextPosition(e);

        const object = this.world.getObjectAtPosition(nextPosition);
        if (['wall'].includes(object?.ref)) {
            return false;
        }

        if (nextPosition.x < 0 || nextPosition.x >= COLS || nextPosition.y < 0 || nextPosition.y >= ROWS) {
            return false;
        }

        return true;
    }

    getNextPosition(e) {
        const nextPosition = {
            x: this.body.x,
            y: this.body.y
        };

        switch (e.key) {
            case 'ArrowUp':
                nextPosition.y--;
                break;
            case 'ArrowDown':
                nextPosition.y++;
                break;
            case 'ArrowLeft':
                nextPosition.x--;
                break;
            case 'ArrowRight':
                nextPosition.x++;
                break;
        }

        return nextPosition;
    }
}