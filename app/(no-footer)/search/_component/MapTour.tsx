// 'use client';
import {
  Box,
  Flex,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import Rating from '@components/Card/Rating';
import MapBase from '@components/Map/MapBase';
import { getCenter } from 'geolib';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useMemo, useState } from 'react';
import { BiChevronLeft, BiChevronRight, BiDrink, BiMusic, BiRun } from 'react-icons/bi';
import { BsCameraFill } from 'react-icons/bs';
import { FaPlane, FaTheaterMasks } from 'react-icons/fa';
import { Marker } from 'react-map-gl';
import useTourBySearch from 'src/hooks/guest/tours/useGetTourBySearch';
import { ITours } from 'src/types/tours.type';
interface MapTourProps {
    isHovered: any;
    isFullMap: boolean;
    setIsFullMap: any;
}
export default function MapTour({ isHovered, isFullMap, setIsFullMap }: MapTourProps) {
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

    const searchParams = useSearchParams();
    const viewportString = searchParams.get('viewport');

    const { data: data, isFetching } = useTourBySearch(9, JSON.parse(viewportString as string));

    const getCenterMap = (data: any) => {
        const coordinates = useMemo(() => {
            const allCoordinates: { latitude: number; longitude: number }[] = [];
            data?.pages?.forEach((page: any) => {
                page?.data?.content?.forEach((result: ITours) => {
                    const { latitude, longitude } = result;
                    if (latitude && longitude) {
                        allCoordinates.push({ latitude: Number(latitude), longitude: Number(longitude) });
                    }
                });
            });
            return allCoordinates;
        }, [data]);

        return useMemo(() => {
            if (coordinates.length > 0) {
                const center = getCenter(coordinates);
                return center || { latitude: 0, longitude: 0 };
            } else {
                return { latitude: 0, longitude: 0 };
            }
        }, [coordinates]);
    };

    return (
        <section
            className={`block fixed left-0 right-0 bottom-0 top-[158px] sm:block sm:sticky top-[158px] h-map flex-grow bg-teal-900 bg-opacity-10   duration-100`}
        >
            {viewportString && (
                <MapBase center={getCenterMap(data)} viewportBbox={JSON.parse(viewportString)} className="relative top-[76px] ">
                    <button
                        className="absolute  top-1 items-center hidden p-3 m-4 text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-lg sm:flex active:scale-90"
                        // onClick={() => (isFullMap ? setIsFullMap(false) : setIsFullMap(true))}
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
                                            className="drop-shadow-xl "
                                            bgColor={isHovered.status === true && isHovered.id === result.tourId ? 'black ' : 'white '}
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
                                    <PopoverContent rounded={'2xl'} border={'none'} boxShadow={'dark-lg'} zIndex={500}>
                                        <Link href={`tours/${result.tourId}`}>
                                            <PopoverBody p={0} bgColor="transparent" rounded={'3xl'}>
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
            )}
        </section>
    );
}
