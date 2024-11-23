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
    CloseButton
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector, IconAlertCircle } from '@tabler/icons-react';
import { useState, useEffect } from "react";
import { useDisclosure } from '@mantine/hooks';
import { FinalProjectAPI } from './apis/FinalProjectAPI';
import classes from './Home.module.css';

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
  return data.filter((item) =>
    Object.keys(data[0]).some((key) => item[key].toString().toLowerCase().includes(query))
  );
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
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [drawerOpened, { open, close }] = useDisclosure(false);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    type: '',
    birthDate: '',
    breedComposition: '',
    fatherID: '',
    motherID: '',
    colorID: '',
    currentWeight: '',
  });

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const response = await FinalProjectAPI.getAnimals();
        setSortedData(response);
        setFetchError(""); // Clear any previous errors
      } catch (err) {
        const errorMessage = err.response?.data || err.message || "An unexpected error occurred.";
        console.error("Error fetching animals:", errorMessage);
        setFetchError(errorMessage);
      }
    }

    fetchAnimals();
  }, []);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(sortedData, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
    setSortedData(sortData(sortedData, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setNewAnimal({ ...newAnimal, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewAnimal({ ...newAnimal, birthDate: date });
  };

  const handleSave = async () => {
    try {
        await FinalProjectAPI.createAnimal(newAnimal);
        close();
        // Optionally, you can refetch the animals to update the table
        fetchAnimals();
    } catch (err) {
        const errorMessage = err.response?.data || err.message || "An unexpected error occurred.";
        console.error("Error creating animal:", errorMessage);
        setFetchError(errorMessage);
    }
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.animalID} className={classes.tableRow}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.type}</Table.Td>
      <Table.Td>{row.birthDate}</Table.Td>
      <Table.Td>{row.breedComposition}</Table.Td>
      <Table.Td>{row.fatherID}</Table.Td>
      <Table.Td>{row.motherID}</Table.Td>
      <Table.Td>{row.colorID}</Table.Td>
      <Table.Td>{row.currentWeight}</Table.Td>
      <Table.Td>
        <CloseButton className={classes.closeButton} />
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
        <DateInput
          label="Birth Date"
          name="birthDate"
          value={newAnimal.birthDate}
          onChange={handleDateChange}
          size="sm" // Adjust size to fit better in the drawer
          inputFormat="MM/DD/YYYY" // Adjust date format if needed
          mb="sm"
        />
        <TextInput
          label="Breed Composition"
          name="breedComposition"
          value={newAnimal.breedComposition}
          onChange={handleInputChange}
          mb="sm"
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
          label="Color ID"
          name="colorID"
          value={newAnimal.colorID}
          onChange={handleInputChange}
          mb="sm"
        />
        <TextInput
          label="Current Weight"
          name="currentWeight"
          value={newAnimal.currentWeight}
          onChange={handleInputChange}
          mb="sm"
        />
        <Button onClick={handleSave}>Save</Button>
      </Drawer>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch size={16} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'type'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('type')}
            >
              Type
            </Th>
            <Th
              sorted={sortBy === 'birthDate'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('birthDate')}
            >
              Birth Date
            </Th>
            <Th
              sorted={sortBy === 'breedComposition'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('breedComposition')}
            >
              Breed Composition
            </Th>
            <Th
              sorted={sortBy === 'fatherID'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('fatherID')}
            >
              Father ID
            </Th>
            <Th
              sorted={sortBy === 'motherID'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('motherID')}
            >
              Mother ID
            </Th>
            <Th
              sorted={sortBy === 'colorID'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('colorID')}
            >
              Color ID
            </Th>
            <Th
              sorted={sortBy === 'currentWeight'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('currentWeight')}
            >
              Current Weight
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={9}>
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
      <h1>Home Page</h1>
      <TableSort />
    </div>
  );
}