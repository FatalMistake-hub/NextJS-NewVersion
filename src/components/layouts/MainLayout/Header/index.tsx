import React, { FC, useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    ToastId,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { FaAirbnb, FaGlobe, FaMoon, FaSearch, FaSun } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Link from 'next/link';
import LoginModal from '@components/Modal/LoginModal';
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

interface HeaderProps {
    exploreNearby?: IExploreNearby[];
    searchPage?: boolean;
    query?: any;
}
export const Header: FC<HeaderProps> = ({ exploreNearby, searchPage = true, query }) => {
    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();

    const { location, checkIn, checkOut, guests } = useAppSelector(selectSearch);

    const { toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue('teal.500', 'teal.200');
    const Icon = useColorModeValue(FaMoon, FaSun);

    const [isSnapTop, setIsSnapTop] = useState<boolean>(searchPage ? false : true);
    const [isActiveSearch, setIsActiveSearch] = useState<boolean>(searchPage ? false : true);
    const [activeMenu, setActiveMenu] = useState<EHeaderOpions | null>(EHeaderOpions.PLACES_TO_STAY);

    const headerBehavior = () => {
        let style = [];
        if (!isSnapTop) style.push('bg-white shadow-lg');
        if (!isActiveSearch) style.push('bg-white shadow-lg h-[86px] pb-5');
        if (isActiveSearch) style.push('bg-white shadow-lg pb-8');
        return style.join(' ');
    };
    const { data: session } = useSession();
    return (
        <>
            <header className={`${headerBehavior()} z-50 fixed top-0 w-full pt-5 duration-300 md:transition-none`}>
                {/* header top */}
                <div
                    className={`${
                        searchPage ? 'px-10' : 'container'
                    } hidden md:grid md:grid-cols-[auto,1fr,auto] xl:grid-cols-[1.5fr,3fr,1.5fr] 2xl:grid-cols-[1fr,3fr,0.75fr] items-start`}
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
                    <button
                        className={`${isActiveSearch && ' scale-[1.33] translate-y-[75px] opacity-0 z-[-50] '} ${
                            searchPage ? 'pl-3' : 'pl-6'
                        } relative flex items-center h-12 pr-2 py-2 mx-auto text-left transform  border border-gray-200 rounded-lg  shadow-md cursor-pointer min-w-[320px] min-h-[50px] hover:shadow-lg md:absolute left-24 lg:left-auto lg:right-1/2 lg:translate-x-1/2 duration-200`}
                        onClick={() => setIsActiveSearch(true)}
                    >
                        {searchPage ? (
                            <span className="flex-grow text-sm font-medium tracking-wide text-gray-500">
                                <span className="px-4 py-1 border-r border-gay-200">
                                    {location || <span className="font-normal text-gray-300">Location</span>}
                                </span>
                                <span className="px-4 py-1 border-r border-gay-200">
                                    {formatRangeDate(checkIn, checkOut) || <span className="font-normal text-gray-300">Add dates</span>}
                                </span>
                                <span className="px-4 py-1">
                                    {formatGuests(guests, { noInfants: true }) || (
                                        <span className="font-normal text-gray-300">Add guests</span>
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
                        <div className="text-white">
                            <HeaderOption
                                isSnap={isSnapTop}
                                isActiveHeader={isActiveSearch}
                                active={activeMenu === EHeaderOpions.PLACES_TO_STAY}
                                onClick={() => setActiveMenu(EHeaderOpions.PLACES_TO_STAY)}
                            >
                                Places to stay
                            </HeaderOption>
                            <HeaderOption
                                isSnap={isSnapTop}
                                isActiveHeader={isActiveSearch}
                                active={activeMenu === EHeaderOpions.FIND_EXPERIENCES}
                                onClick={() => setActiveMenu(EHeaderOpions.FIND_EXPERIENCES)}
                            >
                                Experiences
                            </HeaderOption>
                            <HeaderOption isSnap={isSnapTop} isActiveHeader={isActiveSearch}>
                                <Link href="/">
                                    <a>Online Experiences</a>
                                </Link>
                            </HeaderOption>
                        </div>
                    </div>
                    {/* right side */}
                    {/* <HStack spacing={2}></HStack> */}
                    <div className="flex items-center justify-end min-w-[370px]">
                        <Link href="/">
                            <a
                                className={`${
                                    isSnapTop ? 'text-white hover: hover:bg-opacity-10' : 'text-gray-500 hover:bg-gray-100 '
                                } flex items-center h-10 px-4 rounded-full font-medium tracking-wide text-sm min-w-fit`}
                            >
                                Become a host
                            </a>
                        </Link>

                        {session?.user ? (
                            <Menu>
                                <MenuButton
                                    transition="all 0.2s"
                                    borderRadius="full"
                                    borderWidth="1px"
                                    _hover={{ bg: 'gray.400' }}
                                    _expanded={{ bg: 'teal.400' }}
                                    _focus={{ boxShadow: 'outline' }}
                                >
                                    <Avatar name="minhnhat" src="" size={'md'} />
                                </MenuButton>
                                <MenuList className="shadow-md" p={2}>
                                    <>
                                        <MenuItem>Tin nhắn</MenuItem>

                                        <MenuItem>Thông báo</MenuItem>
                                        <MenuItem>Chuyến đi</MenuItem>

                                        <MenuItem>Danh sách yêu thích</MenuItem>
                                        <MenuDivider />

                                        <MenuItem>Quản lý trải nghiệm</MenuItem>
                                        <MenuItem>Tài khoản</MenuItem>

                                        <MenuDivider />

                                        <MenuItem
                                            onClick={() => {
                                                signOut(), console.log('sign out');
                                            }}
                                        >
                                            Đăng xuất
                                        </MenuItem>
                                    </>
                                </MenuList>
                            </Menu>
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
