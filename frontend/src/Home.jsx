import {
    Center,
    Group,
    ScrollArea,
    Table,
    Text,
    TextInput,
    UnstyledButton,
    Alert,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector, IconAlertCircle } from '@tabler/icons-react';
import { useState, useEffect } from "react";
import { useAuth } from './AuthProvider';
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
    Object.keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(data, { sortBy, reversed, search }) {
  if (!sortBy) {
    return filterData(data, search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }
      return a[sortBy].localeCompare(b[sortBy]);
    }),
    search
  );
}

function TableSort() {
  const auth = useAuth();
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [fetchError, setFetchError] = useState("");

  async function fetchAnimals() {
    try {
      const response = await auth.getAnimals();
      console.log(response);
      setSortedData(response);
      setFetchError(""); // Clear any previous errors
    } catch (err) {
      const errorMessage = err.response?.data || err.message || "An unexpected error occurred.";
      console.error("Error fetching animals:", errorMessage);
      setFetchError(errorMessage);
    }
  }

  useEffect(() => {
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

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.animalID}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.type}</Table.Td>
      <Table.Td>{row.birthDate}</Table.Td>
      <Table.Td>{row.breedComposition}</Table.Td>
      <Table.Td>{row.fatherID}</Table.Td>
      <Table.Td>{row.motherID}</Table.Td>
      <Table.Td>{row.colorID}</Table.Td>
      <Table.Td>{row.currentWeight}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      {fetchError && (
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="md">
          {fetchError}
        </Alert>
      )}
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
              <Table.Td colSpan={8}>
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