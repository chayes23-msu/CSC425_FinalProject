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
        return Promise.reject(error);
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
        return Promise.reject(error);
    }
}

/**
 * 
 * @param {*} queryFileName This is the file name (WITHOUT THE EXTENSION) of the sql you want to run 
 * @param {*} params This is an array of the parameters you want to pass to the query
 * @returns Array of objects representing each row returned by the query
 */
export function allQuery(queryFileName, params) {
    try {
        return getStatementFromSQLFile(queryFileName).all(params);
    } catch (error) {
        console.error(`Error running all-query "${queryFileName}":`, error);
        return Promise.reject(error);
    }
}

/**
 * This method SHOULD NOT be used for any endpoints. It is here for special cases for the seeder.
 * @param {*} queryString This is the query string you want to run
 * @param {*} params This is an array of the parameters you want to pass to the query
 * @returns An object summarizing changes made by the query
 */
export function stringRunQuery(queryString, params) {
    try {
        return db.prepare(queryString).run(params);
    } catch (error) {
        console.error(`Error running string-run-query:`, error);
        return Promise.reject(error);
    }
}

/**
 * 
 * @param {string} fileName The name of the file (WITHOUT THE EXTENSION) you want to get the statement from (only files in model folder)
 * @returns A prepared statement for the query
 */
function getStatementFromSQLFile(fileName) {
    try {
        const filePath = join("backend", "database", "queries", `${fileName}.sql`);
        return db.prepare(readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error(`Error reading SQL file "${fileName}":`, error);
        return Promise.reject(error);
    }
}