// frontend/src/apiClient.js
import { API_URL } from './utils/constants.js';

export async function sendScore(playerName, score) {
    try {
        const response = await fetch(`${API_URL}/scores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: playerName,
                score: score
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);
            throw new Error(`Error ${response.status}: ${errorData.message || 'Error al guardar'}`);
        }

        const data = await response.json();
        console.log('Score guardado exitosamente:', data);
        return data;
    } catch (error) {
        console.error('Error al enviar score:', error);
        throw error;
    }
}

// Alias para compatibilidad (exportar ambos nombres)
export const saveScore = sendScore;

export async function getScores(limit = 10) {
    try {
        const response = await fetch(`${API_URL}/scores?limit=${limit}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: Error al obtener scores`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener scores:', error);
        throw error;
    }
}

// Alias para compatibilidad
export const getTopScores = getScores;

export async function checkHealth() {
    try {
        const response = await fetch(`${API_URL}/health`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al verificar salud del servidor:', error);
        return { status: 'error', message: error.message };
    }
}