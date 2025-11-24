// frontend/src/utils/constants.js

// URL del backend
export const API_URL = 'http://localhost:4000/api';

// Dimensiones del juego
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

// Configuración del jugador
export const PLAYER_SPEED = 300;
export const PLAYER_LIVES = 3;
export const PLAYER_SIZE = 40;
export const PLAYER_START_Y = 550;
export const PLAYER_COLOR = '#00FF00';

// Configuración de enemigos
export const ENEMY_ROWS = 4;
export const ENEMY_COLS = 8;
export const ENEMY_SPEED = 50;
export const ENEMY_MOVE_DOWN = 20;
export const ENEMY_SIZE = 30;
export const ENEMY_SPACING_X = 80;
export const ENEMY_SPACING_Y = 60;
export const ENEMY_START_Y = 80;
export const ENEMY_COLOR = '#FF0000';

// Configuración de balas
export const BULLET_SPEED = 400;
export const ENEMY_BULLET_SPEED = 200;
export const BULLET_WIDTH = 4;
export const BULLET_HEIGHT = 15;

// Puntuación
export const POINTS_PER_ENEMY = 100;

// Objetos agrupados para facilitar el uso
export const PLAYER_CONFIG = {
    SPEED: PLAYER_SPEED,
    SIZE: PLAYER_SIZE,
    START_Y: PLAYER_START_Y,
    COLOR: PLAYER_COLOR,
    LIVES: PLAYER_LIVES
};

export const GAME_CONFIG = {
    WIDTH: GAME_WIDTH,
    HEIGHT: GAME_HEIGHT
};

export const ENEMY_CONFIG = {
    ROWS: ENEMY_ROWS,
    COLS: ENEMY_COLS,
    SPEED: ENEMY_SPEED,
    MOVE_DOWN: ENEMY_MOVE_DOWN,
    SIZE: ENEMY_SIZE,
    SPACING_X: ENEMY_SPACING_X,
    SPACING_Y: ENEMY_SPACING_Y,
    START_Y: ENEMY_START_Y,
    COLOR: ENEMY_COLOR
};

export const BULLET_CONFIG = {
    SPEED: BULLET_SPEED,
    ENEMY_SPEED: ENEMY_BULLET_SPEED,
    WIDTH: BULLET_WIDTH,
    HEIGHT: BULLET_HEIGHT
};