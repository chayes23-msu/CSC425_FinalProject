import { runQuery, getQuery, allQuery } from "./dbUtils.js";

// This file can be ran to seed the database with data for testing.

function addColors() {
    let colors = ["dark blue"];
    colors.forEach(color => {
        runQuery("createColor", {color: color});
    });
}
addColors();