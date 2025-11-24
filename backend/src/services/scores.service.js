import pool from '../config/database.js';

export async function saveScore(nickname, score) {
    try {
        const query = `
            INSERT INTO scores (nickname, score, created_at)
            VALUES (?, ?, NOW())
        `;

        const [result] = await pool.query(query, [nickname, score]);

        return {
            id: result.insertId,
            nickname,
            score
        };
    } catch (error) {
        console.error('Error en saveScore:', error);
        throw error;
    }
}

export async function getTopScores(limit = 10) {
    try {
        const query = `
            SELECT id, nickname, score, created_at
            FROM scores
            ORDER BY score DESC, created_at ASC
            LIMIT ?
        `;

        const [rows] = await pool.query(query, [limit]);
        return rows;
    } catch (error) {
        console.error('Error en getTopScores:', error);
        throw error;
    }
}

export async function getAllScores() {
    try {
        const query = `
            SELECT id, nickname, score, created_at
            FROM scores
            ORDER BY score DESC, created_at ASC
        `;

        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error en getAllScores:', error);
        throw error;
    }
}