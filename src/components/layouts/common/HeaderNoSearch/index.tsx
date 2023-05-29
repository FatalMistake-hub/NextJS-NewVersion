import React, { FC, useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    SkeletonCircle,
    Stack,
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

interface HeaderNoSearchProps {
    exploreNearby?: IExploreNearby[];
    searchPage?: boolean;
    query?: any;
}
export const HeaderNoSearch: FC<HeaderNoSearchProps> = ({ exploreNearby, searchPage = true, query }) => {
    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();

    const logoColor = useColorModeValue('teal.500', 'teal.200');

    const [isSnapTop, setIsSnapTop] = useState<boolean>(searchPage ? false : true);
    const [isActiveSearch, setIsActiveSearch] = useState<boolean>(searchPage ? false : true);

    const headerBehavior = () => {
        let style = [];
        if (!isSnapTop) style.push('bg-white shadow-lg');
        if (!isActiveSearch) style.push('bg-white shadow-lg h-[86px] pb-5');
        if (isActiveSearch) style.push('bg-white shadow-lg pb-8');
        return style.join(' ');
    };
    const { data: session, status } = useSession();
    return (
        <>
            <header className={`${headerBehavior()} z-50 fixed top-0 w-full pt-5 duration-300 md:transition-none`}>
                {/* header top */}
                <div
                    className={`${
                        searchPage ? 'px-10' : 'container'
                    } hidden md:grid md:grid-cols-[auto,auto] xl:grid-cols-[1.5fr,1.5fr] 2xl:grid-cols-[1fr,0.75fr] items-start`}
                >
                    {/* left side - logo */}
                    <div className="flex items-center h-12">
                        <Link href="/">
                            <Box color={logoColor}>
                                <Link href={'/'}>
                                    <FaAirbnb size={'48'} />
                                </Link>
                            </Box>
                        </Link>
                    </div>
                    {/* small search bar */}

                    {/* right side */}
                    {/* <HStack spacing={2}></HStack> */}
                    <div className="flex items-center justify-end min-w-[370px]">
                        <Link href="/become-a-host">
                            <a
                                className={`${
                                    isSnapTop ? 'text-white hover: hover:bg-opacity-10' : 'text-gray-500 hover:bg-gray-100 '
                                } flex items-center h-10 px-4 rounded-full font-medium tracking-wide text-sm min-w-fit mr-2`}
                            >
                                Đón tiếp khách
                            </a>
                        </Link>

                        {session?.user ? (
                            <MenuBase />
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
