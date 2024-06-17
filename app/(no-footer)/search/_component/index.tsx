'use client';
import { Button, SimpleGrid, Text } from '@chakra-ui/react';
import CardItem, { CardItemSkeleton } from '@components/Card/CardItem';
import FilterNav from '@components/Filter/FilterNav';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import useTourBySearch from 'src/hooks/guest/tours/useGetTourBySearch';
import { ITours } from 'src/types/tours.type';
import { formatGuests } from 'src/utils/guestsUtil';
import MapTour from './MapTour';

export default function Search() {
    const router = useRouter();
    const [isFullMap, setIsFullMap] = useState<boolean>(false);

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
    const searchParams = useSearchParams();
    const viewportString = searchParams.get('viewport');

    const {
        status,
        ref,
        data: data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useTourBySearch(9, JSON.parse(viewportString as string));

    return (
        <div className={`flex flex-col  ${isFullMap && 'overflow-hidden'}overflow-x-hidden `}>
            <main
                className={`${
                    !isFullMap && 'lg:grid-cols-[700px,1fr] xl:grid-cols-[840px,1fr]'
                } flex-grow grid grid-cols-1 duration-500 min-h-[100vh]`}
            >
                {/* left - cards */}
                <div className={`${isFullMap && 'hidden'} px-6 pb-8 pt-[90px] duration-500`}>
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
                                        <div onMouseEnter={() => handleMouseEnter(result.tourId)} onMouseLeave={() => handleMouseLeave()}>
                                            <CardItem
                                                className="h-full max-h-[416px] max-w-[250px]"
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
                <MapTour isHovered={isHovered} isFullMap={isFullMap} setIsFullMap={setIsFullMap} />
            </main>
        </div>
    );
}
