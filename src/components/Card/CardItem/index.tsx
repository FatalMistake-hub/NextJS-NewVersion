import { Flex, Text, Box, useColorModeValue, Skeleton, SkeletonText } from '@chakra-ui/react';
import { BsHeart } from 'react-icons/bs';

import React from 'react';
import Link from 'next/link';

import Image from 'next/image';
import Rating from '../Rating';
import { ITours } from 'src/types/tours.type';

interface CardItemProps {
    // rating: number;
    // numReviews: number;
    className?: string;
    data: ITours;
    minImgHeight?: string;
}

const CardItem: React.FC<CardItemProps> = ({ className, data, minImgHeight = '405px' }) => {
    return (
        <>
            {!data.isDeleted && (
                <Link href={`/tours/${data.tourId}`} className="cursor-pointer  " target="_blank">
                    {/* <a target="_blank" > */}
                    <Flex
                        w="full"
                        alignItems="self-start"
                        justifyContent="flex-start"
                        flexDirection="column"
                        className={`${className} rounded-xl hover:-translate-y-3 hover:shadow-3xl transition-all duration-300 ease-in-out  `}
                    >
                        <Box w="100%" maxH={'405px'} h="full" minHeight={minImgHeight} position="relative">
                            {true && (
                                <Box zIndex={1} boxSize="20px" position="absolute" top={4} right={4} bg="transparent">
                                    <BsHeart className="w-5 h-5 " />
                                </Box>
                            )}

                            <Image
                                src={data.imageMain}
                                alt={`Picture of ${data.title}`}
                                layout="fill"
                                objectFit="cover"
                                placeholder="blur"
                                blurDataURL={data.imageMain}
                                className="rounded-t-xl"
                            />
                        </Box>
                        <Box
                            bg={useColorModeValue('white', 'gray.800')}
                            width="full "
                            rounded="lg"
                            p={3}
                            cursor={'pointer'}
                            className="flex flex-col justify-between h-full"
                        >
                            <div>
                                <Rating avgRating={data.avgRating} rating={data.rating} />

                                <Flex my="1" justifyContent="space-between" alignItems="center">
                                    <Text className="text-ellipsis font-semibold text-[15px] text-left h-full " noOfLines={2}>
                                        {data.title}
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
                                        {data.priceOnePerson?.toLocaleString('vi-VN')}₫
                                    </Box>
                                    <Box as="span" color={'gray.600'} fontSize="md">
                                        /người
                                    </Box>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                    {/* </a> */}
                </Link>
            )}
        </>
    );
};
export const CardItemSkeleton = ({ minImgHeight = '405px' }) => {
    return (
        <>
            {/*  */}
            <Box py={12} w="full" alignItems="self-start" justifyContent="flex-start" flexDirection="column" h={'fit-content'}>
                <Skeleton
                    w="100%"
                    minHeight={minImgHeight}
                    height={'100%'}
                    maxHeight={'405px'}
                    position="relative"
                    rounded={'xl'}
                ></Skeleton>
                <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="3" />
            </Box>
        </>
    );
};
export default CardItem;
