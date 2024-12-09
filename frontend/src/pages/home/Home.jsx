import {
  Center,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Alert,
  Button,
  Drawer,
  CloseButton,
  Select
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import '@mantine/dates/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FinalProjectAPI } from '../../apis/FinalProjectAPI';
import classes from './Home.module.css';
import IconChevronDown from '../../assets/icon-components/IconChevronDown';
import IconChevronUp from '../../assets/icon-components/IconChevronUp';
import IconSearch from '../../assets/icon-components/IconSearch';
import IconSelector from '../../assets/icon-components/IconSelector';
import IconAlertCircle from '../../assets/icon-components/IconAlertCircle';
import IconCow from '../../assets/icon-components/IconCow';
import { showErrorNotification, showSuccessNotification } from '../../notifications/notificationFunctions.jsx';

function Th({ children, reversed, sorted, onSort }) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => item.name.toLowerCase().includes(query));
}

function sortData(data, { sortBy, reversed, search }) {
  if (!sortBy) {
    return filterData(data, search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
        return reversed ? b[sortBy].localeCompare(a[sortBy]) : a[sortBy].localeCompare(b[sortBy]);
      } else {
        return reversed ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy];
      }
    }),
    search
  );
}

function TableSort() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [colors, setColors] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();
  const [drawerOpened, { open, close }] = useDisclosure(false);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    type: '',
    birthDate: '',
    breedComposition: '',
    fatherID: '',
    motherID: '',
    tagNumber: '',
    colorID: '',
    currentWeight: '',
    dateOfSale: '',
    pricePerPound: '',
    totalPrice: '',
  });

  const fetchAnimals = async () => {
    try {
      const response = await FinalProjectAPI.getAnimals();
      setSortedData(response);
      setFetchError(""); // Clear any previous errors
    } catch (err) {
      const errorMessage = err.response?.data || err.message || "An unexpected error occurred.";
      console.error("Error fetching animals:", errorMessage);
      setFetchError(errorMessage);
    }
  };

  const fetchColors = async () => {
    try {
      const response = await FinalProjectAPI.getColors();
      setColors(response);
    } catch (err) {
      console.error("Error fetching colors:", err);
    }
  };

  useEffect(() => {
    fetchAnimals();
    fetchBreeds();
    fetchColors();
  }, []);

  useEffect(() => {
    setSortedData(sortData(sortedData, { sortBy, reversed: reverseSortDirection, search }));
  }, [search, sortBy, reverseSortDirection]);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(sortedData, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
    if (value.trim() === '') {
      fetchAnimals(); // Refetch the data when the search bar is cleared
    } else {
      setSortedData(sortData(sortedData, { sortBy, reversed: reverseSortDirection, search: value }));
    }
  };
  

  const handleDelete = async (animalID) => {
    if (window.confirm("Are you sure you want to delete this animal?")) {
      try {
        await FinalProjectAPI.deleteAnimal(animalID);
        // Refetch the animals to update the table
        fetchAnimals();
        showSuccessNotification("Animal deleted successfully");
      } catch (err) {
        showErrorNotification(err);
        const errorMessage = err.response?.data || err.message || "An unexpected error occurred.";
        console.error("Error deleting animal:", errorMessage);
        setFetchError(errorMessage);
      }
    }
  };

  const fetchBreeds = async () => {
    try {
      const response = await FinalProjectAPI.getBreeds();
      console.log("Fetched breeds:", response);
      setBreeds(response);
    } catch (err) {
      console.error("Error fetching breeds:", err);
    }
  };

  const handleBreedChange = (event) => {
    const { value } = event.currentTarget;
    setNewAnimal({ ...newAnimal, breedComposition: value });
  };
  
  const handleNewBreedChange = (event) => {
    const { value } = event.currentTarget;
    setNewAnimal({ ...newAnimal, breedComposition: value });
  };
  
  const handleAddNewBreed = async () => {
    try {
      await FinalProjectAPI.createBreed({ name: newAnimal.breedComposition });
      fetchBreeds(); // Refresh the breed list
    } catch (err) {
      console.error("Error creating breed:", err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setNewAnimal({ ...newAnimal, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewAnimal({ ...newAnimal, birthDate: date });
  };

  const handleSaleDateChange = (date) => {
    setNewAnimal({ ...newAnimal, dateOfSale: date });
  };

  const handleSave = async () => {
    try {
      const formattedAnimal = {
        ...newAnimal,
        birthDate: newAnimal.birthDate ? newAnimal.birthDate.toISOString().split('T')[0] : '', // Format the birthDate to YYYY-MM-DD
        dateOfSale: newAnimal.dateOfSale ? newAnimal.dateOfSale.toISOString().split('T')[0] : '', // Format the dateOfSale to YYYY-MM-DD
      };
      await FinalProjectAPI.createAnimal(formattedAnimal);
      close();
      // Refetch the animals to update the table
      fetchAnimals();
      showSuccessNotification("Animal created successfully");
    } catch (err) {
      showErrorNotification(err);
      const errorMessage = err.response?.data || err.message || "An unexpected error occurred.";
      console.error("Error creating animal:", errorMessage);
      setFetchError(errorMessage);
    }
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.animalID} className={classes.tableRow}>
      <Table.Td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        <Button variant='subtle' c='white' onClick={() => navigate(`/animal/${row.animalID}`)} >
          <IconCow style={{ width: '24px', height: '24px', display: 'block' }} />
        </Button>
      </Table.Td>
      <Table.Td>{row.tagNumber}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.currentWeight}</Table.Td>
      <Table.Td>{row.dateOfSale}</Table.Td>
      <Table.Td>
        <CloseButton className={classes.closeButton} onClick={() => handleDelete(row.animalID)} />
      </Table.Td>
    </Table.Tr>
  ));
  
  
  return (
    <ScrollArea>
      {fetchError && (
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="md">
          {fetchError}
        </Alert>
      )}
      <Button onClick={open} mb="md">Add New Animal</Button>
      <Drawer
        opened={drawerOpened}
        onClose={close}
        title="Add New Animal"
        padding="md"
        size="md"
        position='right'
      >
        <TextInput
          label="Name"
          name="name"
          value={newAnimal.name}
          onChange={handleInputChange}
          mb="sm"
        />
        <TextInput
          label="Type"
          name="type"
          value={newAnimal.type}
          onChange={handleInputChange}
          mb="sm"
        />
        <DatePickerInput
          label="Birth Date"
          name="birthDate"
          value={newAnimal.birthDate}
          onChange={handleDateChange}
          size="sm" // Adjust size to fit better in the drawer
          mb="sm"
          dropdownType='modal'
          valueFormat='YYYY-MM-DD'
              />
          <Select
            label="Breed Composition"
            name="breedComposition"
            value={newAnimal.breedComposition}
            onChange={(value) => setNewAnimal({ ...newAnimal, breedComposition: value })}
            data={breeds.map((breed) => ({ value: breed.breed, label: breed.breed }))}
            mb="sm"
            searchable
          />
        <TextInput
          label="Father ID"
          name="fatherID"
          value={newAnimal.fatherID}
          onChange={handleInputChange}
          mb="sm"
        />
        <TextInput
          label="Mother ID"
          name="motherID"
          value={newAnimal.motherID}
          onChange={handleInputChange}
          mb="sm"
        />
        <TextInput
          label="Tag Number"
          name="tagNumber"
          value={newAnimal.tagNumber}
          onChange={handleInputChange}
          mb="sm"
        />
        <Select
          label="Color"
          name="color"
          value={newAnimal.colorID}
          onChange={(value) => setNewAnimal({ ...newAnimal, colorID: value })}
          data={colors.map((color) => ({ value: String(color.colorID), label: color.color }))}
          mb="sm"
          searchable
        />
        <TextInput
          label="Current Weight"
          name="currentWeight"
          value={newAnimal.currentWeight}
          onChange={handleInputChange}
          mb="sm"
        />
        <DatePickerInput
          label="Date of Sale"
          name="dateOfSale"
          value={newAnimal.dateOfSale}
          onChange={handleSaleDateChange}
          size="sm" // Adjust size to fit better in the drawer
          mb="sm"
          dropdownType='modal'
          valueFormat='YYYY-MM-DD'
        />
        <TextInput
          label="Price Per Pound"
          name="pricePerPound"
          value={newAnimal.pricePerPound}
          onChange={handleInputChange}
          mb="sm"
        />
        <TextInput
          label="Total Price"
          name="totalPrice"
          value={newAnimal.totalPrice}
          onChange={handleInputChange}
          mb="sm"
        />
        <Button onClick={handleSave}>Save</Button>
      </Drawer>
      <TextInput
        placeholder="Search by name"
        mb="md"
        leftSection={<IconSearch size={16} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
        className={classes.searchBar} // Apply custom styles
      />
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th ta='center'>View Details</Table.Th> {/* Empty header cell for the cow icon */}
            <Th
              sorted={sortBy === 'tagNumber'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('tagNumber')}
            >
              Tag Number
            </Th>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'currentWeight'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('currentWeight')}
            >
              Current Weight
            </Th>
            <Th
              sorted={sortBy === 'dateOfSale'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('dateOfSale')}
            >
              Date of Sale
            </Th>
            <Table.Th></Table.Th> {/* Empty header cell for the delete button */}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={10}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <TableSort />
    </div>
  );
}