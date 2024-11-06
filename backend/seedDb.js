import { runQuery, getQuery, eachQuery } from "./database/dbUtils.js";

runQuery("createColor", {color: "red"});