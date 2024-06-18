'use client';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';
import { FC } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CategorySkeletonProps {
    count: number;
}
export const CategorySkeleton: FC<CategorySkeletonProps> = ({ count }) => {
    return (
        <Swiper
            slidesPerView={5}
            // spaceBetween={2}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            style={{ padding: '16px 48px 0px 48px', borderRadius: '0.75rem' }}
            className="min-h-[300px]  bg-transparent "
        >
            {[...Array(count).keys()].map((item: any, index: number) => (
                <SwiperSlide key={index} className="mx-2 bg-transparent">
                    <Box
                        w={'280px'}
                        h={'240px'}
                        rounded={'xl'}
                        p={2}
                        textAlign={'left'}
                        justifyContent={'space-between'}
                        display={'flex'}
                        flexDirection={'column'}
                        backdropBlur={'2xl'}
                        bgColor={'white'}
                        boxShadow={'md'}
                        className="hover:-translate-y-4 hover:drop-shadow-2xl transition-all duration-300 ease-in-out"
                    >
                        <Skeleton w={'full'} minHeight={'180px'} position={'relative'} />
                        <SkeletonText p={2} noOfLines={2} fontSize={'18px'} fontWeight={600} />
                    </Box>

                    {/* </div> */}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
