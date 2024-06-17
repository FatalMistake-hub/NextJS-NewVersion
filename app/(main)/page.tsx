import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Category from '@components/Category';
import { TourList } from '@components/List/TourList';

import Search from '@components/Search';
import { CategorySkeleton } from '@components/Skeleton/CategorySkeleton';
import MainLayout from '@components/layouts/MainLayout';
import Image from 'next/image';
import { Suspense } from 'react';
export const runtime = 'experimental-edge';

export default async function Home() {
    const image = [
        'https://res.cloudinary.com/sacchidananad-utech/image/upload/q_auto:low/v1686757209/aaasd_bpbp1e.webp',
        'https://res.cloudinary.com/sacchidananad-utech/image/upload/q_auto:low/v1686757210/waallpaperflare.com_wallpaper_dvyycj.webp',
        'https://res.cloudinary.com/sacchidananad-utech/image/upload/q_auto:low/v1686757211/ass_bavdp0.webp',
        'https://res.cloudinary.com/sacchidananad-utech/image/upload/q_auto:low/v1686757211/s_zz3h0p.webp',
        'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686757207/river-3632175_1280_eaabuk.jpg',
        'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686757207/pexels-photo-2161467_q9v4ta.jpg',
    ];
    const imageMain = image[Math.floor(Math.random() * image.length)];
    return (
        <MainLayout>
            <Flex display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <section className="w-full self-center flex flex-col justify-center items-center relative h-[60vh] ">
                    <Box w={'full'} maxW={'1800px'} top={'160px'} rounded={'2xl'} minHeight={'55vh'} position={'relative'}>
                        <Image
                            src={imageMain}
                            alt={`Picture of `}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={imageMain}
                            className={'brightness-[.7] rounded-2xl'}
                            priority
                        />
                    </Box>
                    <Box
                        height={'350px'}
                        objectFit="cover"
                        className="flex  justify-center w-full flex-col items-center  absolute top-12 left-0 right-0 z-10"
                    >
                        <Heading color={'whiteAlpha.900'} lineHeight={1.4} as="h1" fontSize={'56px'} noOfLines={1} fontWeight={700}>
                            Khám phá thế giới qua những chuyến đi
                        </Heading>
                        <Text
                            color={'whiteAlpha.900'}
                            lineHeight={1.4}
                            fontSize={'18px'}
                            pb={8}
                            fontWeight={500}
                            noOfLines={2}
                            maxW={'850px'}
                            textAlign={'center'}
                        >
                            Từ chuyến phượt "ngẫu hứng" đến những cuộc phiêu lưu, khám phá công thức niềm vui của riêng bạn qua những trải
                            nghiệm
                        </Text>
                        <Search />
                    </Box>
                    <div className="pl-[52px] pr-[68px] w-full  ">
                        {/* {dataCategory ? <Category dataCategory={dataCategory} /> : <CategorySkeleton count={5} />} */}
                        <Suspense fallback={<CategorySkeleton count={5} />}>
                            {/* <Category /> */}
                        </Suspense>
                    </div>
                </section>
                <TourList />
            </Flex>
        </MainLayout>
    );
}
