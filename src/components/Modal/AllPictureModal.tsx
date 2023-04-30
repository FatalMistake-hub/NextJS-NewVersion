import { FC, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { EffectCoverflow, Pagination, Navigation, Keyboard } from 'swiper';
import Image from 'next/image';
interface AllPictureModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AllPictureModal: FC<AllPictureModalProps> = ({ isOpen, onClose }) => {
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
                            <SwiperSlide>
                                <Image
                                    src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    alt={`Picture of `}
                                    layout="responsive"
                                    width={'300px'}
                                    height={'300px'}
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image
                                    src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    alt={`Picture of `}
                                    layout="responsive"
                                    width={'300px'}
                                    height={'300px'}
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image
                                    src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    alt={`Picture of `}
                                    layout="responsive"
                                    width={'300px'}
                                    height={'300px'}
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image
                                    src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    alt={`Picture of `}
                                    layout="responsive"
                                    width={'300px'}
                                    height={'300px'}
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image
                                    src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    alt={`Picture of `}
                                    layout="responsive"
                                    width={'300px'}
                                    height={'300px'}
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image
                                    src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    alt={`Picture of `}
                                    layout="responsive"
                                    width={'300px'}
                                    height={'300px'}
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image
                                    src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    alt={`Picture of `}
                                    layout="responsive"
                                    width={'300px'}
                                    height={'300px'}
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image
                                    src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    alt={`Picture of `}
                                    layout="responsive"
                                    width={'300px'}
                                    height={'300px'}
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image
                                    src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    alt={`Picture of `}
                                    layout="responsive"
                                    width={'300px'}
                                    height={'300px'}
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                />
                            </SwiperSlide>
                        </Swiper>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default AllPictureModal;
