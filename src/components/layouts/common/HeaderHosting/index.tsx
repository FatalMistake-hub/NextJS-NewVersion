import React, { FC, useEffect, useState } from 'react';
import {
    Box,
    Button,
    SkeletonCircle,
    Stack,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    transition,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { FaAirbnb } from 'react-icons/fa';

import Link from 'next/link';
import SignUpModal from '@components/Modal/RegisterModal';
import { IExploreNearby } from 'src/types/interface';

import { signOut, useSession } from 'next-auth/react';
import LoginModal from '@components/Modal/LoginModal';
import MenuBase from '../MenuBase';
import MenuHosting from '../MenuHosting';
import MenuHostingNav from '../MenuHostingNav/MenuHostingNav';
import { useRouter } from 'next/navigation';
import { useErrorBoundary } from 'react-error-boundary';

interface HeaderHostingProps {
    exploreNearby?: IExploreNearby[];
    searchPage?: boolean;
    query?: any;
}
export const HeaderHosting: FC<HeaderHostingProps> = ({ exploreNearby, searchPage = true, query }) => {
    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();

    const logoColor = useColorModeValue('teal.500', 'teal.200');

    const [isSnapTop, setIsSnapTop] = useState<boolean>(searchPage ? false : true);
    const [isActiveSearch, setIsActiveSearch] = useState<boolean>(searchPage ? false : true);

    const headerBehavior = () => {
        let style = [];
        if (!isSnapTop) style.push('bg-white border border-b-gray-700 ');
        if (!isActiveSearch) style.push('bg-white border border-b-gray-700  h-[76px] ');
        if (isActiveSearch) style.push('bg-white border border-b-gray-700 ');
        return style.join(' ');
    };
    const { data: session, status } = useSession();
    const router = useRouter();
    const handleRouter = (path: string) => {
        switch (path) {
            case '/hosting':
                return 0;
            case '/hosting/inbox':
                return 1;
            case `/hosting/calendar/[id]`:
                return 2;
            case `/hosting/calendar-router`:
                return 2;
            case '/hosting/performance':
                return 3;
            case '/hosting/listings':
                return 4;
            case '/hosting/reservations':
                return 5;
            case '/become-a-host':
                return 0;
            default:
                return 0;
        }
    };
    return (
        <>
            <header className={`${headerBehavior()} z-10 fixed top-0 w-full duration-300 md:transition-none`}>
                {/* header top */}
                <div
                    className={`${
                        searchPage ? 'px-10' : 'container'
                    } hidden h-full md:grid md:grid-cols-[auto,1fr,auto] xl:grid-cols-[0.75fr,3fr,1fr] 2xl:grid-cols-[0.75fr,3fr,0.75fr] items-center`}
                >
                    {/* left side - logo */}
                    <div className="flex items-center h-12">
                        <Link href="/">
                            {/* <a> */}
                                <Box color={logoColor}>
                                    <img
                                        src="https://res.cloudinary.com/sacchidananad-utech/image/upload/v1687368934/na-letter-resolution-logo-color-on-transparent-background_uhm42s.png"
                                        alt="logo"
                                        className="h-12"
                                    />
                                </Box>
                            {/* </a> */}
                        </Link>
                    </div>
                    {/*  bar */}
                    <div className="justify-center flex w-full">
                        <Tabs variant="unstyled" position="relative" defaultIndex={handleRouter(router.pathname)}>
                            <TabList>
                                <Link href={'/hosting'}>
                                    <Tab
                                        _hover={{
                                            bg: 'blackAlpha.200',
                                        }}
                                        _selected={{
                                            color: 'black',
                                            // borderBottom: '3px solid black',
                                            _before: {
                                                width: '18px',
                                                height: '2px',
                                                bg: 'black',
                                                left: '50%',
                                                content: '""',
                                                position: 'absolute',
                                                bottom: '0px',
                                                marginLeft: '-9px',
                                                transform: 'scaleX(1)',
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                        }}
                                        className="rounded-3xl "
                                        position={'relative'}
                                        color={'blackAlpha.700'}
                                    >
                                        Hôm nay
                                    </Tab>
                                </Link>
                                <Link href={'/hosting/inbox'}>
                                    <Tab
                                        _hover={{
                                            bg: 'blackAlpha.200',
                                        }}
                                        _selected={{
                                            color: 'black',
                                            // borderBottom: '3px solid black',
                                            _before: {
                                                width: '18px',
                                                height: '2px',
                                                bg: 'black',
                                                left: '50%',
                                                content: '""',
                                                position: 'absolute',
                                                bottom: '0px',
                                                marginLeft: '-9px',
                                                transform: 'scaleX(1)',
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                        }}
                                        className="rounded-3xl "
                                        position={'relative'}
                                        color={'blackAlpha.700'}
                                    >
                                        Hộp thư đến
                                    </Tab>
                                </Link>
                                <Link href={'/hosting/calendar-router'}>
                                    <Tab
                                        _hover={{
                                            bg: 'blackAlpha.200',
                                        }}
                                        _selected={{
                                            color: 'black',
                                            // borderBottom: '3px solid black',
                                            _before: {
                                                width: '18px',
                                                height: '2px',
                                                bg: 'black',
                                                left: '50%',
                                                content: '""',
                                                position: 'absolute',
                                                bottom: '0px',
                                                marginLeft: '-9px',
                                                transform: 'scaleX(1)',
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                        }}
                                        className="rounded-3xl "
                                        position={'relative'}
                                        color={'blackAlpha.700'}
                                    >
                                        Lịch
                                    </Tab>
                                </Link>
                                <Link href={'/hosting/performance'}>
                                    <Tab
                                        _hover={{
                                            bg: 'blackAlpha.200',
                                        }}
                                        _selected={{
                                            color: 'black',
                                            // borderBottom: '3px solid black',
                                            _before: {
                                                width: '18px',
                                                height: '2px',
                                                bg: 'black',
                                                left: '50%',
                                                content: '""',
                                                position: 'absolute',
                                                bottom: '0px',
                                                marginLeft: '-9px',
                                                transform: 'scaleX(1)',
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                        }}
                                        className="rounded-3xl "
                                        position={'relative'}
                                        color={'blackAlpha.700'}
                                    >
                                        Thông tin phân tích
                                    </Tab>
                                </Link>

                                <Link href={'/hosting/listings'}>
                                    <Tab
                                        _hover={{
                                            bg: 'blackAlpha.200',
                                        }}
                                        _selected={{
                                            color: 'black',
                                            // borderBottom: '3px solid black',
                                            _before: {
                                                width: '18px',
                                                height: '2px',
                                                bg: 'black',
                                                left: '50%',
                                                content: '""',
                                                position: 'absolute',
                                                bottom: '0px',
                                                marginLeft: '-9px',
                                                transform: 'scaleX(1)',
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                        }}
                                        className="rounded-3xl "
                                        position={'relative'}
                                        color={'blackAlpha.700'}
                                    >
                                        Quản lý trải nghiệm
                                    </Tab>
                                </Link>
                                <Link href={'/hosting/reservations'}>
                                    <Tab
                                        _hover={{
                                            bg: 'blackAlpha.200',
                                        }}
                                        _selected={{
                                            color: 'black',
                                            // borderBottom: '3px solid black',
                                            _before: {
                                                width: '18px',
                                                height: '2px',
                                                bg: 'black',
                                                left: '50%',
                                                content: '""',
                                                position: 'absolute',
                                                bottom: '0px',
                                                marginLeft: '-9px',
                                                transform: 'scaleX(1)',
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                        }}
                                        className="rounded-3xl "
                                        position={'relative'}
                                        color={'blackAlpha.700'}
                                    >
                                        Đặt trải nghiệm
                                    </Tab>
                                </Link>
                                <Link href={'/become-a-host'}>
                                    <Tab
                                        _hover={{
                                            bg: 'blackAlpha.200',
                                        }}
                                        _selected={{
                                            color: 'black',
                                            // borderBottom: '3px solid black',
                                            _before: {
                                                width: '18px',
                                                height: '2px',
                                                bg: 'black',
                                                left: '50%',
                                                content: '""',
                                                position: 'absolute',
                                                bottom: '0px',
                                                marginLeft: '-9px',
                                                transform: 'scaleX(1)',
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                        }}
                                        className="rounded-3xl "
                                        position={'relative'}
                                        color={'blackAlpha.700'}
                                    >
                                        Tạo mục trải nghiệm mới
                                    </Tab>
                                </Link>

                                {/* <MenuHostingNav /> */}
                            </TabList>
                        </Tabs>
                    </div>
                    {/* right side */}
                    {/* <HStack spacing={2}></HStack> */}
                    <div className="flex items-center justify-end min-w-[370px]">
                        {session?.user ? (
                            <MenuHosting />
                        ) : status === 'loading' ? (
                            <SkeletonCircle size="12" />
                        ) : (
                            <Stack direction="row" spacing={4} align="center">
                                <Button colorScheme="teal" variant="solid" onClick={onLoginOpen}>
                                    Đăng nhập
                                </Button>
                                <Button colorScheme="teal" variant="outline" onClick={onSignUpOpen}>
                                    Đăng ký
                                </Button>
                            </Stack>
                        )}
                    </div>
                </div>
            </header>

            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </>
    );
};
