import { Button, Flex, LoadingOverlay, Modal, Table, TextInput, Title, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { showErrorNotification, showSuccessNotification } from "../../notifications/notificationFunctions";
import { FinalProjectAPI as api } from "../../apis/FinalProjectAPI";
import IconEdit from "../../assets/icon-components/IconEdit";
import IconBackspace from "../../assets/icon-components/IconBackspace";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";

export default function AnimalFields() {
    const [breeds, setBreeds] = useState([]);
    const [colors, setColors] = useState([]);
    const [createBreedModalOpened, setCreateBreedModalOpened] = useDisclosure(false);
    const [breedToEdit, setBreedToEdit] = useState(null);
    const [createColorModalOpened, setCreateColorModalOpened] = useDisclosure(false);
    const [loading, setLoading] = useDisclosure(false);

    useEffect(() => {
        // Get all breeds and colors
        async function getBreeds() {
            try {
                const breeds = await api.getBreeds();
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

    const createBreed = async (values) => {
        try {
            setLoading.open();
            await api.createBreed(values);
            showSuccessNotification('Breed created successfully');
            setBreeds([...breeds, values]);
            return true;
        } catch (error) {   
            showErrorNotification(error);
            return false;
        }
    }

    const deleteBreed = async (breedID) => {
        try {
            await api.deleteBreed(breedID);
            showSuccessNotification('Breed deleted successfully');
            setBreeds(breeds.filter(breed => breed.breedID !== breedID));
        } catch (error) {
            showErrorNotification(error);
            return false;
        }
    }

    const createBreedForm = useForm({
        initialValues: {
            breed: ''
        },
        validateInputOnChange: true,
        validate: {
            breed: (value) => !value ? 'Breed is required' : breeds.find(breed => breed.breed === value) ? 'Breed already exists' : null,
        }
    });

    const createColor = async (values) => {
        try {
            setLoading.open();
            await api.createColor(values);
            showSuccessNotification('Color created successfully');
            setColors([...colors, values]);
            return true;
        } catch (error) {
            showErrorNotification(error);
            return false;
        }
    }

    const deleteColor = async (colorID) => {
        try {
            await api.deleteColor(colorID);
            showSuccessNotification('Color deleted successfully');
            setColors(colors.filter(color => color.colorID !== colorID));
            return true;
        } catch (error) {
            showErrorNotification(error);
            return false;
        }
    }
    
    const createColorForm = useForm({
        initialValues: {
            color: ''
        },
        validateInputOnChange: true,
        validate: {
            color: (value) => !value ? 'Color is required' : colors.find(color => color.color === value) ? 'Color already exists' : null,
        }
    });

    return (
        <Flex maw="50%" mx="auto" direction="column" justify="center">
            <Modal
                title="Create breed"
                opened={createBreedModalOpened}
                onClose={() => {setCreateBreedModalOpened.close();}}
            >
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <form
                    onSubmit={createBreedForm.onSubmit(async (values) => {
                        if (await createBreed(values)) {
                            setCreateBreedModalOpened.close();
                        }
                        setLoading.close();
                    })}
                >
                    <TextInput
                        label="Breed"
                        placeholder="Breed"
                        key={createBreedForm.key('breed')}
                        {...createBreedForm.getInputProps('breed')}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        mt="xl"
                        disabled={!createBreedForm.isValid() || !createBreedForm.isDirty()}
                    >
                        Submit
                    </Button>
                </form>
            </Modal>
            <Modal
                title="Create color"
                opened={createColorModalOpened}
                onClose={() => {setCreateColorModalOpened.close();}}
            >
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <form
                    onSubmit={createColorForm.onSubmit(async (values) => {
                        if (await createColor(values)) {
                            setCreateColorModalOpened.close();
                        }
                        setLoading.close();
                    })}
                >
                    <TextInput
                        label="Color"
                        placeholder="Color"
                        key={createColorForm.key('color')}
                        {...createColorForm.getInputProps('color')}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        mt="xl"
                        disabled={!createColorForm.isValid() || !createColorForm.isDirty()}
                    >
                        Submit
                    </Button>
                </form>
            </Modal>
            <Title order={1} align='center'>Edit Available Cow Attributes</Title>
            <Title order={2} align='center' mt="xl">Breeds</Title>
            <Button 
                fz="lg" 
                mt="xs"
                onClick={() => {createBreedForm.reset();setCreateBreedModalOpened.open();}}
            >Create A Breed</Button>
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
                                    onClick={() => {
                                        setBreedToEdit(breed);
                                        
                                    }}
                                >
                                    <IconEdit />
                                </Button>
                                <Button variant="subtle" color="red" onClick={() => {
                                    modals.openConfirmModal({
                                        title: 'Delete breed',
                                        centered: true,
                                        children: (
                                            <Text>
                                                Are you sure you want to delete the breed {breed.breed}? This is an irreversible action.
                                            </Text>
                                        ),
                                        labels: { confirm: 'Delete', cancel: 'Cancel' },
                                        confirmProps: { color: 'red' },
                                        onConfirm: () => deleteBreed(breed.breedID),
                                    });
                                }}>
                                    <IconBackspace />
                                </Button>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            <Title order={2} align='center' mt="xl">Colors</Title>
            <Button 
                fz="lg" 
                mt="xs"
                onClick={() => {createColorForm.reset();setCreateColorModalOpened.open();}}
            >Create Color</Button>
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
                                <Button variant="subtle" color="red" onClick={() => {
                                    modals.openConfirmModal({
                                        title: 'Delete color',
                                        centered: true,
                                        children: (
                                            <Text>
                                                Are you sure you want to delete the color {color.color}? This is an irreversible action.
                                            </Text>
                                        ),
                                        labels: { confirm: 'Delete', cancel: 'Cancel' },
                                        confirmProps: { color: 'red' },
                                        onConfirm: () => deleteColor(color.colorID),
                                    })}}>
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