import React from 'react';
import { Box, Button, Flex, Heading, SimpleGrid, Text, chakra } from '@chakra-ui/react';
import CardItem, { CardItemSkeleton } from '@components/Card/CardItem';

import useGetAllTour from 'src/hooks/guest/tours/useGetAllTour';
import { ITours } from 'src/types/tours.type';
import { GetServerSideProps } from 'next';
import { getAllCategory } from 'src/utils/apis/category.api';
import Search from '@components/Search';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { SET_CATEGORY, selectSearch } from 'src/redux/slice/searchSlice';
import useUserLocation from 'src/hooks/map/useUserLocation';

interface Props {
    dataCategory: any;
    imageMain: any;
}

const features = [
    {
        heading: 'Chất lượng là cốt lõi',
        content: 'Tiêu chuẩn chất lượng cao.Cam kết cung cấp các trải nghiệm từ các nhà tổ chức nhiều kinh nghiệm.',
        icon: (
            <svg width="49" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" className="advantageBannerIcon__2LXU">
                <path
                    d="M44.47 5.626c8.614 9.318 1.384 10.944-6.346 18.916-7.73 7.972-13.126 12.63-21.646 9.952C7.958 31.815-4.987 19.542 2.743 11.57c7.73-7.972 33.113-15.263 41.727-5.944z"
                    fill="#FCDACF"
                ></path>
                <path
                    d="M28.78 1.255L16.528 5.068a2 2 0 00-1.405 1.91V26.5a2 2 0 002 2h14.947a2 2 0 002-2V8.75c0-.964-.78-1.745-1.745-1.745h-.745a1 1 0 01-1-1V2.58a1.386 1.386 0 00-1.798-1.324z"
                    fill="#fff"
                ></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.181 29.999a2.812 2.812 0 01-2.805-2.812V6.6a.243.243 0 000-.032 2.929 2.929 0 012.014-2.805L28.52.102c.244-.067.497-.102.75-.102.757.001 1.46.296 1.988.829.529.532.82 1.24.817 1.99v2.804h.935a2.81 2.81 0 012.804 2.811v18.754A2.81 2.81 0 0133.01 30H16.18v-.001zm-.935-2.812c0 .517.419.937.935.937H33.01c.516 0 .935-.42.935-.937V8.433a.936.936 0 00-.935-.937l-1.772.001a.886.886 0 01-.197 0l-15.795.006v19.684zm14.03-25.312a1 1 0 00-.257.033l-13.088 3.65a.967.967 0 00-.156.07l14.43-.005V2.817a.935.935 0 00-.929-.942zm-1.052 20.627c-.295 0-.585-.078-.838-.225l-2.79-1.575-2.802 1.579a1.641 1.641 0 01-.824.22c-.594 0-1.149-.32-1.447-.834a1.69 1.69 0 01-.097-1.482l1.098-2.53-1.976-1.952a1.669 1.669 0 01-.026-2.352 1.695 1.695 0 011.207-.502h2.074l1.296-2.555a1.69 1.69 0 011.499-.91 1.678 1.678 0 011.485.897l1.302 2.571h2.078c.913 0 1.658.733 1.675 1.633.01.458-.173.905-.5 1.226l-1.974 1.948 1.092 2.515a1.677 1.677 0 01-.894 2.201 1.65 1.65 0 01-.638.127zm-3.629-3.812c.16 0 .318.041.458.12l2.747 1.55-1.104-2.545a.944.944 0 01.202-1.042l2.074-2.046h-2.158a.931.931 0 01-.834-.512l-1.385-2.732-1.385 2.728a.93.93 0 01-.832.512H20.22l2.074 2.049c.273.27.354.688.202 1.04l-1.106 2.546 2.748-1.548a.934.934 0 01.457-.12zm-5.61 6.622c0 .518.42.938.936.938h9.349a.936.936 0 000-1.875h-9.35a.936.936 0 00-.934.937z"
                    fill="#2A2D32"
                ></path>
            </svg>
        ),
        color: 'pink.500',
    },
    {
        heading: 'Dễ dàng khám phá',
        content: 'Làm chủ quyền kiểm soát, với các tùy chọn thanh toán và hủy miễn phí để đáp ứng mọi kế hoạch hoặc ngân sách.',
        icon: (
            <svg width="48" height="35" fill="none" xmlns="http://www.w3.org/2000/svg" className="advantageBannerIcon__2LXU">
                <path
                    d="M44.095 5.232c8.614 9.319 1.384 10.945-6.346 18.917-7.73 7.971-13.126 12.63-21.646 9.951-8.52-2.678-21.465-14.952-13.735-22.923 7.73-7.972 33.113-15.263 41.727-5.945z"
                    fill="#F6ECBB"
                ></path>
                <path
                    d="M7.8 8.498C7.8 7.89 8.29 7.4 8.897 7.4h31.405c.606 0 1.098.491 1.098 1.098v18.66c0 .606-.492 1.097-1.098 1.097H8.897A1.098 1.098 0 017.8 27.157V8.497z"
                    fill="#fff"
                ></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.666 9.266v17.123h29.868V9.266H9.666zM8.897 7.4C8.291 7.4 7.8 7.89 7.8 8.498v18.66c0 .606.491 1.097 1.097 1.097h31.405c.606 0 1.098-.491 1.098-1.098V8.497c0-.606-.492-1.097-1.098-1.097H8.897z"
                    fill="#2A2D32"
                ></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M28.076 11.187a.964.964 0 000 1.927h4.02c.026.77.245 1.409.74 1.853.503.45 1.22.638 2.098.65v4.387c-.878.012-1.595.2-2.098.65-.495.445-.714 1.083-.74 1.854H28.15a.964.964 0 000 1.927h4.047c1.075 0 1.823-.773 1.823-1.767 0-.447.071-.556.127-.601a.56.56 0 01.253-.095c.15-.028.352-.042.63-.042 1.01 0 1.831-.796 1.831-1.872v-4.494c0-1.076-.82-1.873-1.832-1.873-.278 0-.48-.014-.63-.042a.561.561 0 01-.252-.095c-.056-.045-.127-.153-.127-.6 0-.995-.748-1.768-1.823-1.768h-4.12zM20.835 24.434a.964.964 0 000-1.927h-4.02c-.026-.77-.244-1.409-.74-1.853-.502-.45-1.22-.638-2.098-.65v-4.387c.878-.012 1.596-.2 2.098-.65.496-.445.715-1.083.74-1.854h3.947a.964.964 0 000-1.927h-4.047c-1.075 0-1.824.773-1.824 1.767 0 .447-.07.556-.126.6a.56.56 0 01-.253.096c-.15.028-.352.042-.63.042-1.01 0-1.832.796-1.832 1.872v4.494c0 1.076.821 1.873 1.832 1.873.278 0 .48.013.63.042a.56.56 0 01.253.095c.055.045.126.153.126.6 0 .995.748 1.767 1.824 1.767h4.12z"
                    fill="#2A2D32"
                ></path>
                <path
                    d="M28.656 17.828c0 2.56-1.816 4.634-4.055 4.634-2.24 0-4.056-2.075-4.056-4.634 0-2.56 1.816-4.635 4.056-4.635s4.055 2.075 4.055 4.635z"
                    fill="#fff"
                ></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24.6 20.816c1.131 0 2.41-1.124 2.41-2.988 0-1.864-1.279-2.988-2.41-2.988-1.13 0-2.408 1.124-2.408 2.988 0 1.864 1.278 2.988 2.409 2.988zm0 1.646c2.24 0 4.056-2.075 4.056-4.634 0-2.56-1.816-4.635-4.055-4.635-2.24 0-4.056 2.075-4.056 4.635 0 2.56 1.816 4.634 4.056 4.634z"
                    fill="#2A2D32"
                ></path>
            </svg>
        ),
        color: 'blue.500',
    },
    {
        heading: 'Những trải nghiệm đáng nhớ',
        content: 'Duyệt và đặt các chuyến tham quan và hoạt động thật tuyệt vời, bạn sẽ muốn kể cho bạn bè của mình.',
        icon: (
            <svg width="49" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" className="advantageBannerIcon__2LXU">
                <path
                    d="M44.72 6.372c8.614 9.318 1.384 10.945-6.346 18.916-7.73 7.972-13.126 12.63-21.646 9.952-8.52-2.679-21.465-14.952-13.735-22.924 7.73-7.971 33.113-15.263 41.727-5.944z"
                    fill="#DEECED"
                ></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.625 18.7c5.176-1.054 9-4.773 9-9.2 0-5.247-5.373-9.5-12-9.5s-12 4.253-12 9.5c0 4.136 3.34 7.655 8 8.96V29h7V18.7z"
                    fill="#fff"
                ></path>
                <path
                    d="M20.685 31.154a2.274 2.274 0 01-2.271-2.272v-3.57h-.974a.974.974 0 010-1.947h1.502l-1.162-3.014c-4.354-1.785-7.155-5.548-7.155-9.642C10.625 4.804 16.303 0 23.281 0c6.979 0 12.657 4.804 12.657 10.71 0 4.093-2.8 7.856-7.156 9.641l-1.161 3.014h1.502a.974.974 0 010 1.948h-.974v3.57a2.274 2.274 0 01-2.272 2.27h-5.192zm-.324-2.272c0 .18.145.325.324.325h5.192c.18 0 .325-.146.325-.325v-3.57H20.36v3.57zm5.172-5.517l.88-2.282a14.691 14.691 0 01-3.132.335c-1.059 0-2.11-.111-3.132-.335l.88 2.282h4.504zM23.281 1.947c-2.639 0-4.867 4.012-4.867 8.762 0 4.75 2.228 8.762 4.867 8.762 2.64 0 4.868-4.012 4.868-8.762 0-4.75-2.229-8.762-4.868-8.762zm-4.603.857c-3.664 1.438-6.106 4.517-6.106 7.905s2.442 6.467 6.106 7.905c-1.389-2.005-2.212-4.877-2.212-7.905 0-3.028.823-5.9 2.212-7.905zm9.206 0c1.39 2.005 2.212 4.877 2.212 7.905 0 3.029-.823 5.9-2.212 7.905 3.665-1.438 6.106-4.517 6.106-7.905s-2.441-6.467-6.106-7.905z"
                    fill="#2A2D32"
                ></path>
            </svg>
        ),
        color: 'teal.500',
    },
    {
        heading: 'Đáng tin cậy',
        content: 'Luôn lắng nghe đánh giá và hỗ trợ tận tình. Chúng tôi sẽ phục vụ bạn từng bước.',
        icon: (
            <svg width="49" height="35" fill="none" xmlns="http://www.w3.org/2000/svg" className="advantageBannerIcon__2LXU">
                <path
                    d="M44.22 4.626c8.614 9.318 1.384 10.944-6.346 18.916-7.73 7.972-13.126 12.63-21.646 9.952C7.708 30.815-5.237 18.542 2.493 10.57c7.73-7.972 33.113-15.263 41.727-5.944z"
                    fill="#F5B8C3"
                ></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M32.858 13.556V5.15H13.693v8.405h.132c.76 3.409 4.702 6.005 9.45 6.005 4.748 0 8.69-2.596 9.45-6.004h.133zm-9.583 13.651s2.396.6 5.99.6c0-2.652-2.682-4.803-5.99-4.803-3.308 0-5.989 2.15-5.989 4.803 3.593 0 5.99-.6 5.99-.6z"
                    fill="#fff"
                ></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.763 28.787a.777.777 0 01-.73-1.035 7.72 7.72 0 014.72-4.732 7.753 7.753 0 011.806-.406v-1.619c-5.671-.402-10.06-5.092-10.06-10.836v-.625H8.576c-.193 1.502-.093 2.849.34 3.882.472 1.126 1.355 1.933 2.884 2.184a.779.779 0 01-.252 1.536c-2.064-.339-3.391-1.504-4.068-3.119-.655-1.563-.68-3.487-.338-5.398a.779.779 0 01.766-.641H12.5v-1.7a2.328 2.328 0 012.322-2.329h17.033a2.328 2.328 0 012.322 2.329v.899h4.466c.377 0 .7.27.766.641.341 1.911.317 3.835-.338 5.398-.677 1.616-2.004 2.78-4.068 3.12a.779.779 0 01-.252-1.537c1.529-.251 2.412-1.058 2.884-2.184.432-1.033.533-2.38.34-3.881h-3.797v1.425c0 5.75-4.394 10.439-10.07 10.836v1.617a7.694 7.694 0 012.564.723 7.701 7.701 0 013.963 4.418.777.777 0 01-.73 1.034H16.763zM14.821 5.5h17.033c.427 0 .774.348.774.777v3.88c0 5.137-4.167 9.315-9.29 9.315-5.124 0-9.29-4.178-9.29-9.314V6.278c0-.429.346-.777.773-.777zm13.88 21.734a6.106 6.106 0 00-2.698-2.5 6.122 6.122 0 00-2.608-.61l-.005.001a.584.584 0 01-.107 0 6.189 6.189 0 00-2.015.358 6.133 6.133 0 00-3.301 2.75H28.7z"
                    fill="#2A2D32"
                ></path>
            </svg>
        ),
        color: 'orange.500',
    },
];

