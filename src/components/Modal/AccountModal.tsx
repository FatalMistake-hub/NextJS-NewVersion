import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Flex,
    Stack,
    Link,
    Heading,
    Input,
    Button,
    ModalFooter,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import usePatchProfile from 'src/hooks/account/usePatchProfile';
import { IInfoAccount } from 'src/types/account.type';

interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    value: string;
    keyData: string;
}

export default function AccountModal({ isOpen, onClose, title, value, keyData }: AccountModalProps) {
    const [inputValue, setInputValue] = useState(value);
    const { patchInfoAccount, isLoading, isError, isSuccess } = usePatchProfile();
    useEffect(() => {
        setInputValue(value);
    }, [title]);
    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={'2xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={8} mx={'auto'} pt={14} px={6}>
                        <Stack>
                            <Heading lineHeight={1.4} pb={6} fontSize={'3xl'} fontWeight={600}>
                                Chỉnh sửa {title}
                            </Heading>

                            <Input
                                h={12}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                variant="outline"
                                colorScheme={'teal'}
                                focusBorderColor={'teal.500'}
                                placeholder={`${value}`}
                            />
                        </Stack>
                    </Stack>
                </ModalBody>
                <ModalFooter p={6}>
                    <Button onClick={onClose} mr={3}>
                        Huỷ
                    </Button>
                    <Button
                        colorScheme="teal"
                        onClick={() => {
                            patchInfoAccount({
                                [keyData]: inputValue,
                            });
                            if (isSuccess) onClose();
                        }}
                    >
                        Lưu
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
