import { Flex, Circle, Text, Box, Badge, useColorModeValue, Icon, chakra, Tooltip } from '@chakra-ui/react';
import { BsHeart, BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import React from 'react';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import Rating from '../Rating';
const data = {
    isNew: true,
    imageURL:
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-1340671-media_library/original/5dcf4701-0837-42d3-ac9d-b03815a8d0be.jpg?im_w=720',
    name: 'Bài học lướt sóng nhanh một giờ và hai giờ cho thuê ván lướt sóng',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
};

interface RatingProps {
    // rating: number;
    // numReviews: number;
    className?: string;
}

const CardItem: React.FC<RatingProps> = ({ className }) => {
    return (
        <Link href={'/tours/1'} className="cursor-pointer" target="_blank">
            <a target="_blank" >
                <Flex py={10} w="full" alignItems="self-start" justifyContent="flex-start" flexDirection="column" className={className}>
                    <Box w="100%" minHeight="200px" height={'100%'} position="relative">
                        {data.isNew && (
                            <Box zIndex={1} boxSize="20px" position="absolute" top={4} right={4} bg="transparent">
                                <BsHeart className="w-5 h-5 " />
                            </Box>
                        )}

                        <Image
                            src={data.imageURL}
                            alt={`Picture of ${data.name}`}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={data.imageURL}
                            className="rounded-xl"
                        />
                    </Box>
                    <Box bg={useColorModeValue('white', 'gray.800')} width="full " rounded="lg" pt="2" cursor={'pointer'}>
                        <Rating />
                        <Flex my="1" justifyContent="space-between" alignItems="center">
                            <Text className="text-ellipsis font-semibold text-[15px] text-left h-11 overflow-hidden break-words">
                                {data.name}
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
                                    ${data.price.toFixed(2)}
                                </Box>
                                <Box as="span" color={'gray.600'} fontSize="md">
                                    /người
                                </Box>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
            </a>
        </Link>
    );
};

export default CardItem;
