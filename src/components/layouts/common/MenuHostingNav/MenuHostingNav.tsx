import { Avatar, Button, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { BiChevronDown } from 'react-icons/bi';

import { Logout } from 'src/utils/apis/auths.api';

const MenuHostingNav = () => {
    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<BiChevronDown />}
                borderRadius={'3xl'}
                color="blackAlpha.700"
                variant="ghost"
                _active={{ color: 'black' }}
                _hover={{ bg: 'blackAlpha.200' }}
            >
                Khác
            </MenuButton>
            <MenuList className="shadow-md" p={2}>
                <>
                    <Link href={'/hosting/listings'}>
                        <MenuItem>Quản lý trải nghiệm</MenuItem>
                    </Link>
                    <Link href={'/hosting/reservations'}>
                        <MenuItem>Đặt trải nghiệm</MenuItem>
                    </Link>
                    <Link href={'/become-a-host'}>
                        <MenuItem>Tạo mục trải nghiệm mới</MenuItem>
                    </Link>

                    <MenuDivider />
                    <Link href={'/'}>
                        <MenuItem>Chuyển sang chế độ du lịch </MenuItem>
                    </Link>
                </>
            </MenuList>
        </Menu>
    );
};

export default MenuHostingNav;
