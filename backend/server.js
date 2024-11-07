import { getQuery, runQuery, allQuery } from "./database/dbUtils.js";
import { readFileSync } from 'fs';
import { hashPassword, verifyPassword } from "./hasher.js";
import express from 'express';
import https from 'https';
import morgan from 'morgan';

// ********** Express Server **********
// This is unfinished starter code for the server that has the endpoints.

// Check for necessary environment variables
if (!process.env.PORT || !process.env.KEY_PATH || !process.env.CERT_PATH) {
    console.error("Error: Missing required environment variables.");
    process.exit(1);
}

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

//#region Routes
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

app.post('/colors', async (req, res) => {
    const { color } = req.body;
    
    // Input validation
    if (!color) {
      return res.status(400).send("Color is required.");
    }
  
    try {
        await runQuery("createColor", {color: color});
        res.status(201).send("Color created");
    } catch (error) {
        console.error("Error creating color:", error);
        res.status(500).send("Error creating color");
    }
});

app.delete('/colors/:colorID', async (req, res) => {
    try {
        await runQuery("deleteColor", {colorID: req.params.colorID});
        res.status(204).send("Color deleted");
    } catch (error) {
        console.error("Error deleting color:", error);
        res.status(500).send("Error deleting color");
    }
});

app.put('/colors/:colorID', async (req, res) => {
    const { color } = req.body;
    
    // Input validation
    if (!color) {
      return res.status(400).send("Color is required.");
    }
  
    try {
        await runQuery("updateColor", {color: color, colorID: req.params.colorID});
        res.status(204).send("Color updated");
    } catch (error) {
        console.error("Error updating color:", error);
        res.status(500).send("Error updating color");
    }
});

// Get all breeds
app.get('/breeds', async (req, res) => {
    try {
        const breeds = await allQuery("getBreeds", {});
        res.json(breeds);
    } catch (error) {
        console.error("Error getting breeds:", error);
        res.status(500).send("Error getting breeds");
    }
});

// Create a breed
app.post('/breeds', async (req, res) => {
    const { breed } = req.body;
    
    // Input validation
    if (!breed) {
      return res.status(400).send("Breed is required.");
    }
  
    try {
        await runQuery("createBreed", {breed: breed});
        res.status(201).send("Breed created");
    } catch (error) {
        console.error("Error creating breed:", error);
        res.status(500).send("Error creating breed");
    }
});

app.delete('/breeds/:breedID', async (req, res) => {
    try {
        await runQuery("deleteBreed", {breedID: req.params.breedID});
        res.status(204).send("Breed deleted");
    } catch (error) {
        console.error("Error deleting breed:", error);
        res.status(500).send("Error deleting breed");
    }
});

app.put('/breeds/:breedID', async (req, res) => {
    const { breed } = req.body;
    
    // Input validation
    if (!breed) {
      return res.status(400).send("Breed is required.");
    }
  
    try {
        await runQuery("updateBreed", {breed: breed, breedID: req.params.breedID});
        res.status(204).send("Breed updated");
    } catch (error) {
        console.error("Error updating breed:", error);
        res.status(500).send("Error updating breed");
    }
});

// Get user by username
app.get('/users/:username', async (req, res) => {
    try {
        const user = await getQuery("getUser", {username: req.params.username});

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.json(user);
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).send("Error getting user");
    }
});

// Create a user
app.post('/users', async (req, res) => {
    console.log(req);
    const { username, password } = req.body;
    
    // Input validation
    if (!username || !password) {
      return res.status(400).send("Username and password are required.");
    }
  
    try {
        const hashedPassword = await hashPassword(password);
        await runQuery("createUser", {username: username, password: hashedPassword});
        res.status(201).send("User created");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});
//#endregion

//#region Start HTTPS Server
// Read SSL certificate and key files
const options = {
    key: readFileSync(process.env.KEY_PATH),
    cert: readFileSync(process.env.CERT_PATH),
};

// Create https server
const server = https.createServer(options, app);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
//#endregion