import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FinalProjectAPI } from '../../apis/FinalProjectAPI';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Text, Title, Container, Card, Group } from '@mantine/core';

const AnimalDetailsPage = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [notebookEntries, setNotebookEntries] = useState([]);
  const [fetchError, setFetchError] = useState(null);

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

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  if (!animal) {
    return <div>Loading...</div>;
  }

  return (
    <Container>

      <Title order={2} mt="lg">Notebook Entries</Title>
      {notebookEntries.length > 0 ? (
        <Carousel
          slideSize="70%"
          slideGap="md"
          align="start"
          slidesToScroll={1}
          loop
        >
          {notebookEntries.map((entry) => (
            <Carousel.Slide key={entry.id}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group position="apart" style={{ marginBottom: 5 }}>
                  <Text weight={500}>{entry.title}</Text>
                  <Text size="md" color="dimmed">{entry.date}</Text>
                </Group>
                <Text>{entry.content}</Text>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        <Text>No notebook entries found.</Text>
      )}
    </Container>
  );
};

export default AnimalDetailsPage;
