import React, { FC, ReactElement, useMemo, useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import { getSearch, searchResults } from 'src/utils/data';
import Image from 'next/image';
import { BiChevronLeft, BiChevronRight, BiClipboard, BiMap } from 'react-icons/bi';
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
import { Button, SimpleGrid, Text } from '@chakra-ui/react';
interface Props {
    dataCategory: any;
}
const Search = ({ dataCategory }: Props) => {
    const router = useRouter();
    const [isFullMap, setIsFullMap] = useState<boolean>(false);
    const { location, checkIn, checkOut, guests } = useAppSelector(selectSearch);

    const getGuests = (guests: any) => {
        const totalGuests = formatGuests(guests, { noInfants: true });
        if (totalGuests) return `• ${totalGuests}`;
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
    } = useTourBySearch(10);
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
        // console.log(
        //     coords,
        //     searchResults.map((result) => ({
        //         latitude: result.lat,
        //         longitude: result.long,
        //     })),
        // );
        return getCenter(coords) || { latitude: 0, longitude: 0 };
    };
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
                                <SimpleGrid py={3} minChildWidth={'250px'} columnGap={'20px'} rowGap={'80px'}>
                                    {data?.pages?.map((page: any) =>
                                        page?.data?.content?.map((result: ITours) => (
                                            // result.isDeleted === false &&
                                            <CardItem
                                                className="h-full max-h-[416px]"
                                                data={result}
                                                key={result.tourId}
                                                minImgHeight={'334px'}
                                            />
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
                        className={`block fixed left-0 right-0 bottom-0 top-[158px] sm:block sm:sticky top-[76px] h-map flex-grow bg-teal-900 bg-opacity-10   duration-100`}
                    >
                        <MapBase center={getCenterMap()} className="relative top-[76px] ">
                            <button
                                className="absolute  top-1 items-center hidden p-3 m-4 text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-lg sm:flex active:scale-90"
                                onClick={() => (isFullMap ? setIsFullMap(false) : setIsFullMap(true))}
                            >
                                {isFullMap ? (
                                    <>
                                        <BiChevronRight className="h-5" /> <span className="ml-2 text-sm font-semibold"> list</span>
                                    </>
                                ) : (
                                    <BiChevronLeft className="h-5" />
                                )}
                            </button>
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
                                        <button className="relative">
                                            <button className="px-3 py-1 font-bold duration-300 bg-white rounded-full shadow-md cursor-pointer focus:scale-90 peer">
                                                {result.priceOnePerson}
                                            </button>
                                            <div className="absolute z-10 hidden w-48 p-3 text-left bg-white border border-gray-200 rounded-lg cursor-pointer bottom-9 peer-focus:block">
                                                <div className="relative w-full h-24 mb-2">
                                                    <Image
                                                        src={result.imageMain}
                                                        alt={result.title}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="rounded-lg"
                                                        placeholder="blur"
                                                        blurDataURL={result.imageMain}
                                                    />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-semibold">{result.title}</h2>
                                                </div>
                                            </div>
                                        </button>
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
