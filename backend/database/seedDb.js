import { runQuery, stringRunQuery } from "./dbUtils.js";
import { hashPassword } from "../authentication/hasher.js";

// This file can be ran to seed the database with data for testing. 
let users = [
    {
        username: "user1",
        password: await hashPassword("password1")
    },
    {
        username: "user2",
        password: await hashPassword("password2")
    },
    {
        username: "user3",
        password: await hashPassword("password3")
    }
]
let colors = ["Dark Brown", "Light Brown", "White", "Black", "Red", "Tan", "Grey", "Yellow", "Orange", "Green", "Blue", "Purple"];
let breeds = ["Angus", "YN", "BN", "Holstein"]
let animals = [
    {
        colorID: Math.floor(Math.random() * colors.length),
        motherID: null,
        fatherID: null,
        birthDate: "2021-01-01",
        name: "Fluffy",
        type: "cow",
        tagNumber: "123",
        currentWeight: 1123,
        breedComposition: "Holstein",
        tagNumber: "123",
        dateOfSale: "2021-01-01",
        pricePerPound: 1.50,
        totalPrice: 1684.5,
    },
    {
        colorID: Math.floor(Math.random() * colors.length),
        motherID: null,
        fatherID: null,
        birthDate: "2020-02-24",
        name: "Bruce",
        type: "bull",
        tagNumber: "457",
        currentWeight: 2340.0,
        breedComposition: "Holstein",
        tagNumber: "456",
        dateOfSale: "2021-01-01",
        pricePerPound: 1.50,
        totalPrice: 3510.0,
    },
    {
        colorID: Math.floor(Math.random() * (colors.length)),
        motherID: 1,
        fatherID: 2,
        birthDate: "2024-11-11",
        name: "Gerald",
        type: "calf",
        tagNumber: "123456",
        currentWeight: 950,
        breedComposition: "Holstein",
        tagNumber: "789",
        dateOfSale: "2025-01-01",
        pricePerPound: 1.50,
        totalPrice: 1425.0,
    },
];
let notebookEntries = [
    {
        animalID: 1,
        content: "This is a test entry",
        userID: 1,
        weight: 1234
    },
    {
        animalID: 2,
        content: "This is another test entry",
        userID: 1,
        weight: 2345
    },
    {
        animalID: 3,
        content: "This is yet another test entry",
        userID: 1,
        weight: 3456
    },
    {
        animalID: 1,
        content: "This is another test entry",
        userID: 1,
        weight: 4567
    }
]

async function addAdminAccount() {
    let query = `INSERT INTO Users (username, password, isAdmin) VALUES (?, ?, ?);`;
    let params = ["admin", await hashPassword("password"), 1];
    stringRunQuery(query, params);
}

async function addColors() {
    colors.forEach(color => {
        runQuery("createColor", {color: color});
    });
}

async function addAnimals() {
    animals.forEach(animal => {
        runQuery("createAnimal", animal);
    });
}

async function addBreeds() {
    breeds.forEach(breed => {
        runQuery("createBreed", {breed: breed});
    });
}

async function addUsers() {
    users.forEach(user => {
        runQuery("createUser", user);
    });
}

async function addNotebookEntries() {
    notebookEntries.forEach(entry => {
        runQuery("createNotebookEntry", entry);
    });
}

// comment out what you don't want to add to the database
//await addAdminAccount();
//await addColors();
//await addBreeds();
//await addAnimals();
//await addUsers();
// await addNotebookEntries();

