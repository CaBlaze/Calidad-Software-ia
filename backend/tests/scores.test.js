import request from 'supertest';
import app from '../server.js';
import { deleteAllScores } from '../src/services/scores.service.js';

describe('Scores API', () => {
    // Limpiar base de datos antes de cada test
    beforeEach(async () => {
        await deleteAllScores();
    });

    describe('GET /api/health', () => {
        test('debe retornar status ok', async () => {
            const response = await request(app)
                .get('/api/health')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'ok');
            expect(response.body).toHaveProperty('timestamp');
        });
    });

    describe('POST /api/scores', () => {
        test('debe crear un puntaje válido', async () => {
            const scoreData = {
                playerName: 'PLAYER1',
                score: 1500
            };

            const response = await request(app)
                .post('/api/scores')
                .send(scoreData)
                .expect(201);

            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('playerName', 'PLAYER1');
            expect(response.body).toHaveProperty('score', 1500);
        });

        test('debe rechazar playerName vacío', async () => {
            const scoreData = {
                playerName: '',
                score: 1000
            };

            const response = await request(app)
                .post('/api/scores')
                .send(scoreData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.details).toContain('playerName no puede estar vacío');
        });

        test('debe rechazar playerName mayor a 15 caracteres', async () => {
            const scoreData = {
                playerName: 'VERYLONGNAMEHERE123',
                score: 1000
            };

            const response = await request(app)
                .post('/api/scores')
                .send(scoreData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        test('debe rechazar playerName con caracteres especiales', async () => {
            const scoreData = {
                playerName: 'PLAYER@1',
                score: 1000
            };

            const response = await request(app)
                .post('/api/scores')
                .send(scoreData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        test('debe rechazar score negativo', async () => {
            const scoreData = {
                playerName: 'PLAYER1',
                score: -100
            };

            const response = await request(app)
                .post('/api/scores')
                .send(scoreData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        test('debe rechazar score no numérico', async () => {
            const scoreData = {
                playerName: 'PLAYER1',
                score: 'not a number'
            };

            const response = await request(app)
                .post('/api/scores')
                .send(scoreData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /api/scores', () => {
        test('debe retornar array vacío si no hay puntajes', async () => {
            const response = await request(app)
                .get('/api/scores')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toHaveLength(0);
        });

        test('debe retornar puntajes ordenados descendentemente', async () => {
            // Crear varios puntajes
            await request(app).post('/api/scores').send({ playerName: 'ACE', score: 2000 });
            await request(app).post('/api/scores').send({ playerName: 'PRO', score: 3000 });
            await request(app).post('/api/scores').send({ playerName: 'NOOB', score: 500 });

            const response = await request(app)
                .get('/api/scores')
                .expect(200);

            expect(response.body).toHaveLength(3);
            expect(response.body[0].score).toBe(3000);
            expect(response.body[1].score).toBe(2000);
            expect(response.body[2].score).toBe(500);
        });

        test('debe respetar el límite especificado', async () => {
            // Crear 15 puntajes
            for (let i = 0; i < 15; i++) {
                await request(app).post('/api/scores').send({
                    playerName: `PLAYER${i}`,
                    score: i * 100
                });
            }

            const response = await request(app)
                .get('/api/scores?limit=5')
                .expect(200);

            expect(response.body).toHaveLength(5);
        });

        test('debe usar límite por defecto de 10', async () => {
            // Crear 20 puntajes
            for (let i = 0; i < 20; i++) {
                await request(app).post('/api/scores').send({
                    playerName: `P${i}`,
                    score: i * 100
                });
            }

            const response = await request(app)
                .get('/api/scores')
                .expect(200);

            expect(response.body).toHaveLength(10);
        });

        test('debe rechazar límite inválido', async () => {
            const response = await request(app)
                .get('/api/scores?limit=invalid')
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        test('debe rechazar límite menor a 1', async () => {
            const response = await request(app)
                .get('/api/scores?limit=0')
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        test('debe retornar datos completos de cada puntaje', async () => {
            await request(app).post('/api/scores').send({
                playerName: 'TEST',
                score: 1234
            });

            const response = await request(app)
                .get('/api/scores')
                .expect(200);

            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('playerName', 'TEST');
            expect(response.body[0]).toHaveProperty('score', 1234);
            expect(response.body[0]).toHaveProperty('createdAt');
        });
    });
});