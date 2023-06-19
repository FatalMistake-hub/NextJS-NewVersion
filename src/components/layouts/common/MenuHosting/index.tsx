import { Avatar, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Logout } from 'src/utils/apis/auths.api';
import { useTour } from 'src/hooks/blockchain/useTour';
import { BiUserCircle } from 'react-icons/bi';
import { useWallet } from '@solana/wallet-adapter-react';
import { truncate } from 'src/utils/string';
require('@solana/wallet-adapter-react-ui/styles.css');
const MenuHosting = () => {
    const toast = useToast();
    const { data: session } = useSession();
    const { initializeUser, transactionPending, initialized } = useTour();
    const { connected, publicKey } = useWallet();
    
    return (
        <div className="flex w-fit">
            {/* {initialized ? (
                <></>
            ) : (
                <button
                    type="button"
                    className="border border-transparent cursor-pointer hover:bg-gray-100 rounded-full px-3 py-2"
                    onClick={() => initializeUser()}
                    disabled={transactionPending}
                >
                    Initialize
                </button>
            )} */}
            <WalletMultiButton className="phantom-button z-50 ml-2 mr-4 rounded-2xl">
                <span className="text-sm font-medium text-black">{connected ? truncate(publicKey?.toString()) : 'Kết nối ví của bạn'}</span>
            </WalletMultiButton>
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
        </div>
    );
};

export default MenuHosting;
