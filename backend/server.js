import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import https from "https";
import morgan from "morgan";
import { hashPassword, verifyPassword } from "./authentication/hasher.js";
import {
    authenticateToken,
    generateToken,
} from "./authentication/tokenUtil.js";
import { allQuery, getQuery, runQuery } from "./database/dbUtils.js";

// ********** Express Server **********
// This is unfinished starter code for the server that has the endpoints.

// Check for necessary environment variables
if (!process.env.PORT || !process.env.KEY_PATH || !process.env.CERT_PATH) {
    console.error("Error: Missing required environment variables.");
    process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
    if (["/login"].includes(req.path)) {
        return next(); // Skip auth for these routes
    }
    authenticateToken(req, res, next);
});

//#region Routes

// Default route
app.get("/", (req, res) => {
    res.send("Connected to the server.");
});

//#region Colors
// Get all colors
app.get("/colors", async (req, res) => {
    try {
        const colors = await allQuery("getColors", {});
        res.json(colors);
    } catch (error) {
        console.error("Error getting colors:", error);
        res.status(500).send("Error getting colors");
    }
});

// Create a color
app.post("/colors", async (req, res) => {
    const { color } = req.body;

    // Input validation
    if (!color) {
        return res.status(400).send("Color is required.");
    }

    try {
        await runQuery("createColor", { color: color });
        res.status(201).send("Color created");
    } catch (error) {
        console.error("Error creating color:", error);
        res.status(500).send("Error creating color");
    }
});

// Delete a color
app.delete("/colors/:colorID", async (req, res) => {
    try {
        await runQuery("deleteColor", { colorID: req.params.colorID });
        res.status(204).send("Color deleted");
    } catch (error) {
        console.error("Error deleting color:", error);
        res.status(500).send("Error deleting color");
    }
});

// Update a color
app.put("/colors/:colorID", async (req, res) => {
    const { color } = req.body;

    // Input validation
    if (!color) {
        return res.status(400).send("Color is required.");
    }

    try {
        await runQuery("updateColor", {
            color: color,
            colorID: req.params.colorID,
        });
        res.status(204).send("Color updated");
    } catch (error) {
        console.error("Error updating color:", error);
        res.status(500).send("Error updating color");
    }
});
//#endregion

//#region Breeds
// Get all breeds
app.get("/breeds", async (req, res) => {
    try {
        const breeds = await allQuery("getBreeds", {});
        res.json(breeds);
    } catch (error) {
        console.error("Error getting breeds:", error);
        res.status(500).send("Error getting breeds");
    }
});

// Create a breed
app.post("/breeds", async (req, res) => {
    const { breed } = req.body;

    // Input validation
    if (!breed) {
        return res.status(400).send("Breed is required.");
    }

    try {
        await runQuery("createBreed", { breed: breed });
        res.status(201).send("Breed created");
    } catch (error) {
        console.error("Error creating breed:", error);
        res.status(500).send("Error creating breed");
    }
});

// Delete a breed
app.delete("/breeds/:breedID", async (req, res) => {
    try {
        await runQuery("deleteBreed", { breedID: req.params.breedID });
        res.status(204).send("Breed deleted");
    } catch (error) {
        console.error("Error deleting breed:", error);
        res.status(500).send("Error deleting breed");
    }
});

// Update a breed
app.put("/breeds/:breedID", async (req, res) => {
    const { breed } = req.body;

    // Input validation
    if (!breed) {
        return res.status(400).send("Breed is required.");
    }

    try {
        await runQuery("updateBreed", {
            breed: breed,
            breedID: req.params.breedID,
        });
        res.status(204).send("Breed updated");
    } catch (error) {
        console.error("Error updating breed:", error);
        res.status(500).send("Error updating breed");
    }
});
//#endregion

//#region Animals
// Create an animal ***NO POSTMAN TEST***
app.post("/animals", async (req, res) => {
    const {
        name,
        type,
        birthDate,
        breedComposition,
        fatherID,
        motherID,
        colorID,
        currentWeight,
    } = req.body;

    // Input validation
    if (
        !name ||
        !type ||
        !birthDate ||
        !breedComposition ||
        !fatherID ||
        !motherID ||
        !colorID ||
        !currentWeight
    ) {
        return res.status(400).send("All fields are required.");
    }

    try {
        await runQuery("createAnimal", {
            name: name,
            type: type,
            birthDate: birthDate,
            breedComposition: breedComposition,
            fatherID: fatherID,
            motherID: motherID,
            colorID: colorID,
            currentWeight: currentWeight,
        });
        res.status(201).send("Animal created");
    } catch (error) {
        console.error("Error creating animal:", error);
        res.status(500).send("Error creating animal");
    }
});

// Get all animals ***NO POSTMAN TEST***
app.get("/animals", async (req, res) => {
    try {
        const animals = await allQuery("getAnimals", {});
        res.json(animals);
    } catch (error) {
        console.error("Error getting animals:", error);
        res.status(500).send("Error getting animals");
    }
});

// Update an animal ***NO POSTMAN TEST***
app.put("/animals/:animalID", async (req, res) => {
    const {
        name,
        type,
        birthDate,
        breedComposition,
        fatherID,
        motherID,
        colorID,
        currentWeight,
    } = req.body;

    // Input validation
    if (
        !name ||
        !type ||
        !birthDate ||
        !breedComposition ||
        !fatherID ||
        !motherID ||
        !colorID ||
        !currentWeight
    ) {
        return res.status(400).send("All fields are required.");
    }

    try {
        await runQuery("updateAnimal", {
            name: name,
            type: type,
            birthDate: birthDate,
            breedComposition: breedComposition,
            fatherID: fatherID,
            motherID: motherID,
            colorID: colorID,
            currentWeight: currentWeight,
            animalID: req.params.animalID,
        });
        res.status(204).send("Animal updated");
    } catch (error) {
        console.error("Error updating animal:", error);
        res.status(500).send("Error updating animal");
    }
});

