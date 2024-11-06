import db from '../db.js';
import { readFileSync } from 'fs';
import { join } from 'path';

export function getQuery(queryFileName, params) {
    return getStatementFromSQLFile(queryFileName).get(...params);
}

export function runQuery(queryFileName, params) {
    return getStatementFromSQLFile(queryFileName).run(...params);
}

export function eachQuery(queryFileName, params) {
    return getStatementFromSQLFile(queryFileName).each(...params);
}

function getStatementFromSQLFile(fileName) {
    return db.prepare(readFileSync(join("database", "model", fileName + ".sql"), 'utf8'));
}