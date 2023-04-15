import { Box, Center, Flex, Heading, Image, Link, SimpleGrid, Spacer, Text, useTheme } from '@chakra-ui/react';
import CardItem from '@components/Card/CardItem';
import FilterNav from '@components/Filter/FilterNav';

import React from 'react';

const Main: React.FC = () => {
    const theme = useTheme();
    return (
        <>
            <Flex display="flex" flexDirection="column" justifyContent="center" alignItems="center" pt={'86px'}>
                <div className="max-w-[1800px] w-full px-[10px] mx-auto overflow-x-clip pt-10 flex">
                    <FilterNav />
                </div>
                <Spacer />
                <div className="w-full p-10">
                    <Heading as="h2" size="lg" noOfLines={1}>
                        Tất cả trải nghiệm
                    </Heading>
                    <SimpleGrid minChildWidth="160px" spacingX={160}>
                        <CardItem />
                        <CardItem />
                        <CardItem />
                        <CardItem />
                        <CardItem />
                        <CardItem />
                        <CardItem />
                    </SimpleGrid>
                </div>
            </Flex>
        </>
    );
};
export default Main;
