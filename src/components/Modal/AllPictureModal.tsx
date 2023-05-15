import { FC, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { EffectCoverflow, Pagination, Navigation, Keyboard } from 'swiper';
import Image from 'next/image';
import { IImageTour } from 'src/types/tours.type';
interface AllPictureModalProps {
    isOpen: boolean;
    onClose: () => void;
    data?: IImageTour[];
}

const AllPictureModal: FC<AllPictureModalProps> = ({ isOpen, onClose, data }) => {
    return (
        <>
            <Modal onClose={onClose} size={'full'} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton color={'white'} zIndex={'10'} />
                    <ModalBody
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        backgroundColor={'black'}
                        position={'relative'}
                    >
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            keyboard={{
                                enabled: true,
                            }}
                            modules={[EffectCoverflow, Pagination, Navigation, Keyboard]}
                        >
                            {data?.map((image) => (
                                <SwiperSlide>
                                    <Image
                                        src={image.link}
                                        alt={`Picture of `}
                                        layout="responsive"
                                        width={'300px'}
                                        height={'300px'}
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={image.link}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default AllPictureModal;
