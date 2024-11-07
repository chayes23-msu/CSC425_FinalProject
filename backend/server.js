import { getQuery, runQuery, allQuery } from "./database/dbUtils.js";
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
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Get all colors
app.get('/colors', async (req, res) => {
    try {
        const colors = await allQuery("getColors", {});
        res.json(colors);
    } catch (error) {
        console.error("Error getting colors:", error);
        res.status(500).send("Error getting colors");
    }
});

// Get user by username
app.get('/user/:username', async (req, res) => {
    try {
        const user = await allQuery("getUser", {username: req.params.username});

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.json(user);
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).send("Error getting user");
    }
});

// post to create a user
app.post('/user', async (req, res) => {
    console.log(req);
    const { username, password } = req.body;
    
    // Input validation
    if (!username || !password) {
      return res.status(400).send("Username and password are required.");
    }
  
    try {
        await runQuery("createUser", {username: username, password: password});
        res.status(201).send("User created");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});

// Read SSL certificate and key files
const options = {
    key: readFileSync(join("backend", "localhost-key.pem")),
    cert: readFileSync(join("backend", "localhost.pem")),
};

// Create https server
const server = https.createServer(options, app);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


// example of testing/usage of a query...all queries will be in the model folder
// to reference the queries, just use the name of the sql file without the extension
// look at dbUtils.js for more info on how to use the query functions 
// try {
//     runQuery("createUser", ["idiot", "holmes"]);
// } catch (error) {
//     console.error("Error creating user:", error);
// }