import { FC, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
    Divider,
    Button,
} from '@chakra-ui/react';

// Import Swiper React components

import { IImageTour } from 'src/types/tours.type';

interface QrCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    data?: string | undefined;
}

const QrCodeModal: FC<QrCodeModalProps> = ({ isOpen, onClose, data }) => {
    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} size={'3xl'} scrollBehavior={'inside'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody as="form" w={'full'}>
                        <Heading fontSize={'28px'} fontWeight={500} p={6}>
                            Chụp hoặc lưu ảnh QR code vào thiết bị của bạn để quét khi đến địa điểm
                        </Heading>
                        <img className="mx-auto mt-12 h-52 w-52 rounded-lg border p-2 md:mt-0" src={data} alt="step" />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" mr={3} onClick={onClose}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
export default QrCodeModal;
