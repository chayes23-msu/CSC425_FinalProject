import { runQuery, getQuery, allQuery } from "./dbUtils.js";

// This file can be ran to seed the database with data for testing.

function addColors() {
    let colors = ["dark blue"];
    colors.forEach(color => {
        runQuery("createColor", {color: color});
    });
}

addColors();

function addAnimals() {
    let animals = [
        {
            colorID: 1,
            motherID: null,
            fatherID: null,
            birthDate: "2021-01-01",
            name: "Fluffy",
            type: "cow",
            currentWeight: 1123,
            breedComposition: "Holstein"
        },
    ];
    animals.forEach(animal => {
        runQuery("createAnimal", animal);
    });
}
addAnimals();

