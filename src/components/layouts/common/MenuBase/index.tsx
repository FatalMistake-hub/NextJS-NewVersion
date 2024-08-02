import { Avatar, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';

import { Logout } from 'src/utils/apis/auths.api';

const MenuBase = () => {
    const toast = useToast();
    const { data: session,status } = useSession();
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
                    <Link href={'/guest/inbox'} className="hover:no-underline">
                        <MenuItem w={'full'}>Tin nhắn</MenuItem>
                    </Link>
                    <Link href={'/trips'}>
                        <MenuItem>Chuyến đi</MenuItem>
                    </Link>

                    {/* <Link href={''}>
                        <MenuItem>Danh sách yêu thích</MenuItem>
                    </Link> */}
                    <MenuDivider />
                    {session?.user.role === 'OWNER' && (
                        <Link href={'/hosting'}>
                            <MenuItem>Quản lý trải nghiệm</MenuItem>
                        </Link>
                    )}
                    
                    <Link href={'/account'}>
                        <MenuItem>Tài khoản</MenuItem>
                    </Link>

                    <MenuDivider />

                    <MenuItem
                        onClick={async () => {
                            const res = await Logout();
                            if (res.status === 202) {
                                signOut({ redirect: false });
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

export default MenuBase;
