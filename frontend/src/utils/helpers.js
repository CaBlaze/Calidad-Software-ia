// Funciones auxiliares para el juego

/**
 * Valida el nickname del jugador
 * @param {string} nickname - Nombre a validar
 * @returns {Object} - {valid: boolean, error: string}
 */
export function validateNickname(nickname) {
  if (!nickname || typeof nickname !== 'string') {
    return { valid: false, error: 'El nickname no puede estar vacío' };
  }

  const trimmed = nickname.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'El nickname no puede estar vacío' };
  }

  if (trimmed.length > 15) {
    return { valid: false, error: 'El nickname no puede exceder 15 caracteres' };
  }

  if (!/^[a-zA-Z0-9]+$/.test(trimmed)) {
    return { valid: false, error: 'Solo se permiten caracteres alfanuméricos' };
  }

  return { valid: true, error: '' };
}

/**
 * Limpia el nickname quitando espacios extras
 * @param {string} nickname - Nombre a limpiar
 * @returns {string} - Nickname limpio
 */
export function sanitizeNickname(nickname) {
  return nickname.trim().substring(0, 15);
}

/**
 * Formatea el puntaje con separadores de miles
 * @param {number} score - Puntaje a formatear
 * @returns {string} - Puntaje formateado
 */
export function formatScore(score) {
  return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Verifica colisión entre dos rectángulos
 * @param {Object} rect1 - Primer rectángulo {x, y, width, height}
 * @param {Object} rect2 - Segundo rectángulo {x, y, width, height}
 * @returns {boolean} - True si hay colisión
 */
export function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

/**
 * Genera un número aleatorio entre min y max
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} - Número aleatorio
 */
export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Genera un entero aleatorio entre min y max (inclusivo)
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} - Entero aleatorio
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clampea un valor entre un mínimo y máximo
 * @param {number} value - Valor a clampear
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} - Valor clampeado
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Formatea una fecha a string legible
 * @param {Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
export function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Maneja reintentos de operaciones asíncronas
 * @param {Function} fn - Función asíncrona a ejecutar
 * @param {number} retries - Número de reintentos
 * @param {number} delay - Delay entre reintentos en ms
 * @returns {Promise} - Resultado de la función
 */
export async function retryAsync(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }

    await new Promise(resolve => setTimeout(resolve, delay));
    return retryAsync(fn, retries - 1, delay);
  }
}

/**
 * Espera un tiempo determinado
 * @param {number} ms - Milisegundos a esperar
 * @returns {Promise} - Promesa que se resuelve después del tiempo
 */
export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}