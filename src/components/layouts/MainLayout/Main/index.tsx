import { Box, Button, Center, Flex, Heading, Image, Link, SimpleGrid, Spacer, Text, useTheme } from '@chakra-ui/react';
import CardItem from '@components/Card/CardItem';
import FilterNav from '@components/Filter/FilterNav';

import React from 'react';

const Main: React.FC = () => {
    const theme = useTheme();
    return (
        <>
            <Flex display="flex" flexDirection="column" justifyContent="center" alignItems="center" px={'80px'}>
                <div className="max-w-[1800px] w-full  mx-auto overflow-x-clip pt-10  flex">
                    <FilterNav />
                </div>
                
                <div className="w-full pt-10">
                    <Heading as="h2" size="lg" noOfLines={1}>
                        Tất cả trải nghiệm
                    </Heading>
                    <SimpleGrid minChildWidth="300px" gap="4">
                        <CardItem />
                        <CardItem />
                        <CardItem />
                        <CardItem />
                        <CardItem />
                        <CardItem />
                        <CardItem />
                    </SimpleGrid>
                </div>
                
                <Button colorScheme='black' color={'white'} p={6} className='my-8 bg-black'>Tải thêm</Button>
                
            </Flex>
        </>
    );
};
export default Main;
