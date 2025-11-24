import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initializeDatabase() {
    let connection;

    try {
        // Conectar sin especificar base de datos
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '123456',
        });

        console.log('📦 Conectado a MySQL');

        // Crear base de datos si no existe
        const dbName = process.env.DB_NAME || 'space_invaders';
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        console.log(`✅ Base de datos '${dbName}' lista`);

        // Usar la base de datos
        await connection.query(`USE ${dbName}`);

        // Leer y ejecutar el schema.sql
        const schemaPath = join(__dirname, '../../schema.sql');
        const schema = await fs.readFile(schemaPath, 'utf-8');

        // Dividir por statements y ejecutar uno por uno
        const statements = schema
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0);

        for (const statement of statements) {
            await connection.query(statement);
        }

        console.log('✅ Tablas creadas exitosamente');
        console.log('🎮 Base de datos inicializada correctamente');

    } catch (error) {
        console.error('❌ Error inicializando base de datos:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// Ejecutar si se llama directamente
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    initializeDatabase();
}

export default initializeDatabase;