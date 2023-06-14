import React, { FC, ReactElement, useMemo, useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import { getSearch, searchResults } from 'src/utils/data';
import Image from 'next/image';
import { BiChevronLeft, BiChevronRight, BiClipboard, BiDrink, BiFoodMenu, BiMap, BiMusic, BiRun, BiX } from 'react-icons/bi';
import MapBase from '@components/Map/MapBase';
import { useRouter } from 'next/router';
import { useAppSelector } from 'src/redux/hook';
import { selectSearch } from 'src/redux/slice/searchSlice';
import { formatGuests } from 'src/utils/guestsUtil';
import { formatRangeDate } from 'src/utils/dateUntils';
import Link from 'next/link';
import CardItem, { CardItemSkeleton } from '@components/Card/CardItem';
import { Header } from '@components/layouts/common/Header';
import Footer from '@components/layouts/common/Footer';
import { getAllCategory } from 'src/utils/apis/category.api';
import { GetServerSideProps } from 'next';
import FilterNav from '@components/Filter/FilterNav';
import useTourBySearch from 'src/hooks/guest/tours/useGetTourBySearch';
import { ITours } from 'src/types/tours.type';
import {
    Box,
    Button,
    Flex,
    IconButton,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    SimpleGrid,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import Rating from '@components/Card/Rating';
import { FaPlane, FaTheaterMasks } from 'react-icons/fa';
import { BsCameraFill } from 'react-icons/bs';
interface Props {
    dataCategory: any;
}
const Search = ({ dataCategory }: Props) => {
    function renderIcon(categoryName: string, classname: string, size: number) {
        switch (categoryName) {
            case 'Thể thao':
                return <BiRun className={classname} size={size} />;
            case 'Tham quan':
                return <BsCameraFill className={classname} size={size} />;
            case 'Nghệ thuật và văn hóa':
                return <FaTheaterMasks className={classname} size={size} />;
            case 'Giải trí':
                return <BiMusic className={classname} size={size} />;
            case 'Thức ăn và đồ uống':
                return <BiDrink className={classname} size={size} />;
            case 'Tour':
                return <FaPlane className={classname} size={size} />;
            default:
                return <BiRun className={classname} size={size} />;
        }
    }
    const router = useRouter();
    const [isFullMap, setIsFullMap] = useState<boolean>(false);
    // const { location, checkIn, checkOut, guests, viewport } = useAppSelector(selectSearch);

    const getGuests = (guests: any) => {
        const totalGuests = formatGuests(guests, { noInfants: true });
        if (totalGuests) return `• ${totalGuests}`;
    };

    const [isHovered, setIsHovered] = useState<{ status: boolean; id: number | undefined }>({
        status: false,
        id: undefined,
    });
    const handleMouseEnter = (id: number) => {
        setIsHovered({ status: true, id: id });
    };

    const handleMouseLeave = () => {
        setIsHovered({ status: false, id: undefined });
    };

 
    const getDates = (startDate: any, endDate: any) => {
        const dates = formatRangeDate(startDate, endDate);
        if (dates) return `• ${dates}`;
    };
    const {
        status,
        ref,
        data: data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useTourBySearch(9);
    console.log(data);

    const getCenterMap = () => {
        // const coords = data?.pages?.map((page: any) =>
        //     page?.data?.content?.map((result: ITours) => ({
        //         latitude: result.latitude,
        //         longitude: result.longitude,
        //     })),
        // );

        const coords = searchResults.map((result) => ({
            latitude: result.lat,
            longitude: result.long,
        }));
        return getCenter(coords) || { latitude: 0, longitude: 0 };
    };
    const viewportString = router.query.viewport as string | undefined;

    return (
        <>
            <div className=" w-full   overflow-x-clip fixed top-[76px]  flex justify-center pr-10 bg-white z-10 border border-b-gray-700 py-3">
                <FilterNav dataCategory={dataCategory} />
            </div>
            <div className={`flex flex-col  ${isFullMap && 'overflow-hidden'}overflow-x-hidden `}>
                <main
                    className={`${
                        !isFullMap && 'lg:grid-cols-[700px,1fr] xl:grid-cols-[840px,1fr]'
                    } flex-grow grid grid-cols-1 duration-500 min-h-[100vh]`}
                >
                    {/* left - cards */}
                    <div className={`${isFullMap && 'hidden'} px-6 pb-8 pt-[156px] duration-500`}>
                        <Text fontSize={'14px'} fontWeight={600} my={6}>
                            {data?.pages[0].data.totalElements} trải nghiệm
                        </Text>

                        {status === 'loading' ? (
                            <SimpleGrid minChildWidth={'250px'} columnGap={'20px'} rowGap={'0px'} mt={'-40px'}>
                                <CardItemSkeleton minImgHeight="334px" />
                                <CardItemSkeleton minImgHeight="334px" />
                                <CardItemSkeleton minImgHeight="334px" />
                                <CardItemSkeleton minImgHeight="334px" />
                                <CardItemSkeleton minImgHeight="334px" />
                                <CardItemSkeleton minImgHeight="334px" />
                                <CardItemSkeleton minImgHeight="334px" />
                                <CardItemSkeleton minImgHeight="334px" />
                                <CardItemSkeleton minImgHeight="334px" />
                                <CardItemSkeleton minImgHeight="334px" />
                                <CardItemSkeleton minImgHeight="334px" />
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
                                <SimpleGrid pt={3} pb={12} minChildWidth={'250px'} columnGap={'20px'} rowGap={'80px'}>
                                    {data?.pages?.map((page: any) =>
                                        page?.data?.content?.map((result: ITours) => (
                                            // result.isDeleted === false &&
                                            <div
                                                onMouseEnter={() => handleMouseEnter(result.tourId)}
                                                onMouseLeave={() => handleMouseLeave()}
                                            >
                                                <CardItem
                                                    className="h-full max-h-[416px]"
                                                    data={result}
                                                    key={result.tourId}
                                                    minImgHeight={'334px'}
                                                />
                                            </div>
                                        )),
                                    )}
                                </SimpleGrid>
                            </>
                        )}
                        {hasNextPage && (
                            <div className="w-full justify-center flex">
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
                            </div>
                        )}
                    </div>
                    {/* right - maps */}
                    <section
                        className={`block fixed left-0 right-0 bottom-0 top-[158px] sm:block sm:sticky top-[158px] h-map flex-grow bg-teal-900 bg-opacity-10   duration-100`}
                    >
                        <MapBase
                            center={getCenterMap()}
                            viewportBbox={viewportString && JSON.parse(viewportString)}
                            className="relative top-[76px] "
                        >
                            <button
                                className="absolute  top-1 items-center hidden p-3 m-4 text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-lg sm:flex active:scale-90"
                                onClick={() => (isFullMap ? setIsFullMap(false) : setIsFullMap(true))}
                            >
                                {isFullMap ? (
                                    <>
                                        <BiChevronRight className="h-5" /> <span className="ml-2 text-sm font-semibold"> Hiển thị danh sách</span>
                                    </>
                                ) : (
                                    <BiChevronLeft className="h-5" />
                                )}
                            </button>
                            {isFetching ? (
                                <div className="loader min-w-[72px] absolute top-6 left-1/2 right-1/2  -translate-x-1/2  bg-white p-3 rounded-xl drop-shadow-xl flex space-x-3">
                                    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                                </div>
                            ) : (
                                <></>
                            )}
                            {data?.pages?.map((page: any) =>
                                page?.data?.content?.map((result: ITours) => (
                                    <Marker
                                        key={`marker-${result.tourId}`}
                                        latitude={Number(result.latitude)}
                                        longitude={Number(result.longitude)}
                                        offsetLeft={-20}
                                        offsetTop={-10}
                                        // offset={[-20, -10]}
                                        
                                    >
                                       
                                        <Popover>
                                            <PopoverTrigger>
                                                <IconButton
                                                    aria-label="item"
                                                    variant={'blackAlpha'}
                                                    rounded="full"
                                                    className='drop-shadow-xl '
                                                    bgColor={
                                                        isHovered.status === true && isHovered.id === result.tourId ? 'black ' : 'white '
                                                    }
                                                    icon={renderIcon(
                                                        result.categoryName,
                                                        `${
                                                            isHovered.status === true && isHovered.id === result.tourId
                                                                ? 'bg-black text-white z-50'
                                                                : 'bg-white text-black '
                                                        } rounded-full`,
                                                        22,
                                                    )}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent rounded={'2xl'} border={'none'} boxShadow={'dark-lg'} zIndex={500} >
                                                <Link href={`tours/${result.tourId}`}>
                                                    <PopoverBody p={0} bgColor="transparent" rounded={'3xl'}  >
                                                        <div className="relative rounded-xl  w-full h-[216px] mb-2">
                                                            <Image
                                                                src={result.imageMain}
                                                                alt={result.title}
                                                                layout="fill"
                                                                objectFit="cover"
                                                                className="rounded-t-xl "
                                                                placeholder="blur"
                                                                blurDataURL={result.imageMain}
                                                            />
                                                        </div>
                                                        <Box
                                                            bg={useColorModeValue('white', 'gray.800')}
                                                            width="full "
                                                            rounded="12px"
                                                            p={3}
                                                            cursor={'pointer'}
                                                            className="flex  flex-col justify-between h-full"
                                                        >
                                                            <div>
                                                                <Rating avgRating={result.avgRating} rating={result.rating} />

                                                                <Flex my="1" justifyContent="space-between" alignItems="center">
                                                                    <Text
                                                                        className="text-ellipsis font-semibold text-[15px] text-left h-full "
                                                                        noOfLines={2}
                                                                    >
                                                                        {result.title}
                                                                    </Text>
                                                                </Flex>
                                                            </div>

                                                            <Flex justifyContent={'flex-start'} alignItems="center">
                                                                <Box
                                                                    display={'flex'}
                                                                    justifyContent={'flex-start'}
                                                                    fontSize="xl"
                                                                    color={useColorModeValue('gray.800', 'white')}
                                                                    width="full"
                                                                >
                                                                    <Box as="span" color={'gray.600'} fontSize="md" mr={'4px'}>
                                                                        Từ
                                                                    </Box>
                                                                    <Box as="span" color={'gray.600'} fontSize="md" mr={'4px'}>
                                                                        {result.priceOnePerson?.toLocaleString('vi-VN')}₫
                                                                    </Box>
                                                                    <Box as="span" color={'gray.600'} fontSize="md">
                                                                        /người
                                                                    </Box>
                                                                </Box>
                                                            </Flex>
                                                        </Box>
                                                    </PopoverBody>
                                                </Link>
                                            </PopoverContent>
                                        </Popover>
                                    </Marker>
                                )),
                            )}
                        </MapBase>
                    </section>
                </main>
                {!isFullMap && <Footer />}
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const { data } = await getAllCategory();
    const dataCategory = data?.map((item) => ({ type: 'Button', id: item.categoryId, label: item.categoryName }));
    return {
        props: { dataCategory },
    };
};

export default Search;
Search.getLayout = function (page: ReactElement) {
    return (
        <>
            <Header />
            {page}
        </>
    );
};
