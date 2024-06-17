'use client'
import React, { FC, useState } from 'react';
import { Box, Button, Stack, useColorMode, useColorModeValue, useDisclosure, useToast, Text, SkeletonCircle } from '@chakra-ui/react';
import { FaAirbnb, FaGlobe, FaMoon, FaSearch, FaSun } from 'react-icons/fa';

import Link from 'next/link';
import Search from '@components/Search';
import SignUpModal from '@components/Modal/RegisterModal';
import { IExploreNearby } from 'src/types/interface';

import { formatRangeDate } from 'src/utils/dateUntils';
import { formatGuests } from 'src/utils/guestsUtil';
import HeaderOption from './HeaderOption';
import { useAppSelector } from 'src/redux/hook';
import { selectSearch } from 'src/redux/slice/searchSlice';
import { EHeaderOpions } from 'src/utils/constants/Enums';
import { signOut, useSession } from 'next-auth/react';
import LoginModal from '@components/Modal/LoginModal';
import { Logout } from 'src/utils/apis/auths.api';
import MenuBase from '../MenuBase';
import Head from 'next/head';
import useUserLocation from 'src/hooks/map/useUserLocation';

interface HeaderProps {
    exploreNearby?: IExploreNearby[];
    searchPage?: boolean;
    query?: any;
}
export const Header: FC<HeaderProps> = ({ exploreNearby, searchPage = true, query }) => {
    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();

    useUserLocation();

    const toast = useToast();
    const { location, checkIn, checkOut, guests } = useAppSelector(selectSearch);

    const logoColor = useColorModeValue('teal.500', 'teal.200');

    const [isSnapTop, setIsSnapTop] = useState<boolean>(searchPage ? false : true);
    const [isActiveSearch, setIsActiveSearch] = useState<boolean>(searchPage ? false : true);
    const [activeMenu, setActiveMenu] = useState<EHeaderOpions | null>(EHeaderOpions.PLACES_TO_STAY);

    const headerBehavior = () => {
        let style = [];
        if (!isSnapTop) style.push('bg-white border border-b-gray-700 ');
        if (!isActiveSearch) style.push('bg-white border border-b-gray-700 h-[76px] ');
        if (isActiveSearch) style.push('bg-white border border-b-gray-700 pt-3 pb-6');
        return style.join(' ');
    };
    const { data: session, status } = useSession();
    return (
        <>
            <header className={`${headerBehavior()} z-50 fixed top-0 w-full  duration-300 md:transition-none`}>
                {/* header top */}
                <div
                    className={`${
                        searchPage ? 'px-10' : 'container'
                    } hidden h-full md:grid md:grid-cols-[auto,1fr,auto] xl:grid-cols-[1.5fr,3fr,1.5fr] 2xl:grid-cols-[1fr,3fr,0.75fr] items-center`}
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
                    {/* small search bar */}
                    <button
                        className={`${isActiveSearch && ' scale-[1.33] translate-y-[75px] opacity-0 z-[-50] '} ${
                            searchPage ? 'pl-3' : 'pl-6'
                        } relative flex items-center h-12 pr-2 py-2 mx-auto text-left transform  border border-gray-200 rounded-xl  shadow-md cursor-pointer min-w-[320px] min-h-[50px] hover:shadow-lg md:absolute left-24 lg:left-auto lg:right-1/2 lg:translate-x-1/2 duration-200`}
                        onClick={() => setIsActiveSearch(true)}
                    >
                        {searchPage ? (
                            <span className="flex-grow text-sm font-medium tracking-wide text-gray-500">
                                <span className="px-4 py-1 border-r border-gay-200">
                                    {location || <span className="font-normal text-gray-300">Địa điểm</span>}
                                </span>
                                <span className="px-4 py-1 border-r border-gay-200">
                                    {formatRangeDate(checkIn, checkOut) || <span className="font-normal text-gray-300">Thêm ngày</span>}
                                </span>
                                <span className="px-4 py-1">
                                    {formatGuests(guests, { noInfants: true }) || (
                                        <span className="font-normal text-gray-300">Thêm khách</span>
                                    )}
                                </span>
                            </span>
                        ) : (
                            <span className="flex-grow text-sm font-medium tracking-wide text-gray-500">Start your search</span>
                        )}
                        <Button
                            colorScheme="teal"
                            variant="solid"
                            type="submit"
                            rounded={'lg'}
                            size={'sm'}
                            py={4}
                            className={` flex items-center justify-center    rounded-full   hover:saturate-200`}
                        >
                            <FaSearch className="h-5 text-white" />
                        </Button>
                    </button>
                    {/* middle side navigation */}
                    <div className="relative flex flex-col items-center justify-center order-last col-span-2 xl:order-none xl:col-span-1">
                        <Text as={'h2'} fontSize={'18px'} fontWeight={500} className={`${isActiveSearch ? '' : 'hidden'} `}>
                            Hãy khám phá và trải nghiệm ngay bây giờ!
                        </Text>
                    </div>
                    {/* right side */}
                    {/* <HStack spacing={2}></HStack> */}
                    <div className="flex items-center justify-end min-w-[370px]">
                        <Link href="/become-a-host">
                            <p
                                className={`${
                                    isSnapTop ? 'text-white hover: hover:bg-opacity-10' : 'text-gray-500 hover:bg-gray-100 '
                                } flex items-center h-10 px-4 rounded-full font-medium tracking-wide text-sm min-w-fit mr-2`}
                            >
                                Đón tiếp khách
                            </p>
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
                {/* main search bar */}
                <Search
                    menu={activeMenu}
                    isActiveHeader={isActiveSearch}
                    searchPage={searchPage}
                    closeSearch={() => setIsActiveSearch(false)}
                />
            </header>
            {/* background layer */}
            {isActiveSearch && !isSnapTop && (
                <div className="fixed inset-0 z-40 bg-transparent-black" onClick={() => setIsActiveSearch(false)} />
            )}
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </>
    );
};
