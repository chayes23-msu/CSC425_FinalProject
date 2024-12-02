import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FinalProjectAPI } from '../../apis/FinalProjectAPI';

function AnimalDetailsPage() {
  const { id } = useParams(); // Extract the ID from the URL
  const [animal, setAnimal] = useState(null);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        const data = await FinalProjectAPI.getAnimalByID(id); // Fetch details using the ID
        setAnimal(data);
      } catch (err) {
        const errorMessage = err.response?.data || err.message || "An unexpected error occurred.";
        console.error("Error fetching animal details:", errorMessage);
        setFetchError(errorMessage);
      }
    };

    fetchAnimalDetails();
  }, [id]);

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  if (!animal) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Details for {animal.name}</h1>
      <p>Type: {animal.type}</p>
      <p>Birth Date: {animal.birthDate}</p>
      <p>Breed Composition: {animal.breedComposition}</p>
      <p>Father ID: {animal.fatherID}</p>
      <p>Mother ID: {animal.motherID}</p>
      <p>Color ID: {animal.colorID}</p>
      <p>Current Weight: {animal.currentWeight}</p>
    </div>
  );
}

export default AnimalDetailsPage;
