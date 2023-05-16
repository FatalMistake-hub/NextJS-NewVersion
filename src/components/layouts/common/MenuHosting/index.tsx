import { Avatar, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';

import { Logout } from 'src/utils/apis/auths.api';

const MenuHosting = () => {
    const toast = useToast();
    const { data: session } = useSession();
    return (
        <Menu>
            <MenuButton
                transition="all 0.2s"
                borderRadius="full"
                borderWidth="1px"
                _hover={{ bg: 'gray.400' }}
                _expanded={{ bg: 'teal.400' }}
                _focus={{ boxShadow: 'outline' }}
            >
                <Avatar name={session?.user.username} src="https://bit.ly/broken-link" size={'md'} />
            </MenuButton>
            <MenuList className="shadow-md" p={2}>
                <>
                    <Link href={'/account'}>
                        <MenuItem>Tài khoản</MenuItem>
                    </Link>

                    <MenuDivider />
                    <Link href={'/'}>
                        <MenuItem>Chuyển sang chế độ du lịch </MenuItem>
                    </Link>
                    <MenuItem
                        onClick={async () => {
                            const res = await Logout();
                            if (res.status === 202) {
                                signOut();
                            } else {
                                toast({
                                    title: 'Lỗi.',
                                    description: 'Đăng xuất thất bại',
                                    status: 'error',
                                    duration: 9000,
                                    isClosable: true,
                                });
                            }
                        }}
                    >
                        Đăng xuất
                    </MenuItem>
                </>
            </MenuList>
        </Menu>
    );
};

export default MenuHosting;
