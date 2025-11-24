-- backend/schema.sql
CREATE DATABASE IF NOT EXISTS space_invaders;
USE space_invaders;

-- Tabla de scores
CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(15) NOT NULL,
    score INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_score (score DESC),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar algunos datos de ejemplo (opcional)
-- INSERT INTO scores (nickname, score) VALUES
-- ('Player1', 1500),
-- ('Player2', 1200),
-- ('Player3', 1000);