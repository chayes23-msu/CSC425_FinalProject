/* Contains the schema for our database. */

BEGIN;

CREATE TABLE IF NOT EXISTS Users (
    userID INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Colors (
    colorID INTEGER PRIMARY KEY AUTOINCREMENT,
    color TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Breeds (
    breedID INTEGER PRIMARY KEY AUTOINCREMENT,
    breed TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Animals (
    animalID INTEGER PRIMARY KEY AUTOINCREMENT,
    colorID INTEGER DEFAULT NULL,
    motherID INTEGER DEFAULT NULL,
    fatherID INTEGER DEFAULT NULL,
    birthDate DATE NOT NULL,
    name TEXT,
    type TEXT NOT NULL,
    currentWeight INTEGER,
    tagNumber INTEGER NOT NULL,
    breedComposition TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colorID) REFERENCES Colors(colorID),
    FOREIGN KEY (motherID) REFERENCES Animals(animalID),
    FOREIGN KEY (fatherID) REFERENCES Animals(animalID)
);

CREATE TABLE IF NOT EXISTS NotebookEntries (
    entryID INTEGER PRIMARY KEY AUTOINCREMENT,
    animalID INTEGER NOT NULL,
    content TEXT NOT NULL,
    weight INTEGER,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    userID INTEGER NOT NULL,
    FOREIGN KEY (animalID) REFERENCES Animals(animalID),
    FOREIGN KEY (userID) REFERENCES Users(userID)
);



COMMIT;