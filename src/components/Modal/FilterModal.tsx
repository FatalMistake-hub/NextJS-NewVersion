import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
    useToast,
    Flex,
    ModalFooter,
    FormControl,
    FormLabel,
    Checkbox,
    Stack,
    Link,
    Heading,
    useColorModeValue,
    Divider,
    Collapse,
    Button,
} from '@chakra-ui/react';
import { FaLock, FaUserNinja } from 'react-icons/fa';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LanguagePicker from '@components/Filter/FilterItem/LanguagePicker';
import PriceRange from '@components/Filter/FilterItem/PriceRange';
import TimeInDay from '@components/Filter/FilterItem/TimeInDay';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    username: string;
    password: string;
}
export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
    const [show, setShow] = React.useState<any>({ cp1: false, cp2: false, cp3: false, cp4: false });

    const handleToggle = (name: string) => setShow((prevState: any) => ({ ...prevState, [name]: !prevState[name] }));
    return (
        <Modal onClose={onClose} isOpen={isOpen} size={'xl'} scrollBehavior={'inside'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Flex align={'center'} justify={'center'}>
                        Bộ lọc
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form">
                    <Flex align={'start'} justify={'center'} direction={'column'}>
                        <Divider orientation="horizontal" />
                        <div className="px-6 py-8">
                            <Text fontSize="2xl" fontWeight={'600'} mb={2}>
                                Loại hoạt động
                            </Text>
                            <Collapse startingHeight={120} in={show.cp1}>
                                <LanguagePicker />
                            </Collapse>
                            <Button size="sm" onClick={() => handleToggle('cp1')} mt="1rem">
                                Show {show.cp1 ? 'Less' : 'More'}
                            </Button>
                        </div>
                        <Divider orientation="horizontal" />
                        <div className="px-6 py-8">
                            <Text fontSize="2xl" fontWeight={'600'} mb={2}>
                                Khoảng giá
                            </Text>
                            <PriceRange />
                        </div>
                        <Divider orientation="horizontal" />
                        <div className="px-6 py-8">
                            <Text fontSize="2xl" fontWeight={'600'} mb={2}>
                                Ngôn ngữ có thể sử dụng
                            </Text>
                            <Collapse startingHeight={120} in={show.cp2}>
                                <LanguagePicker />
                            </Collapse>
                            <Button size="sm" onClick={() => handleToggle('cp2')} mt="1rem">
                                Show {show.cp2 ? 'Less' : 'More'}
                            </Button>
                        </div>
                        <Divider orientation="horizontal" />
                        <div className="px-6 py-8">
                            <Text fontSize="2xl" fontWeight={'600'} mb={2}>
                                Thời gian trong ngày
                            </Text>
                            <TimeInDay collumn={2} />
                        </div>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <div className="flex flex-col w-full">
                        <Divider orientation="horizontal" />
                        <div className="flex justify-between w-full px-1 mt-4">
                            <Button variant="link"> Close</Button>
                            <Button colorScheme="teal" onClick={onClose}>
                                Secondary Action
                            </Button>
                        </div>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
