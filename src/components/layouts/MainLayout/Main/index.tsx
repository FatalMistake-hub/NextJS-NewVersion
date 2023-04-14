import { Box, Center, Flex, Heading, Image, Link, SimpleGrid, Spacer, Text, useTheme } from '@chakra-ui/react';
import CardItem from '@components/Card/CardItem';
import FilterNav from '@components/Filter/FilterNav';

import React from 'react';

const Main: React.FC = () => {
    const theme = useTheme();
    return (
        <>
            <Flex textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center" pt={'86px'}>
                <Center
                    backgroundColor="white"
                    flexDirection="column"
                    display="flex"
                    textAlign="left"
                    width="full"
                    padding={5}
                    borderRadius={10}
                    mb={10}
                    mt={7}
                >
                    <div className='w-full px-10'><FilterNav /></div>
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
                </Center>
            </Flex>
        </>
    );
};
export default Main;
