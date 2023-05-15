import { Flex, Circle, Text, Box, Badge, useColorModeValue, Icon, chakra, Tooltip } from '@chakra-ui/react';
import { BsHeart, BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import React from 'react';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import Rating from '../Rating';
import { ITours } from 'src/types/tours.type';

interface CardItemProps {
    // rating: number;
    // numReviews: number;
    className?: string;
    data: ITours;
}

const CardItem: React.FC<CardItemProps> = ({ className, data }) => {
    return (
        <Link href={`/tours/${data.tourId}`} className="cursor-pointer" target="_blank">
            {/* <a target="_blank" > */}
            <Flex py={10} w="full" alignItems="self-start" justifyContent="flex-start" flexDirection="column" className={className}>
                <Box w="100%" minHeight="200px" height={'100%'} maxHeight={'405px'} position="relative">
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
                        className="rounded-xl"
                    />
                </Box>
                <Box bg={useColorModeValue('white', 'gray.800')} width="full " rounded="lg" pt="2" cursor={'pointer'}>
                    <Rating avgRating={data.avgRating} rating={data.rating}  />
                    
                    <Flex my="1" justifyContent="space-between" alignItems="center">
                        <Text className="text-ellipsis font-semibold text-[15px] text-left h-full overflow-hidden break-words">
                            {data.title}
                        </Text>
                    </Flex>

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
                                ${data.priceOnePerson}
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
    );
};

export default CardItem;
