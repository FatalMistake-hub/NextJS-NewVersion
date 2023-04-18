import React from 'react';
import { SimpleGrid, Checkbox, Stack, Button } from '@chakra-ui/react';
const LanguagePicker: React.FC = ({ onCancel }: any) => {
    return (
        <>
            <SimpleGrid columns={2} spacing={10} p={2} >
                <Checkbox size="lg" colorScheme="teal" defaultChecked>
                    Checkbox
                </Checkbox>
                <Checkbox size="lg" colorScheme="teal" defaultChecked>
                    Checkbox
                </Checkbox>
                <Checkbox size="lg" colorScheme="teal" defaultChecked>
                    Checkbox
                </Checkbox>
                <Checkbox size="lg" colorScheme="teal" defaultChecked>
                    Checkbox
                </Checkbox>
                <Checkbox size="lg" colorScheme="teal" defaultChecked>
                    Checkbox
                </Checkbox>
                <Checkbox size="lg" colorScheme="teal" defaultChecked>
                    Checkbox
                </Checkbox>
                <Checkbox size="lg" colorScheme="teal" defaultChecked>
                    Checkbox
                </Checkbox>
                <Checkbox size="lg" colorScheme="teal" defaultChecked>
                    Checkbox
                </Checkbox>
                <Checkbox size="lg" colorScheme="teal" defaultChecked>
                    Checkbox
                </Checkbox>
                <Checkbox size="lg" colorScheme="teal" defaultChecked>
                    Checkbox
                </Checkbox>
            </SimpleGrid>
        </>
    );
};

export default LanguagePicker;
