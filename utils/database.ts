import * as Crypto from 'expo-crypto';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('mboka.db');

export const initDatabase = () => {
    db.execSync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
};

export const hashPassword = async (password: string): Promise<string> => {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
    );
    return digest;
};

export const createUser = async (email: string, username: string, password: string): Promise<boolean> => {
    try {
        const hashedPassword = await hashPassword(password);
        db.runSync(
            'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
            [email, username, hashedPassword]
        );
        return true;
    } catch (error) {
        console.error('Error creating user:', error);
        return false;
    }
};

export const verifyUser = async (identifier: string, password: string): Promise<boolean> => {
    try {
        const hashedPassword = await hashPassword(password);
        const result = db.getAllSync<{ password: string }>(
            'SELECT password FROM users WHERE email = ? OR username = ?',
            [identifier, identifier]
        );

        if (result.length > 0) {
            return result[0].password === hashedPassword;
        }
        return false;
    } catch (error) {
        console.error('Error verifying user:', error);
        return false;
    }
};

export const updatePassword = async (identifier: string, newPassword: string): Promise<boolean> => {
    try {
        const hashedPassword = await hashPassword(newPassword);
        db.runSync(
            'UPDATE users SET password = ? WHERE email = ? OR username = ?',
            [hashedPassword, identifier, identifier]
        );
        return true;
    } catch (error) {
        console.error('Error updating password:', error);
        return false;
    }
};

// Initialize DB immediately
initDatabase();
