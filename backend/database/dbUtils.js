import db from './db.js';
import { readFileSync } from 'fs';
import { join } from 'path';

// ********** Database Utility Functions **********
// Documentation for the core functions found at 

/**
 * 
 * @param {*} queryFileName This is the file name (WITHOUT THE EXTENSION) of the sql you want to run 
 * @param {*} params This is an array of the parameters you want to pass to the query
 * @returns Object representing the one row result
 */
export function getQuery(queryFileName, params) {
    try {
        return getStatementFromSQLFile(queryFileName).get(params);
    } catch (error) {
        console.error(`Error running get-query "${queryFileName}":`, error);
        throw new Error(`Failed to run get-query "${queryFileName}": ${error.message}`);
    }
}

/**
 * 
 * @param {*} queryFileName This is the file name (WITHOUT THE EXTENSION) of the sql you want to run 
 * @param {*} params This is an array of the parameters you want to pass to the query
 * @returns An object summarizing changes made by the query
 */
export function runQuery(queryFileName, params) {
    try {
        return getStatementFromSQLFile(queryFileName).run(params);
    } catch (error) { 
        console.error(`Error running run-query "${queryFileName}":`, error);
        throw new Error(`Failed to run run-query "${queryFileName}": ${error.message}`);
    }
}

/**
 * 
 * @param {*} queryFileName This is the file name (WITHOUT THE EXTENSION) of the sql you want to run 
 * @param {*} params This is an array of the parameters you want to pass to the query
 * @returns Object representing each row returned by the query
 */
export function allQuery(queryFileName, params) {
    try {
        return getStatementFromSQLFile(queryFileName).all(params);
    } catch (error) {
        console.error(`Error running all-query "${queryFileName}":`, error);
        throw new Error(`Failed to run all-query "${queryFileName}": ${error.message}`);
    }
}

function getStatementFromSQLFile(fileName) {
    try {
        const filePath = join("backend", "database", "model", `${fileName}.sql`);
        return db.prepare(readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error(`Error reading SQL file "${fileName}":`, error);
        throw new Error(`Failed to load SQL file "${fileName}": ${error.message}`);
    }
}