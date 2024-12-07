import { Button, Flex, Table, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { showErrorNotification } from "../../notifications/notificationFunctions";
import { FinalProjectAPI as api } from "../../apis/FinalProjectAPI";
import IconEdit from "../../assets/icon-components/IconEdit";
import IconBackspace from "../../assets/icon-components/IconBackspace";

export default function AnimalFields() {
    const [breeds, setBreeds] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        // Get all breeds and colors
        async function getBreeds() {
            try {
                const breeds = await api.getBreeds();
                console.log(breeds);
                setBreeds(breeds);
            } catch (error) {
                showErrorNotification(error);   
            }
        }
        async function getColors() {
            try {
                const colors = await api.getColors();
                setColors(colors);
            } catch (error) {
                showErrorNotification(error);
            }
        }
        getBreeds();
        getColors();
    }, []);

    return (
        <Flex maw="65%" mx="auto" direction="column" justify="center">
            <Title order={1} align='center'>Edit Available Cow Attributes</Title>
            <Title order={2} align='center' mt="xl">Breeds</Title>
            <Button fz="lg" mt="xs">Create Breed</Button>
            <Table highlightOnHover stickyHeader mt='xs' ta="center">
                <Table.Thead>
                    <Table.Tr fz='h4'>
                        <Table.Th ta="center">Breedname</Table.Th>
                        <Table.Th ta="center">Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {breeds.map(breed => (
                        <Table.Tr key={breed.breedID} fz='lg'>
                            <Table.Td>{breed.breed}</Table.Td>
                            <Table.Td>
                            <Button
                                    variant="subtle"
                                    
                                >
                                    <IconEdit />
                                </Button>
                                <Button variant="subtle" color="red">
                                    <IconBackspace />
                                </Button>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            <Title order={2} align='center' mt="xl">Colors</Title>
            <Button fz="lg" mt="xs">Create Color</Button>
            <Table highlightOnHover stickyHeader mt='xs' ta="center">
                <Table.Thead>
                    <Table.Tr fz='h4'>
                        <Table.Th ta="center">Color</Table.Th>
                        <Table.Th ta="center">Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {colors.map(color => (
                        <Table.Tr key={color.colorID} fz='lg'>
                            <Table.Td>{color.color}</Table.Td>
                            <Table.Td>
                            <Button
                                    variant="subtle"
                                    
                                >
                                    <IconEdit />
                                </Button>
                                <Button variant="subtle" color="red">
                                    <IconBackspace />
                                </Button>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Flex>
    );
}