import Database from 'better-sqlite3';
import { join } from 'path';
import { readFileSync } from 'fs';

/*  Use this file to load or initialize databases based on the schema.
    The database file path you want to use should be set in the launch.json file.
    Keep database files in the database-files folder.
    This database setup is based off of code at https://learn.foundersandcoders.com/learn/database/

*/
let db;

try {
    const dbPath = process.env.DB_PATH;
    if (!dbPath) {
        throw new Error("DB_PATH environment variable is not set.");
    }

    db = new Database(dbPath);

    const schemaPath = join("backend", "database", "schema.sql");
    const schema = readFileSync(schemaPath, 'utf8');
    db.exec(schema);
    db.prepare("PRAGMA foreign_keys = ON;").run();

} catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);  // Exit the process if initialization fails
}

export default db;