import { NUMBER_OF_TREASURES } from "./Settings.js";
import World from "./World.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const score = document.getElementById('score');
const lives = document.getElementById('lives');
const enemies = document.getElementById('enemies');
const result = document.getElementById('result');

const world = new World();

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    world.draw();

    updateHud();

    requestAnimationFrame(updateCanvas);
}

function updateHud() {
    score.innerHTML = world.player.score;
    lives.innerHTML = world.player.isDead ? '💀' : world.player.lives;
    enemies.innerHTML = world.getEnemiesCount();

    if (world.player.isDead) {
        result.innerHTML = 'Game Over';
    }

    if (world.player.score === NUMBER_OF_TREASURES) {
        result.innerHTML = 'You Win!';
    }
}

window.addEventListener('keydown', (e) => {
    if (!world.player.validateMovement(e)) {
        return;
    }
    
    for (let object of world.gameObjects.flat()) {
        object?.move?.(e);
    }

    world.player.move(e);
});

updateCanvas();