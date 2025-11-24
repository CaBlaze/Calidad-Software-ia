// frontend/src/scenes/gameOverScene.js
import { GAME_WIDTH, GAME_HEIGHT } from '../utils/constants.js';
import { saveScore } from '../apiClient.js';

export default function gameOverScene(k) {
    k.scene('gameover', ({ victory, score }) => {
        let scoreSaved = false;

        // Fondo
        k.add([
            k.rect(GAME_WIDTH, GAME_HEIGHT),
            k.pos(0, 0),
            k.color(0, 0, 0),
            k.opacity(0.8),
            k.z(-1)
        ]);

        // Título
        const title = victory ? '¡VICTORIA!' : 'GAME OVER';
        const titleColor = victory ? k.rgb(0, 255, 0) : k.rgb(255, 0, 0);

        k.add([
            k.text(title, { size: 64, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 150),
            k.anchor('center'),
            k.color(titleColor)
        ]);

        // Puntuación
        k.add([
            k.text(`Puntuación: ${score}`, { size: 32, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 250),
            k.anchor('center'),
            k.color(255, 255, 255)
        ]);

        // Jugador
        k.add([
            k.text(`Jugador: ${window.gameData.playerName}`, { size: 24, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 300),
            k.anchor('center'),
            k.color(0, 255, 255)
        ]);

        // Mensaje de guardado
        const savingText = k.add([
            k.text('Guardando puntuación...', { size: 18, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 350),
            k.anchor('center'),
            k.color(255, 255, 0)
        ]);

        // Guardar puntuación
        saveScore(window.gameData.playerName, score)
            .then(() => {
                scoreSaved = true;
                savingText.text = '✓ Puntuación guardada';
                savingText.color = k.rgb(0, 255, 0);
            })
            .catch((error) => {
                console.error('Error saving score:', error);
                savingText.text = '✗ Error al guardar (se guardará más tarde)';
                savingText.color = k.rgb(255, 100, 0);
            });

        // Instrucciones
        k.add([
            k.text('Presiona ENTER para volver al inicio', { size: 18, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 450),
            k.anchor('center'),
            k.color(200, 200, 200)
        ]);

        k.add([
            k.text('Presiona L para ver el Ranking', { size: 18, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 490),
            k.anchor('center'),
            k.color(200, 200, 200)
        ]);

        // Controles
        k.onKeyPress('enter', () => {
            k.go('start');
        });

        k.onKeyPress('l', () => {
            k.go('leaderboard', { fromGame: true });
        });
    });
}