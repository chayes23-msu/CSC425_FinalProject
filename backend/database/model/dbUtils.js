import db from '../db.js';
import { readFileSync } from 'fs';
import { join } from 'path';

// ********** Database Utility Functions **********
// Documentation for the core functions found at https://github.com/TryGhost/node-sqlite3/wiki/API

/**
 * 
 * @param {*} queryFileName This is the file name (WITHOUT THE EXTENSION) of the sql you want to run 
 * @param {*} params This is an array of the parameters you want to pass to the query
 * @returns Object representing the one row result
 */
export function getQuery(queryFileName, params) {
    return getStatementFromSQLFile(queryFileName).get(...params);
}

/**
 * 
 * @param {*} queryFileName This is the file name (WITHOUT THE EXTENSION) of the sql you want to run 
 * @param {*} params This is an array of the parameters you want to pass to the query
 * @returns An object summarizing changes made by the query
 */
export function runQuery(queryFileName, params) {
    return getStatementFromSQLFile(queryFileName).run(...params);
}

/**
 * 
 * @param {*} queryFileName This is the file name (WITHOUT THE EXTENSION) of the sql you want to run 
 * @param {*} params This is an array of the parameters you want to pass to the query
 * @returns Object representing each row returned by the query
 */
export function eachQuery(queryFileName, params) {
    return getStatementFromSQLFile(queryFileName).each(...params);
}

function getStatementFromSQLFile(fileName) {
    return db.prepare(readFileSync(join("backend", "database", "model", fileName + ".sql"), 'utf8'));
}