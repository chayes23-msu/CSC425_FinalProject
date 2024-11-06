import { getQuery, runQuery, eachQuery } from "./database/model/dbUtils.js";
import { readFileSync } from 'fs';
import { join } from 'path';
import express from 'express';
import https from 'https';
import morgan from 'morgan';
// ********** Express Server **********
// This is unfinished starter code for the server that has the endpoints.

const app = express();

// Middleware
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Port
const port = 5000;

// Read SSL certificate and key files
const options = {
    key: readFileSync(join("backend", "localhost-key.pem")),
    cert: readFileSync(join("backend", "localhost.pem")),
};

// Create https server
const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// example of testing/usage of a query...all queries will be in the model folder
// to reference the queries, just use the name of the sql file without the extension
// look at dbUtils.js for more info on how to use the query functions 
// try {
//     runQuery("createUser", ["idiot", "holmes"]);
// } catch (error) {
//     console.error("Error creating user:", error);
// }