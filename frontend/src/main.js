// frontend/src/main.js
import { GAME_WIDTH, GAME_HEIGHT } from './utils/constants.js';
import startScene from './scenes/startScene.js';
import gameScene from './scenes/gameScene.js';
import gameOverScene from './scenes/gameOverScene.js';
import leaderboardScene from './scenes/leaderboardScene.js';

// Inicializar Kaboom (cargado desde CDN)
const k = kaboom({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    background: [10, 10, 30],
    canvas: document.querySelector('#game-container')?.appendChild(document.createElement('canvas')) || undefined,
    scale: 1,
    crisp: true,
    debug: false
});

// Variable global para almacenar datos del jugador
window.gameData = {
    playerName: '',
    currentScore: 0
};

// Registrar todas las escenas
startScene(k);
gameScene(k);
gameOverScene(k);
leaderboardScene(k);

// Comenzar en la pantalla de inicio
k.go('start');

console.log('🎮 Space Invaders - Game Loaded');