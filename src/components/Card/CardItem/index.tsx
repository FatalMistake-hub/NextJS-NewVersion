import { Flex, Circle, Box, Image, Badge, useColorModeValue, Icon, chakra, Tooltip } from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import React from 'react';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
const data = {
    isNew: true,
    imageURL:
        'https://a0.muscache.com/im/pictures/lombard/MtTemplate-1340671-media_library/original/2b6d7cbc-e9ae-48d5-96cf-9bdc1087f93b.jpg?im_w=1440',
    name: 'Wayfarer Classic',
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
        <Flex py={10} w="full" alignItems="center" justifyContent="center" flexDirection="column">
            <Box boxSize="150px" position="relative">
                {data.isNew && (
                    <Box boxSize="10px" position="absolute" top={2} right={2} bg="transparent">
                        <FaHeart />
                    </Box>
                )}
                <Image src={data.imageURL} alt={`Picture of ${data.name}`} rounded="lg" loading="lazy" objectFit="cover" boxSize={150} />
            </Box>
            <Box bg={useColorModeValue('white', 'gray.800')} maxW="sm" rounded="lg" position="relative">
                <Box>
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box fontSize="xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                            {data.name}
                        </Box>
                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">
                        <Rating rating={data.rating} numReviews={data.numReviews} />
                    </Flex>
                    <Flex justifyContent="space-between" alignContent="center">
                        <Box fontSize="xl" color={useColorModeValue('gray.800', 'white')}>
                            <Box as="span" color={'gray.600'} fontSize="lg">
                                £
                            </Box>
                            {data.price.toFixed(2)}
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
};

export default CardItem;
