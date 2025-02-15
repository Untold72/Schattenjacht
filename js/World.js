import {
    ROWS,
    COLS,
    CELL_SIZE,
    NUMBER_OF_TREASURES,
    NUMBER_OF_ENEMIES,
    NUMBER_OF_WALLS,
    GRID_WIDTH,
    GRID_COLOR,
    PLAYER_COLOR,
    WALL_COLOR,
    ENEMY_COLOR,
    TREASURE_COLOR,
} from './Settings.js';
import Grid from "./Grid.js";
import Player from "./Player.js";
import Treasure from "./Treasure.js";
import Enemy from "./Enemy.js";
import Wall from "./Wall.js";

export default class World {
    constructor() {
        this.grid = new Grid(ROWS, COLS, CELL_SIZE, GRID_WIDTH, GRID_COLOR);
        this.gameObjects = Array.from({ length: COLS }, () => Array(ROWS).fill(null));

        this.initializeGridPositions();
        this.initializePlayer();
        this.initializeTreasures();
        this.initializeEnemies();
        this.initializeWalls();
    }

    initializeGridPositions() {
        this.gridPositions = [];

        for (let i = 0; i < this.grid.rows; i++) {
            for (let j = 0; j < this.grid.cols; j++) {
                const position = {
                    x: j,
                    y: i
                };

                this.gridPositions.push(JSON.stringify(position));
            }
        }
    }

    initializePlayer() {
        const position = this.getRandomPosition();

        this.player = new Player(this, position.x, position.y, PLAYER_COLOR);
    }

    initializeTreasures() {
        for (let i = 0; i < NUMBER_OF_TREASURES; i++) {
            const position = this.getRandomPosition();

            this.gameObjects[position.x][position.y] = new Treasure(this, position.x, position.y, TREASURE_COLOR);
        }
    }

    initializeEnemies() {
        for (let i = 0; i < NUMBER_OF_ENEMIES; i++) {
            const position = this.getRandomPosition();

            this.gameObjects[position.x][position.y] = new Enemy(this, position.x, position.y, ENEMY_COLOR);
        }
    }

    initializeWalls() {
        for (let i = 0; i < NUMBER_OF_WALLS; i++) {
            const position = this.getRandomPosition();

            this.gameObjects[position.x][position.y] = new Wall(this, position.x, position.y, WALL_COLOR);
        }
    }

    draw() {
        this.grid.draw();
        this.player.draw();

        this.drawGameObjects();
    }

    drawGameObjects() {
        for (const row of this.gameObjects) {
            for (const gameObject of row) {
                if (gameObject) {
                    gameObject.draw();
                }
            }
        }
    }

    getRandomPosition() {
        if (this.gridPositions.length == 0) {
            throw new Error('No positions available.');
        }

        const index = Math.floor(Math.random() * this.gridPositions.length);

        const position = JSON.parse(this.gridPositions[index]);

        this.gridPositions.splice(index, 1);

        return position;
    }

    getObjectAtPosition(position) {
        return this.gameObjects[position.x]?.[position.y] || null;
    }

    moveObject(gameObject, nextPosition) {
        const currentPosition = {
            x: gameObject.body.x,
            y: gameObject.body.y
        };

        gameObject.body.x = nextPosition.x;
        gameObject.body.y = nextPosition.y;

        this.gameObjects[currentPosition.x][currentPosition.y] = null;
        this.gameObjects[gameObject.body.x][gameObject.body.y] = gameObject;
    }

    removeObjectAtPosition(position) {
        if (!this.gameObjects[position.x]?.[position.y]) {
            throw new Error('No object found at position.');
        }

        this.gameObjects[position.x][position.y] = null;
    }

    getEnemiesCount() {
        return this.gameObjects.flat().filter(object => object?.ref === 'enemy').length;
    }
}