const Home = ({ dataCategory, imageMain }: Props) => {
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
    const { location, checkIn, checkOut, guests, categoryList, viewport } = useAppSelector(selectSearch);
    const dispatch = useAppDispatch();
    const handleClickCategory = async (category: any) => {
        // await dispatch(SET_CATEGORY([]));
        // await dispatch(ADD_CATEGORY(cateory));

        await dispatch(
            SET_CATEGORY({
                categoryId: category.id,
                label: category.label,
                // type: navItem.type,
            }),
        );

        await router.push({
            pathname: '/search',
            query: {
                location,
                checkIn: `${checkIn}`,
                checkOut: `${checkOut}`,
                guests: JSON.stringify(guests),
                categoryList: JSON.stringify(categoryList[categoryList.length - 1]),
                viewport: JSON.stringify(viewport),
            },
        });
    };
    // console.log('viewport', checkIn?.toISOString(), checkOut?.toISOString());
    useUserLocation();
    return (
        <>
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
                                        boxShadow={'md'}
                                        className="hover:-translate-y-4 hover:drop-shadow-2xl transition-all duration-300 ease-in-out"
                                        onClick={() => {
                                            handleClickCategory(item);
                                        }}
                                    >
                                        <Box w={'full'} minHeight={'180px'} position={'relative'}>
                                            <Image
                                                src={
                                                    item.imageLink
                                                        ? item.imageLink
                                                        : 'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686583596/steffen-b-qDZ-Xd8dX6w-unsplash_vsuyhz.jpg'
                                                }
                                                alt={`Picture of `}
                                                layout="fill"
                                                objectFit="cover"
                                                placeholder="blur"
                                                blurDataURL={
                                                    item.imageLink
                                                        ? item.imageLink
                                                        : 'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686583596/steffen-b-qDZ-Xd8dX6w-unsplash_vsuyhz.jpg'
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
                        Vì sao bạn nên chọn NATravel
                    </Heading>
                    <SimpleGrid columns={4} spacing={16} pb={8}>
                        {features.map((feature: any, index: any) => (
                            <Box key={index} className="flex flex-col justify-left items-center" textAlign={'center'}>
                                {/* <Icon as={feature.icon} className="drop-shadow-lg" w={14} h={14} color={feature.color} /> */}
                                <div className="drop-shadow-lg pb-3"> {feature.icon}</div>
                                <chakra.h3 fontWeight="semibold" fontSize="2xl">
                                    {feature.heading}
                                </chakra.h3>
                                <Text fontSize="md" fontWeight={500}>
                                    {feature.content}
                                </Text>
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
    const dataCategory = data?.map((item) => ({
        type: 'Button',
        id: item.categoryId,
        label: item.categoryName,
        imageLink: item.imageLink,
    }));
    const image = [
        'https://res.cloudinary.com/sacchidananad-utech/image/upload/q_auto:low/v1686757209/aaasd_bpbp1e.webp',
        'https://res.cloudinary.com/sacchidananad-utech/image/upload/q_auto:low/v1686757210/waallpaperflare.com_wallpaper_dvyycj.webp',
        'https://res.cloudinary.com/sacchidananad-utech/image/upload/q_auto:low/v1686757211/ass_bavdp0.webp',
        'https://res.cloudinary.com/sacchidananad-utech/image/upload/q_auto:low/v1686757211/s_zz3h0p.webp',
        'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686757207/river-3632175_1280_eaabuk.jpg',
        'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686757207/pexels-photo-2161467_q9v4ta.jpg',
    ];
    const imageMain = image[Math.floor(Math.random() * image.length)];
    return {
        props: { dataCategory, imageMain },
    };
};
export default Home;
// Home.Layout = 'NoSearchLayout';
