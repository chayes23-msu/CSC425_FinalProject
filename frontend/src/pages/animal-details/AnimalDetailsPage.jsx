import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FinalProjectAPI } from '../../apis/FinalProjectAPI';
import { Carousel } from '@mantine/carousel';
import IconCow from '../../assets/icon-components/IconCow';
import { Text, Title, Container, Card, Group, Button, Modal, TextInput, Paper, ThemeIcon } from '@mantine/core';
import '@mantine/carousel/styles.css';
import classes from './animal-details.module.css';
import { useAuth } from '../../authentication/AuthProvider';

const AnimalDetailsPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [animal, setAnimal] = useState(null);
  const [notebookEntries, setNotebookEntries] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [entryContent, setEntryContent] = useState('');
  const [entryWeight, setEntryWeight] = useState('');


  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        const data = await FinalProjectAPI.getAnimalByID(id);
        console.log("Fetched animal details:", data);
        setAnimal(data);
      } catch (err) {
        const errorMessage = err.response?.data || err.message || "An unexpected error occurred.";
        console.error("Error fetching animal details:", errorMessage);
        setFetchError(errorMessage);
      }
    };

    const fetchNotebookEntries = async () => {
      try {
        const data = await FinalProjectAPI.getNotebookEntries(id);
        console.log("Fetched notebook entries:", data);
        setNotebookEntries(data);
      } catch (err) {
        const errorMessage = err.response?.data || err.message || "An unexpected error occurred.";
        console.error("Error fetching notebook entries:", errorMessage);
        setFetchError(errorMessage);
      }
    };

    fetchAnimalDetails();
    fetchNotebookEntries();
  }, [id]);




  const handleEditClick = (entry) => {
    setCurrentEntry(entry);
    setEntryContent(entry.content);
    setEntryWeight(entry.weight || '');
    setModalOpened(true);
  };
  
  const handleSave = async () => {
    try {
      const updatedEntry = {
        content: entryContent,
        weight: entryWeight,
        modifiedAt: new Date().toISOString(), // Autofill modifiedAt
        userID: currentUser.userID, // Assuming you have the current user's ID
      };
      await FinalProjectAPI.updateNotebookEntry(currentEntry.entryID, updatedEntry);
      setNotebookEntries((entries) =>
        entries.map((entry) =>
          entry.entryID === currentEntry.entryID ? { ...entry, ...updatedEntry } : entry
        )
      );
      setModalOpened(false);
    } catch (err) {
      console.error("Error updating notebook entry:", err);
    }
  };
  const handleCreateClick = () => {
    setCurrentEntry(null);
    setEntryContent('');
    setEntryWeight('');
    setModalOpened(true);
  };
  
  const handleCreate = async () => {
    try {
      const newEntry = {
        animalID: id, // Assuming the animal ID is available
        content: entryContent,
        weight: entryWeight,
        createdAt: new Date().toISOString(), // Autofill createdAt
        modifiedAt: new Date().toISOString(), // Autofill modifiedAt
        userID: currentUser.userID, // Assuming you have the current user's ID
      };
      if (currentEntry) {
        await FinalProjectAPI.updateNotebookEntry(currentEntry.entryID, newEntry);
        setNotebookEntries((entries) =>
          entries.map((entry) =>
            entry.entryID === currentEntry.entryID ? { ...entry, ...newEntry } : entry
          )
        );
      } else {
        const createdEntry = await FinalProjectAPI.createNotebookEntry(newEntry);
        setNotebookEntries((entries) => [...entries, createdEntry]);
      }
      setModalOpened(false);
    } catch (err) {
      console.error("Error saving notebook entry:", err);
    }
  };

  const [animalModalOpened, setAnimalModalOpened] = useState(false);
  const [animalDetails, setAnimalDetails] = useState({
    name: '',
    type: '',
    birthDate: '',
    breedComposition: '',
    fatherID: '',
    motherID: '',
    colorID: '',
    currentWeight: '',
    dateOfSale: '',
    pricePerPound: '',
    totalPrice: ''
  });

  useEffect(() => {
    if (animal) {
      setAnimalDetails({
        name: animal.name,
        type: animal.type,
        birthDate: animal.birthDate,
        breedComposition: animal.breedComposition,
        fatherID: animal.fatherID,
        motherID: animal.motherID,
        colorID: animal.colorID,
        currentWeight: animal.currentWeight,
        dateOfSale: animal.dateOfSale,
        pricePerPound: animal.pricePerPound,
        totalPrice: animal.totalPrice
      });
    }
  }, [animal]);

  const handleAnimalSave = async () => {
    try {
      const updatedAnimalDetails = {
        animalID: animal.animalID,
        tagNumber: animal.tagNumber, // Required field
        createdAt: animal.createdAt, // Original creation time
        modifiedAt: new Date().toISOString(), // Current modification time
        // Optional fields with fallbacks
        colorID: animalDetails.colorID || null,
        motherID: animalDetails.motherID || null,
        fatherID: animalDetails.fatherID || null,
        birthDate: animalDetails.birthDate || null,
        name: animalDetails.name || 'Unknown',
        type: animalDetails.type || 'Unknown',
        currentWeight: parseFloat(animalDetails.currentWeight) || 0, // Ensure it's a number
        breedComposition: animalDetails.breedComposition || null,
        dateOfSale: animalDetails.dateOfSale || null,
        pricePerPound: parseFloat(animalDetails.pricePerPound) || 0, // Ensure it's a number
        totalPrice: parseFloat(animalDetails.totalPrice) || 0, // Ensure it's a number
      };
  
      // Log details for debugging
      console.log("Updated Animal Details:", updatedAnimalDetails);
  
      // Call API
      await FinalProjectAPI.updateAnimal(animal.animalID, updatedAnimalDetails);
  
      // Update local state
      setAnimal(updatedAnimalDetails);
      setAnimalModalOpened(false);
    } catch (err) {
      console.error("Error updating animal details:", err.message || err);
      // Optional: display a user-friendly error
    }
  };
  
  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  if (!animal) {
    return <div>Loading...</div>;
  }

  return (
    <Container className={classes.cowPattern}>
    <Card shadow="sm" padding="xl" radius="md" withBorder className={classes.animalCard}>
    <Group position="apart" style={{ marginBottom: 20 }}>
    <Title order={1} className={classes.cowTitle}>Details for {animal.name}</Title>
    <ThemeIcon
      size="xl"
      radius="md"
      variant="gradient"
      gradient={{ deg: 0, from: 'white', to: 'black' }}
      className={classes.cowIcon}
    >
      <IconCow size={28} stroke={1.5} />
    </ThemeIcon>
    </Group>
    <Button mt="sm" onClick={() => handleCreateClick()}>Add Notebook Entry</Button>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Add Notebook Entry"
      >
        <TextInput
          label="Content"
          value={entryContent}
          onChange={(event) => setEntryContent(event.currentTarget.value)}
          mb="sm"
        />
        <TextInput
          label="Weight"
          value={entryWeight}
          onChange={(event) => setEntryWeight(event.currentTarget.value)}
          mb="sm"
        />
        <Button onClick={handleCreate}>Save</Button>
      </Modal>
    <Text className={classes.cowText}>Type: {animal.type}</Text>
    <Text className={classes.cowText}>Birth Date: {animal.birthDate}</Text>
    <Text className={classes.cowText}>Breed Composition: {animal.breedComposition}</Text>
    <Text className={classes.cowText}>Father ID: {animal.fatherID}</Text>
    <Text className={classes.cowText}>Mother ID: {animal.motherID}</Text>
    <Text className={classes.cowText}>Color ID: {animal.colorID}</Text>
    <Text className={classes.cowText}>Current Weight: {animal.currentWeight}</Text>
    <Text className={classes.cowText}>Date of Sale: {animal.dateOfSale}</Text>
    <Text className={classes.cowText}>Price Per Pound: {animal.pricePerPound}</Text>
    <Text className={classes.cowText}>Total Price: {animal.totalPrice}</Text>
    <Button mt="md" onClick={() => setAnimalModalOpened(true)}>Edit Animal</Button>
  </Card>
    {notebookEntries.length > 0 ? (
      <Carousel
        slideSize="90%"
        slideGap="md"
        align="start"
        slidesToScroll={1}
        withIndicators
        loop
      >
        {notebookEntries.map((entry) => (
          <Carousel.Slide key={entry.entryID}>
            <Paper withBorder radius="md" className={classes.card} style={{ height: '300px' }}>
              <ThemeIcon
                size="xl"
                radius="md"
                variant="gradient"
                gradient={{ deg: 0, from: 'white', to: 'black' }}
                className={classes.cowIcon}
              >
                <IconCow size={28} stroke={1.5} />
              </ThemeIcon>
              <Text size="xl" fw={500} mt="md" className={classes.cowTitle}>
                Entry from {entry.createdAt}
              </Text>
              <Text size="sm" mt="sm" c="dimmed" className={classes.cowText}>
                Modified at: {entry.modifiedAt}
              </Text>
              <Text size="md" mt="sm" className={classes.cowText}>
                {entry.content}
              </Text>
              <Button mt="md" onClick={() => handleEditClick(entry)}>
                Edit
              </Button>
            </Paper>
          </Carousel.Slide>
        ))}
      </Carousel>
    ) : (
      <Text className={classes.cowText}>No notebook entries found.</Text>
    )}

    {/* Modal for editing notebook entries */}
    <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Edit Notebook Entry"
      >
        <TextInput
          label="Content"
          value={entryContent}
          onChange={(event) => setEntryContent(event.currentTarget.value)}
          mb="sm"
        />
        <TextInput
          label="Weight"
          value={entryWeight}
          onChange={(event) => setEntryWeight(event.currentTarget.value)}
          mb="sm"
        />
        <Button onClick={handleSave}>Save</Button>
      </Modal>

      <Modal
        opened={animalModalOpened}
        onClose={() => setAnimalModalOpened(false)}
        title="Edit Animal Details"
      >
        <TextInput
          label="Name"
          value={animalDetails.name || ''}
          onChange={(event) => setAnimalDetails({ ...animalDetails, name: event.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          label="Type"
          value={animalDetails.type || ''}
          onChange={(event) => setAnimalDetails({ ...animalDetails, type: event.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          label="Birth Date"
          value={animalDetails.birthDate || ''}
          onChange={(event) => setAnimalDetails({ ...animalDetails, birthDate: event.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          label="Breed Composition"
          value={animalDetails.breedComposition || ''}
          onChange={(event) => setAnimalDetails({ ...animalDetails, breedComposition: event.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          label="Father ID"
          value={animalDetails.fatherID || ''}
          onChange={(event) => setAnimalDetails({ ...animalDetails, fatherID: event.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          label="Mother ID"
          value={animalDetails.motherID || ''}
          onChange={(event) => setAnimalDetails({ ...animalDetails, motherID: event.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          label="Color ID"
          value={animalDetails.colorID || ''}
          onChange={(event) => setAnimalDetails({ ...animalDetails, colorID: event.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          label="Current Weight"
          value={animalDetails.currentWeight || ''}
          onChange={(event) => setAnimalDetails({ ...animalDetails, currentWeight: event.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          label="Date of Sale"
          value={animalDetails.dateOfSale || ''}
          onChange={(event) => setAnimalDetails({ ...animalDetails, dateOfSale: event.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          label="Price Per Pound"
          value={animalDetails.pricePerPound || ''}
          onChange={(event) => setAnimalDetails({ ...animalDetails, pricePerPound: event.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          label="Total Price"
          value={animalDetails.totalPrice || ''}
          onChange={(event) => setAnimalDetails({ ...animalDetails, totalPrice: event.currentTarget.value })}
          mb="sm"
        />
        <Button onClick={handleAnimalSave}>Save</Button>
      </Modal>
  </Container>


  );
};

export default AnimalDetailsPage;