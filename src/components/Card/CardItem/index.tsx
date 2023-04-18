import { Flex, Circle, Box, Badge, useColorModeValue, Icon, chakra, Tooltip } from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import React from 'react';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import Image from 'next/image';
const data = {
    isNew: true,
    imageURL: 'https://dimg04.c-ctrip.com/images/0M76g120009isqgqz2CE9_Q60.jpg_.webp',
    name: 'Bài học lướt sóng nhanh một giờ và hai giờ cho thuê ván lướt sóng',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
};

interface RatingProps {
    rating: number;
    numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
    return (
        <Box d="flex" alignItems="center">
            {Array(5)
                .fill('')
                .map((_, i) => {
                    const roundedRating = Math.round(rating * 2) / 2;
                    if (roundedRating - i >= 1) {
                        return <BsStarFill key={i} style={{ marginLeft: '1' }} color={i < rating ? 'teal.500' : 'gray.300'} />;
                    }
                    if (roundedRating - i === 0.5) {
                        return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
                    }
                    return <BsStar key={i} style={{ marginLeft: '1' }} />;
                })}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {numReviews} review{numReviews > 1 && 's'}
            </Box>
        </Box>
    );
}

const CardItem: React.FC = () => {
    return (
        <Flex py={10} w="full" alignItems="self-start" justifyContent="flex-start" flexDirection="column">
            <Box w="100%" minH="400px" position="relative">
                {data.isNew && (
                    <Box boxSize="10px" position="absolute" top={2} right={2} bg="transparent">
                        <FaHeart />
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
            <Box bg={useColorModeValue('white', 'gray.800')} width="full" rounded="lg" pt="2">
                <Flex justifyContent="space-between" alignContent="center" width="full">
                    <div className="flex items-center w-full">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-black-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Rating star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <p className="ml-1 font-medium text-gray-400 dark:text-white">4.95</p>

                        <Link href="#">
                            <p className="ml-1 text-sm font-medium text-gray-400 dark:text-white">
                                (73 reviews)
                            </p>
                        </Link>
                        <p className="ml-1 text-sm font-medium text-gray-400 dark:text-white">-</p>
                        <p className="ml-1 text-sm font-medium text-gray-400 dark:text-white">3 giờ</p>
                    </div>
                </Flex>
                <Flex mt="1" justifyContent="space-between" alignContent="center">
                    <Box fontSize="-moz-initial" fontWeight="semibold" as="h4" lineHeight="tight">
                        {data.name}
                    </Box>
                </Flex>

                <Flex justifyContent="space-between" alignContent="center">
                    <Box fontSize="xl" color={useColorModeValue('gray.800', 'white')} width="full">
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
    );
};

export default CardItem;
