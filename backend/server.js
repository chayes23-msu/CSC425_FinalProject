import { getQuery, runQuery, eachQuery } from "./database/model/dbUtils.js";
// import express from 'express';

// const server = express();

// const port = 5000;

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

try {
    runQuery("createUser", ["idiot", "holmes"]);
} catch (error) {
    console.error("Error creating user:", error);
}