import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Category from '@components/Category';
import { TourList } from '@components/List/TourList';

import Search from '@components/Search';
import { CategorySkeleton } from '@components/Skeleton/CategorySkeleton';
import MainLayout from '@components/layouts/MainLayout';
import Image from 'next/image';
import { Suspense } from 'react';
import { image } from 'src/utils/data';
export const runtime = 'experimental-edge';

export default async function Home() {
    
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
                        <Suspense fallback={<CategorySkeleton count={5} />}>
                            <Category />
                        </Suspense>
                    </div>
                </section>
                <TourList />
            </Flex>
        </MainLayout>
    );
}
