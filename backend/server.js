import { getQuery, runQuery, eachQuery } from "./database/model/dbUtils.js";

// ********** Express Server **********
// This is unfinished starter code for the server that has the endpoints.

// import express from 'express';

// const server = express();

// const port = 5000;

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// example of testing/usage of a query...all queries will be in the model folder
// to reference the queries, just use the name of the sql file without the extension
// look at dbUtils.js for more info on how to use the query functions 
try {
    runQuery("createUser", ["idiot", "holmes"]);
} catch (error) {
    console.error("Error creating user:", error);
}