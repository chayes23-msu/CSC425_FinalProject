import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FinalProjectAPI } from '../../apis/FinalProjectAPI';
import { Carousel } from '@mantine/carousel';
import IconCow from '../../assets/icon-components/IconCow';
import { Text, Title, Container, Card, Group, Button, Modal, TextInput, Paper, ThemeIcon } from '@mantine/core';
import '@mantine/carousel/styles.css';
import classes from './animal-details.module.css';

const AnimalDetailsPage = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [notebookEntries, setNotebookEntries] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [entryContent, setEntryContent] = useState('');

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        const data = await FinalProjectAPI.getAnimalByID(id);
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
    setModalOpened(true);
  };

  const handleSave = async () => {
    try {
      await FinalProjectAPI.updateNotebookEntry(currentEntry.id, { content: entryContent });
      setNotebookEntries((entries) =>
        entries.map((entry) =>
          entry.id === currentEntry.id ? { ...entry, content: entryContent } : entry
        )
      );
      setModalOpened(false);
    } catch (err) {
      console.error("Error updating notebook entry:", err);
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
  </Card>
    <Title order={2} mt="lg" className={classes.cowTitle}>
      Notebook Entries
    </Title>
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
                {entry.createdAt}
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
      <Button onClick={handleSave}>Save</Button>
    </Modal>
  </Container>


  );
};

export default AnimalDetailsPage;