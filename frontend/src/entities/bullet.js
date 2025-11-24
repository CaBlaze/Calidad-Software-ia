
import { BULLET_SPEED } from '../utils/constants.js';
// Crea una bala del jugador
export function createPlayerBullet(k, x, y) {
    const bullet = k.add([
        k.rect(BULLET_CONFIG.WIDTH, BULLET_CONFIG.HEIGHT),
        k.pos(x, y),
        k.color(k.Color.fromHex(BULLET_CONFIG.PLAYER_COLOR)),
        k.area(),
        k.anchor('center'),
        k.move(k.UP, BULLET_CONFIG.PLAYER_SPEED),
        'playerBullet'
    ]);

    // Destruir bala al salir de pantalla
    bullet.onUpdate(() => {
        if (bullet.pos.y < 0) {
            k.destroy(bullet);
        }
    });

    return bullet;
}

// Crea una bala enemiga
export function createEnemyBullet(k, x, y) {
    const bullet = k.add([
        k.rect(BULLET_CONFIG.WIDTH, BULLET_CONFIG.HEIGHT),
        k.pos(x, y),
        k.color(k.Color.fromHex(BULLET_CONFIG.ENEMY_COLOR)),
        k.area(),
        k.anchor('center'),
        k.move(k.DOWN, BULLET_CONFIG.ENEMY_SPEED),
        'enemyBullet'
    ]);

    // Destruir bala al salir de pantalla
    bullet.onUpdate(() => {
        if (bullet.pos.y > GAME_CONFIG.HEIGHT) {
            k.destroy(bullet);
        }
    });

    return bullet;
}
export function createBullet(k, x, y) {
    return k.add([
        k.rect(4, 15),
        k.pos(x, y),
        k.anchor('center'),
        k.area(),
        k.color(0, 255, 255),
        k.move(k.UP, BULLET_SPEED),
        'bullet'
    ]);
}