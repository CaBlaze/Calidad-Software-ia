// frontend/src/scenes/startScene.js
import { GAME_WIDTH, GAME_HEIGHT } from '../utils/constants.js';

export default function startScene(k) {
    k.scene('start', () => {
        let playerName = '';
        let errorMessage = '';
        let inputActive = true;

        // Fondo con estrellas
        for (let i = 0; i < 50; i++) {
            k.add([
                k.rect(2, 2),
                k.pos(Math.random() * GAME_WIDTH, Math.random() * GAME_HEIGHT),
                k.color(255, 255, 255),
                k.opacity(Math.random() * 0.5 + 0.5)
            ]);
        }

        // Título
        k.add([
            k.text('SPACE INVADERS', { size: 48, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 100),
            k.anchor('center'),
            k.color(0, 255, 255)
        ]);

        // Subtítulo
        k.add([
            k.text('Ingresa tu nickname', { size: 24, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 200),
            k.anchor('center'),
            k.color(255, 255, 255)
        ]);

        // Caja de input
        const inputBox = k.add([
            k.rect(400, 50, { radius: 8 }),
            k.pos(GAME_WIDTH / 2, 280),
            k.anchor('center'),
            k.outline(3, k.rgb(0, 255, 255)),
            k.color(20, 20, 60)
        ]);

        // Texto del input
        const inputText = k.add([
            k.text('', { size: 24, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 280),
            k.anchor('center'),
            k.color(255, 255, 255)
        ]);

        // Mensaje de error
        const errorText = k.add([
            k.text('', { size: 16, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 340),
            k.anchor('center'),
            k.color(255, 0, 0)
        ]);

        // Instrucciones
        k.add([
            k.text('Máximo 15 caracteres alfanuméricos', { size: 14, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 380),
            k.anchor('center'),
            k.color(180, 180, 180)
        ]);

        k.add([
            k.text('Presiona ENTER para comenzar', { size: 18, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 450),
            k.anchor('center'),
            k.color(0, 255, 0)
        ]);

        // Controles
        k.add([
            k.text('Controles: A/D o ← → para mover | ESPACIO para disparar', { size: 14, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 520),
            k.anchor('center'),
            k.color(200, 200, 200)
        ]);

        // Botón Leaderboard
        const leaderboardBtn = k.add([
            k.rect(200, 40, { radius: 8 }),
            k.pos(GAME_WIDTH / 2, 560),
            k.anchor('center'),
            k.outline(2, k.rgb(255, 200, 0)),
            k.color(60, 40, 20),
            k.area(),
            'leaderboard-btn'
        ]);

        k.add([
            k.text('Ver Ranking', { size: 18, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 560),
            k.anchor('center'),
            k.color(255, 200, 0)
        ]);

        // Validar nombre
        function validateName(name) {
            if (name.trim() === '') {
                return 'El nombre no puede estar vacío';
            }
            if (name.length > 15) {
                return 'Máximo 15 caracteres';
            }
            if (!/^[a-zA-Z0-9]+$/.test(name)) {
                return 'Solo letras y números';
            }
            return null;
        }

        // Capturar teclas
        k.onCharInput((char) => {
            if (!inputActive) return;

            if (playerName.length < 15 && /^[a-zA-Z0-9]$/.test(char)) {
                playerName += char;
                inputText.text = playerName;
                errorText.text = '';
            }
        });

        // Tecla Backspace
        k.onKeyPress('backspace', () => {
            if (!inputActive) return;

            if (playerName.length > 0) {
                playerName = playerName.slice(0, -1);
                inputText.text = playerName;
                errorText.text = '';
            }
        });

        // Tecla Enter
        k.onKeyPress('enter', () => {
            if (!inputActive) return;

            const error = validateName(playerName);
            if (error) {
                errorText.text = error;
                inputBox.color = k.rgb(100, 20, 20);
                k.wait(0.2, () => {
                    inputBox.color = k.rgb(20, 20, 60);
                });
                return;
            }

            window.gameData.playerName = playerName;
            window.gameData.currentScore = 0;
            inputActive = false;
            k.go('gameScene');
        });

        // Click en botón leaderboard
        leaderboardBtn.onClick(() => {
            k.go('leaderboard', { fromGame: false });
        });

        // Cursor parpadeante
        let cursorVisible = true;
        k.loop(0.5, () => {
            if (inputActive) {
                cursorVisible = !cursorVisible;
                inputText.text = playerName + (cursorVisible ? '|' : '');
            }
        });
    });
}