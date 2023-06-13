import MainLayout from '@components/layouts/MainLayout';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import {
    Box,
    Button,
    useColorModeValue,
    Flex,
    Heading,
    Link,
    SimpleGrid,
    Spacer,
    Text,
    useTheme,
    Stack,
    Center,
    chakra,
    Icon,
} from '@chakra-ui/react';
import CardItem, { CardItemSkeleton } from '@components/Card/CardItem';

import useGetAllTour from 'src/hooks/guest/tours/useGetAllTour';
import { ITours } from 'src/types/tours.type';
import FilterNav from '@components/Filter/FilterNav';
import { GetServerSideProps } from 'next';
import useGetAllCatgory from 'src/hooks/guest/category/useGetAllCategory';
import { getCategory, getSearch } from 'src/utils/data';
import { getAllCategory } from 'src/utils/apis/category.api';
import Search from '@components/Search';
import { HeaderNoSearch } from '@components/layouts/common/HeaderNoSearch';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper';
import Image from 'next/image';
import { BiAbacus } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { ADD_CATEGORY, selectSearch } from 'src/redux/slice/searchSlice';
import { SET_CATEGORY } from 'src/redux/slice/becomeHostSlice';
import { ICategory } from 'src/types/category.type';

interface Props {
    dataCategory: any;
}
const imageMain = [
    '/assets/image/aaasd.jpg',
    '/assets/image/ass.jpg',
    '/assets/image/pexels-photo-2161467.jpeg',
    '/assets/image/river-3632175_1280.jpg',
    '/assets/image/s.jpg',
    '/assets/image/waallpaperflare.com_wallpaper.jpg',
    '/assets/image/wallpaperflare.com_wallpaper.jpg',
];
const features = [
    {
        heading: 'Learn with flashcards',
        content: 'The main part of the learning process is using flashcards, you see a question, then you answer it.',
        icon: BiAbacus,
    },
    {
        heading: 'Learn with flashcards',
        content: 'The main part of the learning process is using flashcards, you see a question, then you answer it.',
        icon: BiAbacus,
    },
    {
        heading: 'Learn with flashcards',
        content: 'The main part of the learning process is using flashcards, you see a question, then you answer it.',
        icon: BiAbacus,
    },
    {
        heading: 'Learn with flashcards',
        content: 'The main part of the learning process is using flashcards, you see a question, then you answer it.',
        icon: BiAbacus,
    },
];

