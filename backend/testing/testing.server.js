const request = require('supertest');
const app = require('./testing.server'); // Adjust the path as needed

describe('API Endpoints', () => {
    it('should respond with status 200 for GET /colors', async () => {
        const res = await request(app).get('/colors');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    });

    it('should create a new color on POST /colors', async () => {
        const res = await request(app)
            .post('/colors')
            .send({
                color: 'blue'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.text).toEqual("Color created");
    });

    it('should respond with status 204 for DELETE /colors/:colorID', async () => {
        const res = await request(app).delete('/colors/2');
        expect(res.statusCode).toEqual(204);
    
    });

    it('should update a color', async () => {
        // First, create a color to update
        const createRes = await request(app)
          .post('/colors')
          .send({
            color: 'green'
          });
        expect(createRes.statusCode).toEqual(201);
    
        const colorID = createRes.body.colorID; // Assuming the response contains the colorID
    
        // Now, update the color
        const updateRes = await request(app)
          .put(`/colors/${colorID}`)
          .send({
            color: 'red'
          });
        expect(updateRes.statusCode).toEqual(204);
    
        // Verify the update
        const getRes = await request(app).get(`/colors/${colorID}`);
        expect(getRes.statusCode).toEqual(200);
        expect(getRes.body.color).toEqual('red');
    });

    it('should get all breeds', async () => {
        const res = await request(app).get('/breeds');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
      });

    it('should create a breed', async () => {
    const res = await request(app)
        .post('/breeds')
        .send({
        breed: 'Holstein'
        });
    expect(res.statusCode).toEqual(201);
    expect(res.text).toEqual("Breed created");
    });

    it('should delete a breed', async () => {
        // First, create a breed to delete
        const createRes = await request(app)
            .post('/breeds')
            .send({
            breed: 'Jersey'
            });
        expect(createRes.statusCode).toEqual(201);
        
        const breedID = createRes.body.breedID; // Assuming the response contains the breedID
        
        // Now, delete the breed
        const deleteRes = await request(app).delete(`/breeds/${breedID}`);
        expect(deleteRes.statusCode).toEqual(204);
        });

    it('should update a breed', async () => {
        // First, create a breed to update
        const createRes = await request(app)
            .post('/breeds')
            .send({
            breed: 'Angus'
            });
        expect(createRes.statusCode).toEqual(201);
        
        const breedID = createRes.body.breedID; // Assuming the response contains the breedID
        
        // Now, update the breed
        const updateRes = await request(app)
            .put(`/breeds/${breedID}`)
            .send({
            breed: 'Hereford'
            });
        expect(updateRes.statusCode).toEqual(204);
        
        // Verify the update
        const getRes = await request(app).get(`/breeds/${breedID}`);
        expect(getRes.statusCode).toEqual(200);
        expect(getRes.body.breed).toEqual('Hereford');
        });

    it('should create an animal', async () => {
        const res = await request(app)
            .post('/animals')
            .send({
            name: 'Test Animal',
            type: 'Cow',
            birthDate: '2022-01-01',
            breedComposition: 'Holstein',
            fatherID: 1,
            motherID: 2,
            colorID: 3,
            currentWeight: 500,
            tagNumber: '12345',
            dateOfSale: '2023-01-01',
            pricePerPound: 2.5,
            totalPrice: 1250
            });
        expect(res.statusCode).toEqual(201);
        expect(res.text).toEqual("Animal created");
        });

    it('should get all animals', async () => {
        const res = await request(app).get('/animals');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        });

    it('should update an animal', async () => {
        // First, create an animal to update
        const createRes = await request(app)
            .post('/animals')
            .send({
            name: 'Test Animal',
            type: 'Cow',
            birthDate: '2022-01-01',
            breedComposition: 'Holstein',
            fatherID: 1,
            motherID: 2,
            colorID: 3,
            currentWeight: 500,
            tagNumber: '12345',
            dateOfSale: '2023-01-01',
            pricePerPound: 2.5,
            totalPrice: 1250
            });
        expect(createRes.statusCode).toEqual(201);
        
        const animalID = createRes.body.animalID; // Assuming the response contains the animalID
        
        // Now, update the animal
        const updateRes = await request(app)
            .put(`/animals/${animalID}`)
            .send({
            name: 'Updated Animal',
            type: 'Cow',
            birthDate: '2022-01-01',
            breedComposition: 'Holstein',
            fatherID: 1,
            motherID: 2,
            colorID: 3,
            currentWeight: 600,
            tagNumber: '12345',
            dateOfSale: '2023-01-01',
            pricePerPound: 2.5,
            totalPrice: 1500
            });
        expect(updateRes.statusCode).toEqual(204);
        
        // Verify the update
        const getRes = await request(app).get(`/animals/${animalID}`);
        expect(getRes.statusCode).toEqual(200);
        expect(getRes.body.name).toEqual('Updated Animal');
        expect(getRes.body.currentWeight).toEqual(600);
        });

    it('should delete an animal', async () => {
        // First, create an animal to delete
        const createRes = await request(app)
            .post('/animals')
            .send({
            name: 'Test Animal',
            type: 'Cow',
            birthDate: '2022-01-01',
            breedComposition: 'Holstein',
            fatherID: 1,
            motherID: 2,
            colorID: 3,
            currentWeight: 500,
            tagNumber: '12345',
            dateOfSale: '2023-01-01',
            pricePerPound: 2.5,
            totalPrice: 1250
            });
        expect(createRes.statusCode).toEqual(201);
        
        const animalID = createRes.body.animalID; // Assuming the response contains the animalID
        
        // Now, delete the animal
        const deleteRes = await request(app).delete(`/animals/${animalID}`);
        expect(deleteRes.statusCode).toEqual(204);
        
        // Verify the deletion
        const getRes = await request(app).get(`/animals/${animalID}`);
        expect(getRes.statusCode).toEqual(404);
        });

    it('should create a notebook entry', async () => {
        // First, create an animal to associate with the notebook entry
        const animalRes = await request(app)
            .post('/animals')
            .send({
            name: 'Test Animal',
            type: 'Cow',
            birthDate: '2022-01-01',
            breedComposition: 'Holstein',
            fatherID: 1,
            motherID: 2,
            colorID: 3,
            currentWeight: 500,
            tagNumber: '12345',
            dateOfSale: '2023-01-01',
            pricePerPound: 2.5,
            totalPrice: 1250
            });
        expect(animalRes.statusCode).toEqual(201);
        
        const animalID = animalRes.body.animalID; // Assuming the response contains the animalID
        
        const res = await request(app)
            .post('/notebookEntries')
            .send({
            animalID: animalID,
            content: 'Test Entry',
            userID: 1, // Adjust as necessary
            weight: 500
            });
        expect(res.statusCode).toEqual(201);
        expect(res.text).toEqual("Notebook entry created");
        });    



    it('should get notebook entries for an animal', async () => {
        // First, create an animal to associate with the notebook entry
        const animalRes = await request(app)
            .post('/animals')
            .send({
            name: 'Test Animal',
            type: 'Cow',
            birthDate: '2022-01-01',
            breedComposition: 'Holstein',
            fatherID: 1,
            motherID: 2,
            colorID: 3,
            currentWeight: 500,
            tagNumber: '12345',
            dateOfSale: '2023-01-01',
            pricePerPound: 2.5,
            totalPrice: 1250
            });
        expect(animalRes.statusCode).toEqual(201);
        
        const animalID = animalRes.body.animalID; // Assuming the response contains the animalID
        
        // Create a notebook entry
        await request(app)
            .post('/notebookEntries')
            .send({
            animalID: animalID,
            content: 'Test Entry',
            userID: 1, // Adjust as necessary
            weight: 500
            });
        
        const res = await request(app).get(`/notebookEntries/${animalID}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        });

    it('should update a notebook entry', async () => {
        // First, create an animal to associate with the notebook entry
        const animalRes = await request(app)
            .post('/animals')
            .send({
            name: 'Test Animal',
            type: 'Cow',
            birthDate: '2022-01-01',
            breedComposition: 'Holstein',
            fatherID: 1,
            motherID: 2,
            colorID: 3,
            currentWeight: 500,
            tagNumber: '12345',
            dateOfSale: '2023-01-01',
            pricePerPound: 2.5,
            totalPrice: 1250
            });
        expect(animalRes.statusCode).toEqual(201);
        
        const animalID = animalRes.body.animalID; // Assuming the response contains the animalID
        
        // Create a notebook entry
        const createRes = await request(app)
            .post('/notebookEntries')
            .send({
            animalID: animalID,
            content: 'Test Entry',
            userID: 1, // Adjust as necessary
            weight: 500
            });
        expect(createRes.statusCode).toEqual(201);
        
        const notebookEntryID = createRes.body.entryID; // Assuming the response contains the entryID
        
        // Now, update the notebook entry
        const updateRes = await request(app)
            .put(`/notebookEntries/${notebookEntryID}`)
            .send({
            content: 'Updated Entry',
            userID: 1, // Adjust as necessary
            weight: 600
            });
        expect(updateRes.statusCode).toEqual(204);
        
        // Verify the update
        const getRes = await request(app).get(`/notebookEntries/${animalID}`);
        expect(getRes.statusCode).toEqual(200);
        const updatedEntry = getRes.body.find(entry => entry.entryID === notebookEntryID);
        expect(updatedEntry.content).toEqual('Updated Entry');
        expect(updatedEntry.weight).toEqual(600);
        });

    it('should delete a notebook entry', async () => {
        // First, create an animal to associate with the notebook entry
        const animalRes = await request(app)
            .post('/animals')
            .send({
            name: 'Test Animal',
            type: 'Cow',
            birthDate: '2022-01-01',
            breedComposition: 'Holstein',
            fatherID: 1,
            motherID: 2,
            colorID: 3,
            currentWeight: 500,
            tagNumber: '12345',
            dateOfSale: '2023-01-01',
            pricePerPound: 2.5,
            totalPrice: 1250
            });
        expect(animalRes.statusCode).toEqual(201);
        
        const animalID = animalRes.body.animalID; // Assuming the response contains the animalID
        
        // Create a notebook entry
        const createRes = await request(app)
            .post('/notebookEntries')
            .send({
            animalID: animalID,
            content: 'Test Entry',
            userID: 1, // Adjust as necessary
            weight: 500
            });
        expect(createRes.statusCode).toEqual(201);
        
        const notebookEntryID = createRes.body.entryID; // Assuming the response contains the entryID
        
        // Now, delete the notebook entry
        const deleteRes = await request(app).delete(`/notebookEntries/${notebookEntryID}`);
        expect(deleteRes.statusCode).toEqual(204);
        
        // Verify the deletion
        const getRes = await request(app).get(`/notebookEntries/${animalID}`);
        expect(getRes.statusCode).toEqual(200);
        const deletedEntry = getRes.body.find(entry => entry.entryID === notebookEntryID);
        expect(deletedEntry).toBeUndefined();
        });

    it('should get all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        });

    it('should get a user by username', async () => {
    // First, create a user to retrieve
      const createRes = await request(app)
        .post('/users')
        .send({
          username: 'testuser',
          password: 'password123',
          isAdmin: true
        });
      expect(createRes.statusCode).toEqual(201);
    
      const res = await request(app).get('/users/testuser');
      expect(res.statusCode).toEqual(200);
      expect(res.body.username).toEqual('testuser');
    });

    it('should create a user', async () => {
      const res = await request(app)
        .post('/users')
        .send({
          username: 'newuser',
          password: 'password123',
          isAdmin: false
        });
      expect(res.statusCode).toEqual(201);
      expect(res.text).toEqual("User created");
    });

    it('should update a user password', async () => {
      // First, create a user to update
      const createRes = await request(app)
        .post('/users')
        .send({
          username: 'passworduser',
          password: 'oldpassword',
          isAdmin: false
        });
      expect(createRes.statusCode).toEqual(201);
    
      const userID = createRes.body.userID; // Assuming the response contains the userID
    
      // Now, update the user password
      const updateRes = await request(app)
        .put(`/users/password/${userID}`)
        .send({
          password: 'newpassword',
          currentPassword: 'oldpassword'
        });
      expect(updateRes.statusCode).toEqual(204);
    });

    it('should update a user username', async () => {
      // First, create a user to update
      const createRes = await request(app)
        .post('/users')
        .send({
          username: 'oldusername',
          password: 'password123',
          isAdmin: true
        });
      expect(createRes.statusCode).toEqual(201);
    
      const userID = createRes.body.userID; // Assuming the response contains the userID
    
      // Now, update the user username
      const updateRes = await request(app)
        .put(`/users/username/${userID}`)
        .send({
          username: 'newusername',
          currentPassword: 'password123'
        });
      expect(updateRes.statusCode).toEqual(204);
    });

    it('should update a user', async () => {
      // First, create a user to update
      const createRes = await request(app)
        .post('/users')
        .send({
          username: 'updateuser',
          password: 'password123',
          isAdmin: false
        });
      expect(createRes.statusCode).toEqual(201);
    
      const userID = createRes.body.userID; // Assuming the response contains the userID
    
      // Now, update the user
      const updateRes = await request(app)
        .put(`/users/${userID}`)
        .send({
          username: 'updateduser',
          password: 'newpassword123',
          isAdmin: true
        });
      expect(updateRes.statusCode).toEqual(204);
    });


    it('should delete a user', async () => {
      // First, create a user to delete
      const createRes = await request(app)
        .post('/users')
        .send({
          username: 'deleteuser',
          password: 'password123',
          isAdmin: false
        });
      expect(createRes.statusCode).toEqual(201);
    
      const userID = createRes.body.userID; // Assuming the response contains the userID
    
      // Now, delete the user
      const deleteRes = await request(app).delete(`/users/${userID}`);
      expect(deleteRes.statusCode).toEqual(204);
    });
    // Add more tests as needed
});