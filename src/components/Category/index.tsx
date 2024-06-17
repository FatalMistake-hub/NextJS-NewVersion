// 'use client';
import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectSearch } from 'src/redux/slice/searchSlice';
import { getAllCategory } from 'src/utils/apis/category.api';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


export default async function Category () {
    // const dispatch = useAppDispatch();
    // const router = useRouter();

    // const { location, checkIn, checkOut, guests, categoryList, viewport } = useAppSelector(selectSearch);
    // const handleClickCategory = async (category: any) => {
    //     // await dispatch(SET_CATEGORY([]));
    //     // await dispatch(ADD_CATEGORY(cateory));
    //     const current = new URLSearchParams(); // Convert searchParams to string[][] format
    //     // update as necessary
    //     current.set('location', location);
    //     current.set('checkIn', checkIn);
    //     current.set('checkOut', checkOut);
    //     current.set('guests', JSON.stringify(guests));
    //     current.set('categoryList', JSON.stringify(categoryList[categoryList.length - 1]));
    //     current.set('viewport', JSON.stringify(viewport));
    //     // cast to string
    //     const search = current.toString();
    //     const query = search ? `?${search}` : '';

    //     await router.push(`search${query}`);
    // };
    const { payload: data } = await getAllCategory();
    const dataCategory = data?.map((item: any) => ({
        type: 'Button',
        id: item.categoryId,
        label: item.categoryName,
        imageLink: item.imageLink,
    }));
    return (
        <div
            // slidesPerView={5}
            // // spaceBetween={2}

            // pagination={{ clickable: true }}
            // modules={[Pagination]}
            style={{ padding: '16px 48px 0px 48px', borderRadius: '0.75rem' }}
            className="min-h-[300px] max-w-[1816px]  bg-transparent    "
        >
            {dataCategory?.map((item: any, index: number) => (
                <div key={index} className="mx-2 bg-transparent">
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
                        // onClick={() => {
                        //     handleClickCategory(item);
                        // }}
                    >
                        <Box w={'full'} minHeight={'180px'} position={'relative'}>
                            <Image
                                src={
                                    item.imageLink || 'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686583596/steffen-b-qDZ-Xd8dX6w-unsplash_vsuyhz.jpg'
                                }
                                alt={`Picture of `}
                                layout="fill"
                                objectFit="cover"
                                placeholder="blur"
                                blurDataURL={
                                    item.imageLink || 'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686583596/steffen-b-qDZ-Xd8dX6w-unsplash_vsuyhz.jpg'
                                }
                                className={'rounded-xl'}
                                priority
                            />
                        </Box>
                        <Text p={2} noOfLines={2} fontSize={'18px'} fontWeight={600}>
                            {item.label}
                        </Text>
                    </Box>

                    {/* </div> */}
                </div>
            ))}
        </div>
    );
};
