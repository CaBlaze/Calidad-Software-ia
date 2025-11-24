import { GAME_WIDTH, GAME_HEIGHT, PLAYER_SPEED } from '../utils/constants.js';
// frontend/src/entities/player.js
import { PLAYER_CONFIG, GAME_CONFIG } from '../utils/constants.js';

export function createPlayer(k) {
    const player = k.add([
        k.rect(PLAYER_CONFIG.SIZE, PLAYER_CONFIG.SIZE),
        k.pos(GAME_CONFIG.WIDTH / 2, PLAYER_CONFIG.START_Y),
        k.color(0, 255, 0), // Verde
        k.area(),
        k.anchor('center'),
        k.z(10), // Asegura que esté en un layer visible
        k.stay(), // IMPORTANTE: Mantiene el objeto aunque cambies de escena
        'player',
        {
            lives: PLAYER_CONFIG.LIVES,
            speed: PLAYER_CONFIG.SPEED
        }
    ]);

    // Movimiento del jugador usando onUpdate del propio objeto
    player.onUpdate(() => {
        // Movimiento a la izquierda
        if (k.isKeyDown('left') || k.isKeyDown('a')) {
            if (player.pos.x > PLAYER_CONFIG.SIZE / 2) {
                player.pos.x -= player.speed * k.dt();
            }
        }

        // Movimiento a la derecha
        if (k.isKeyDown('right') || k.isKeyDown('d')) {
            if (player.pos.x < GAME_CONFIG.WIDTH - PLAYER_CONFIG.SIZE / 2) {
                player.pos.x += player.speed * k.dt();
            }
        }
    });

    return player;
}