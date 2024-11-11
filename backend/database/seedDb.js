import { runQuery } from "./dbUtils.js";

// This file can be ran to seed the database with data for testing.
let users = [
    {
        username: "user1",
        password: "password1"
    },
    {
        username: "user2",
        password: "password2"
    },
    {
        username: "user3",
        password: "password3"
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
        currentWeight: 1123,
        breedComposition: "Holstein"
    },
    {
        colorID: Math.floor(Math.random() * colors.length),
        motherID: null,
        fatherID: null,
        birthDate: "2020-02-24",
        name: "Bruce",
        type: "bull",
        currentWeight: 2340,
        breedComposition: "Holstein"
    },
    {
        colorID: Math.floor(Math.random() * (colors.length)),
        motherID: 1,
        fatherID: 2,
        birthDate: "2024-11-11",
        name: "Gerald",
        type: "calf",
        currentWeight: 950,
        breedComposition: "Holstein"
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
        userID: 2,
        weight: 2345
    },
    {
        animalID: 3,
        content: "This is yet another test entry",
        userID: 3,
        weight: 3456
    },
    {
        animalID: 1,
        content: "This is another test entry",
        userID: 2,
        weight: 4567
    }
]

function addColors() {
    colors.forEach(color => {
        runQuery("createColor", {color: color});
    });
}
addColors();

function addAnimals() {
    animals.forEach(animal => {
        runQuery("createAnimal", animal);
    });
}
addAnimals();

function addBreeds() {
    breeds.forEach(breed => {
        runQuery("createBreed", {breed: breed});
    });
}
addBreeds();

function addUsers() {
    users.forEach(user => {
        runQuery("createUser", user);
    });
}
addUsers();

function addNotebookEntries() {
    notebookEntries.forEach(entry => {
        runQuery("createNotebookEntry", entry);
    });
}
addNotebookEntries();

