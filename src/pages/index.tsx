import { Flex, Spacer } from '@chakra-ui/react';


import MainLayout from '@components/layouts/MainLayout';
import Main from '@components/layouts/MainLayout/Main';
import React from 'react';

const Home: React.FC = () => {
    return (
        <Flex direction="column" minH="100vh">
            <MainLayout>
                <Main />
            </MainLayout>
        </Flex>
    );
};

export default Home;
