import { runQuery, getQuery, allQuery } from "./database/dbUtils.js";

function addColors() {
    let colors = ["red", "blue", "green", "yellow", "purple", "orange", "black", "white"];
    colors.forEach(color => {
        runQuery("createColor", {color: color});
    });
}
addColors();

