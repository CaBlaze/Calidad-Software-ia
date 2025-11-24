// frontend/src/scenes/leaderboardScene.js
import { GAME_WIDTH, GAME_HEIGHT } from '../utils/constants.js';
import { getTopScores } from '../apiClient.js';

export default function leaderboardScene(k) {
    k.scene('leaderboard', ({ fromGame = false }) => {
        // Fondo
        k.add([
            k.rect(GAME_WIDTH, GAME_HEIGHT),
            k.pos(0, 0),
            k.color(10, 10, 30),
            k.z(-1)
        ]);

        // Título
        k.add([
            k.text('RANKING', { size: 48, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 50),
            k.anchor('center'),
            k.color(255, 200, 0)
        ]);

        // Mensaje de carga
        const loadingText = k.add([
            k.text('Cargando...', { size: 24, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 300),
            k.anchor('center'),
            k.color(255, 255, 255)
        ]);

        // Obtener y mostrar puntuaciones
        getTopScores(10)
            .then((response) => {
                loadingText.destroy();

                // ✅ CAMBIO: data.scores → response.data
                if (!response.data || response.data.length === 0) {
                    k.add([
                        k.text('No hay puntuaciones aún', { size: 20, font: 'monospace' }),
                        k.pos(GAME_WIDTH / 2, 300),
                        k.anchor('center'),
                        k.color(200, 200, 200)
                    ]);
                } else {
                    // Encabezados
                    k.add([
                        k.text('POS', { size: 18, font: 'monospace' }),
                        k.pos(150, 120),
                        k.color(0, 255, 255)
                    ]);

                    k.add([
                        k.text('JUGADOR', { size: 18, font: 'monospace' }),
                        k.pos(250, 120),
                        k.color(0, 255, 255)
                    ]);

                    k.add([
                        k.text('PUNTUACIÓN', { size: 18, font: 'monospace' }),
                        k.pos(500, 120),
                        k.color(0, 255, 255)
                    ]);

                    // Línea separadora
                    k.add([
                        k.rect(600, 2),
                        k.pos(GAME_WIDTH / 2, 145),
                        k.anchor('center'),
                        k.color(0, 255, 255)
                    ]);

                    // ✅ CAMBIO: data.scores → response.data
                    // Mostrar puntuaciones
                    response.data.forEach((entry, index) => {
                        const yPos = 170 + index * 35;
                        // ✅ CAMBIO: entry.player_name → entry.nickname
                        const isCurrentPlayer = entry.nickname === window.gameData.playerName;
                        const textColor = isCurrentPlayer ? k.rgb(0, 255, 0) : k.rgb(255, 255, 255);

                        // Posición
                        k.add([
                            k.text(`${index + 1}`, { size: 20, font: 'monospace' }),
                            k.pos(160, yPos),
                            k.color(textColor)
                        ]);

                        // ✅ CAMBIO: entry.player_name → entry.nickname
                        // Nombre
                        k.add([
                            k.text(entry.nickname, { size: 20, font: 'monospace' }),
                            k.pos(250, yPos),
                            k.color(textColor)
                        ]);

                        // Puntuación
                        k.add([
                            k.text(entry.score.toString(), { size: 20, font: 'monospace' }),
                            k.pos(500, yPos),
                            k.color(textColor)
                        ]);
                    });
                }
            })
            .catch((error) => {
                console.error('Error loading leaderboard:', error);
                loadingText.text = 'Error al cargar el ranking';
                loadingText.color = k.rgb(255, 0, 0);
            });

        // Instrucciones
        k.add([
            k.text('Presiona ENTER para volver', { size: 18, font: 'monospace' }),
            k.pos(GAME_WIDTH / 2, 550),
            k.anchor('center'),
            k.color(200, 200, 200)
        ]);

        // Controles
        k.onKeyPress('enter', () => {
            if (fromGame) {
                k.go('gameover', { victory: false, score: window.gameData.currentScore });
            } else {
                k.go('start');
            }
        });
    });
}