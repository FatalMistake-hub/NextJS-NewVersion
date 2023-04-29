import { FC, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper';
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
                    <ModalCloseButton color={'white'} />
                    <ModalBody display={'flex'} alignItems={'center'} justifyContent={'center'} backgroundColor={'black'}>
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
                            pagination={true}
                            navigation={true}
                            // virtual
                            modules={[EffectCoverflow, Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <div className="w-full h-full">
                                    <Image
                                        src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                        alt={`Picture of `}
                                        layout="responsive"
                                        width={'100%'}
                                        height={'100%'}
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="w-full h-full">
                                    <Image
                                        src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                        alt={`Picture of `}
                                        layout="responsive"
                                        width={'100%'}
                                        height={'100%'}
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="w-full h-full">
                                    <Image
                                        src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                        alt={`Picture of `}
                                        layout="responsive"
                                        width={'100%'}
                                        height={'100%'}
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="w-full h-full">
                                    <Image
                                        src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                        alt={`Picture of `}
                                        layout="responsive"
                                        width={'100%'}
                                        height={'100%'}
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="w-full h-full">
                                    <Image
                                        src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                        alt={`Picture of `}
                                        layout="responsive"
                                        width={'100%'}
                                        height={'100%'}
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="w-full h-full">
                                    <Image
                                        src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                        alt={`Picture of `}
                                        layout="responsive"
                                        width={'100%'}
                                        height={'100%'}
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="w-full h-full">
                                    <Image
                                        src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                        alt={`Picture of `}
                                        layout="responsive"
                                        width={'100%'}
                                        height={'100%'}
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="w-full h-full">
                                    <Image
                                        src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                        alt={`Picture of `}
                                        layout="responsive"
                                        width={'100%'}
                                        height={'100%'}
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="w-full h-full">
                                    <Image
                                        src={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                        alt={`Picture of `}
                                        layout="responsive"
                                        width={'100%'}
                                        height={'100%'}
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp'}
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default AllPictureModal;