// Delete an animal ***NO POSTMAN TEST***
app.delete("/animals/:animalID", async (req, res) => {
    try {
        await runQuery("deleteAnimal", { animalID: req.params.animalID });
        res.status(204).send("Animal deleted");
    } catch (error) {
        console.error("Error deleting animal:", error);
        res.status(500).send("Error deleting animal");
    }
});
//#endregion

//#region NotebookEntries
// Create a notebook entry ***NO POSTMAN TEST***  also look at where animalID should be passed (req.params.animalID or in body? idk which is better)
app.post("/notebookEntries", async (req, res) => {
    const { animalID, content, userID, weight } = req.body;

    // Input validation
    if (!animalID || !content || !userID || !weight) {
        return res.status(400).send("All fields are required.");
    }

    try {
        await runQuery("createNotebookEntry", {
            animalID: animalID,
            content: content,
            userID: userID,
            weight: weight,
        });
        res.status(201).send("Notebook entry created");
    } catch (error) {
        console.error("Error creating notebook entry:", error);
        res.status(500).send("Error creating notebook entry");
    }
});

// Get notebook entries for an animal ***NO POSTMAN TEST***
app.get("/notebookEntries/:animalID", async (req, res) => {
    try {
        const notebookEntries = await allQuery(
            "getNotebookEntries",
            {animalID: req.params.animalID}
        );
        res.json(notebookEntries);
    } catch (error) {
        console.error("Error getting notebook entries:", error);
        res.status(500).send("Error getting notebook entries");
    }
});

// Update a notebook entry ***NO POSTMAN TEST***
app.put("/notebookEntries/:notebookEntryID", async (req, res) => {
    const { content, weight, userID } = req.body;

    // Input validation
    if (!content || !weight || !userID) {
        return res.status(400).send("All fields are required.");
    }

    try {
        await runQuery("updateNotebookEntry", {
            content: content,
            weight: weight,
            userID: userID,
            entryID: req.params.notebookEntryID,
        });
        res.status(204).send("Notebook entry updated");
    } catch (error) {
        console.error("Error updating notebook entry:", error);
        res.status(500).send("Error updating notebook entry");
    }
});

// Delete a notebook entry ***NO POSTMAN TEST***
app.delete("/notebookEntries/:notebookEntryID", async (req, res) => {
    try {
        await runQuery("deleteNotebookEntry", {
            entryID: req.params.notebookEntryID,
        });
        res.status(204).send("Notebook entry deleted");
    } catch (error) {
        console.error("Error deleting notebook entry:", error);
        res.status(500).send("Error deleting notebook entry");
    }
});
//#endregion

//#region Users
// Get user by username
app.get("/users/:username", async (req, res) => {
    try {
        const user = await getQuery("getUserByName", { username: req.params.username });

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
app.post("/users", async (req, res) => {
    const { username, password } = req.body;

    // Check if user is an admin (authenticateToken attaches username from the token to the request object)
    if (await getQuery("getUserByName", req.username).isAdmin == false) {
        return res.status(403).send("You do not have permission to create a user.");
    }

    // Input validation
    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    try {
        const hashedPassword = await hashPassword(password);
        await runQuery("createUser", {
            username: username,
            password: hashedPassword,
        });
        res.status(201).send("User created");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});

// Update a user password (for use by non-admin and admin users)
app.put("/users/password/:userID", async (req, res) => {
    const { password, currentPassword } = req.body;

    if(!password || !currentPassword) {
        return res.status(400).send("Old and current passwords required.");
    }

    const passwordMatch = await verifyPassword(currentPassword, await getQuery("getUserByID", { userID: req.params.userID }).password);
    if (!passwordMatch) {
        return res.status(401).send("Current password input is incorrect.");
    }

    try {
        const hashedPassword = await hashPassword(password);
        await runQuery("updateUserPassword", {
            userID: req.params.userID,
            password: hashedPassword,
        });
        res.status(204).send("Password updated");
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).send("Error updating password");
    }
});

// Update a users username (for use by admin only users)
app.put("/users/username/:userID", async (req, res) => {
    const { username, currentPassword } = req.body;

    if(!username || !currentPassword) 
        return res.status(400).send("New username and current password required.");

    const user = await getQuery("getUserByID", { userID: req.params.userID });
    if(!user.isAdmin) 
        return res.status(403).send("You do not have permission to update a username.");
    
    const passwordMatch = await verifyPassword(currentPassword, user.password);
    if (!passwordMatch) 
        return res.status(401).send("Current password input is incorrect.");

    try {
        await runQuery("updateUsername", {
            userID: req.params.userID,
            username: username,
        });
        res.status(204).send("Username updated");
    } catch {
        console.error("Error updating username:", error);
        res.status(500).send("Error updating username");
    }
});    
//#endregion

//#endregion

//#region Login

//login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    console.log("Login attempt");

    // Input validation
    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    try {
        const user = await getQuery("getUserByName", { username: username });
        if (!user) {
            return res.status(401).send("Invalid username or password");
        }
        const passwordMatch = await verifyPassword(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send("Invalid username or password");
        } else {
            delete user.password;
            const token = generateToken(user); // Generate token with the user payload
            console.log("User logged in");
            // Send the user in the response (the user object is the same as the one in the payload of the token)
            return res.status(200).json({ "token": token, "user": user });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in");
    }
});

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