const Home = ({ dataCategory }: Props) => {
    const {
        status,
        ref,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useGetAllTour(10);
    const router = useRouter();
    const { location, checkIn, checkOut, guests, categoryList } = useAppSelector(selectSearch);
    const dispatch = useAppDispatch();
    const handleClickCategory = async (cateory: ICategory) => {
        await dispatch(SET_CATEGORY([]));
        await dispatch(ADD_CATEGORY(cateory));

        await router.push({
            pathname: '/search',
            query: {
                location,
                checkIn: checkIn?.toISOString(),
                checkOut: checkOut?.toISOString(),
                guests: JSON.stringify(guests),
                categoryList: JSON.stringify([cateory]),
            },
        });
    };
    return (
        <>
            <Flex display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <section className="w-full self-center items-center relative h-[60vh] ">
                    <Box w={'full'} minHeight={'55vh'} position={'relative'}>
                        <Image
                            src={imageMain[Math.floor(Math.random() * imageMain.length)]}
                            alt={`Picture of `}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={imageMain[Math.floor(Math.random() * imageMain.length)]}
                            className={'brightness-[.7]'}
                        />
                    </Box>
                    <Box
                        height={'350px'}
                        objectFit="cover"
                        className="flex  justify-center w-full flex-col items-center  absolute top-12 left-0 right-0 z-10"
                    >
                        <Heading color={'whiteAlpha.900'} lineHeight={1.4} as="h1" fontSize={'56px'} noOfLines={1} fontWeight={700}>
                            THẾ GIỚI TRỌN NIỀM VUI
                        </Heading>
                        <Heading color={'whiteAlpha.900'} lineHeight={1.4} as="h2" size="lg" pb={8} noOfLines={1}>
                            Tất cả trải nghiệm
                        </Heading>
                        <div className="shadow-3xl">
                            <Search />
                        </div>
                    </Box>
                    <div className="pl-[52px] pr-[64px] w-full   -translate-y-[8vh]">
                        <Swiper
                            slidesPerView={5}
                            // spaceBetween={2}

                            pagination={{ clickable: true }}
                            modules={[Pagination]}
                            style={{ padding: '16px 48px 0px 48px', borderRadius: '0.75rem' }}
                            className="min-h-[300px] max-w-[1816px]  bg-transparent    "
                        >
                            {dataCategory?.map((item: any, index: number) => (
                                <SwiperSlide key={index} className="mx-2 bg-transparent">
                                    {/* <div> */}

                                    <Box
                                        // ml={'-26px'}
                                        maxW={'280px'}
                                        h={'240px'}
                                        rounded={'xl'}
                                        p={2}
                                        textAlign={'left'}
                                        justifyContent={'space-between'}
                                        display={'flex'}
                                        flexDirection={'column'}
                                        backdropBlur={'2xl'}
                                        bgColor={'white'}
                                        className="hover:-translate-y-4 hover:drop-shadow-2xl transition-all duration-300 ease-in-out"
                                        onClick={() => {
                                            handleClickCategory(item);
                                        }}
                                    >
                                        <Box w={'full'} minHeight={'180px'} position={'relative'}>
                                            <Image
                                                src={
                                                    'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686583596/steffen-b-qDZ-Xd8dX6w-unsplash_vsuyhz.jpg'
                                                }
                                                alt={`Picture of `}
                                                layout="fill"
                                                objectFit="cover"
                                                placeholder="blur"
                                                blurDataURL={
                                                    'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686583596/steffen-b-qDZ-Xd8dX6w-unsplash_vsuyhz.jpg'
                                                }
                                                className={'rounded-xl'}
                                            />
                                        </Box>
                                        <Text p={2} noOfLines={2} fontSize={'18px'} fontWeight={600}>
                                            {item.label}
                                        </Text>
                                    </Box>

                                    {/* </div> */}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                <div className="max-w-[1640px] relative top-24 w-full pt-10 pb-24">
                    <Heading lineHeight={1.4} as="h2" size="lg" w={'full'} textAlign={'center'} noOfLines={1} pt={12} mb={14}>
                        Vì sao bạn nên chọn wwe
                    </Heading>
                    <SimpleGrid columns={4} placeItems="center" spacing={16} pb={8}>
                        {features.map((feature: any, index: any) => (
                            <Box key={index} textAlign="center">
                                <Icon as={feature.icon} w={10} h={10} color="blue.400" />
                                <chakra.h3 fontWeight="semibold" fontSize="2xl">
                                    {feature.heading}
                                </chakra.h3>
                                <Text fontSize="md">{feature.content}</Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                    <Heading lineHeight={1.4} as="h2" size="lg" noOfLines={1} py={8}>
                        Tất cả trải nghiệm
                    </Heading>

                    {status === 'loading' ? (
                        <SimpleGrid minChildWidth={'304px'} columnGap="4" py={12}>
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                            <CardItemSkeleton />
                        </SimpleGrid>
                    ) : status === 'error' ? (
                        <span>Error: {error?.message}</span>
                    ) : (
                        <>
                            {/* <div>
                                <button onClick={() => fetchPreviousPage()} disabled={!hasPreviousPage || isFetchingPreviousPage}>
                                    {isFetchingPreviousPage ? 'Loading more...' : hasPreviousPage ? 'Load Older' : 'Nothing more to load'}
                                </button>
                            </div> */}
                            <SimpleGrid minChildWidth={'304px'} gap="6" pb={12}>
                                {data?.pages?.map((page: any) =>
                                    page?.data?.content?.map(
                                        (result: ITours) =>
                                            result.isDeleted === false && (
                                                <CardItem className="h-full min-h-[450px]" data={result} key={result.tourId} />
                                            ),
                                    ),
                                )}
                            </SimpleGrid>
                        </>
                    )}
                </div>
                {hasNextPage && (
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                        isLoading={isFetchingNextPage}
                        // ref={ref}
                        colorScheme="black"
                        color={'white'}
                        p={2}
                        w={'120px'}
                        className="my-8 bg-black"
                    >
                        {isFetchingNextPage ? 'Đang tải...' : hasNextPage ? 'Tải thêm' : 'Tải thêm'}
                    </Button>
                )}
            </Flex>
        </>
    );
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const { data } = await getAllCategory();
    console.log(data);
    const dataCategory = data?.map((item) => ({ type: 'Button', id: item.categoryId, label: item.categoryName }));
    return {
        props: { dataCategory },
    };
};
export default Home;
Home.Layout = 'NoSearchLayout';
