import { runQuery, getQuery, allQuery } from "./database/dbUtils.js";

// This file can be ran to seed the database with data for testing.

function addColors() {
    let colors = ["red", "blue", "green", "yellow", "purple", "orange", "black", "white"];
    colors.forEach(color => {
        runQuery("createColor", {color: color});
    });
}
addColors();