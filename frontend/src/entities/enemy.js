// frontend/src/entities/enemy.js
import { GAME_WIDTH, ENEMY_ROWS, ENEMY_COLS, ENEMY_SPEED, ENEMY_MOVE_DOWN } from '../utils/constants.js';

export function createEnemyGrid(k) {
    const enemies = [];
    const enemyWidth = 40;
    const enemyHeight = 30;
    const spacing = 60;
    const startX = 100;
    const startY = 80;

    for (let row = 0; row < ENEMY_ROWS; row++) {
        for (let col = 0; col < ENEMY_COLS; col++) {
            const enemy = k.add([
                k.rect(enemyWidth, enemyHeight),
                k.pos(startX + col * spacing, startY + row * spacing),
                k.anchor('center'),
                k.area(),
                k.color(255, 0, 0),
                k.outline(2, k.rgb(200, 0, 0)),
                'enemy',
                {
                    row: row,
                    col: col
                }
            ]);
            enemies.push(enemy);
        }
    }

    return {
        enemies: enemies,
        direction: 1,
        speed: ENEMY_SPEED,
        moveDown: ENEMY_MOVE_DOWN
    };
}

export function moveEnemies(k, enemyGrid) {
    if (!enemyGrid || !enemyGrid.enemies || enemyGrid.enemies.length === 0) {
        return;
    }

    let shouldMoveDown = false;

    enemyGrid.enemies.forEach(enemy => {
        if (!enemy.exists()) return;

        enemy.move(enemyGrid.speed * enemyGrid.direction, 0);

        if (enemy.pos.x <= 50 || enemy.pos.x >= GAME_WIDTH - 50) {
            shouldMoveDown = true;
        }
    });

    if (shouldMoveDown) {
        enemyGrid.direction *= -1;
        enemyGrid.enemies.forEach(enemy => {
            if (enemy.exists()) {
                enemy.move(0, enemyGrid.moveDown);
            }
        });
    }
}

export function enemyShoot(k, enemies) {
    if (!enemies || enemies.length === 0) return;

    const aliveEnemies = enemies.filter(e => e.exists());
    if (aliveEnemies.length === 0) return;

    const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];

    k.add([
        k.rect(4, 15),
        k.pos(shooter.pos.x, shooter.pos.y + 20),
        k.anchor('center'),
        k.area(),
        k.color(255, 255, 0),
        k.move(k.DOWN, 200),
        'enemyBullet'
    ]);
}