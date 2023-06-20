//scan.js

import { Alert, AlertIcon, Text,AlertTitle, AlertDescription,Avatar, useToast, Heading } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useTour } from 'src/hooks/blockchain/useTour';
import useAuthorizeOrder from 'src/hooks/hosting/order/useAuthorizeOrder';
import { truncate } from 'src/utils/string';

function IndentityHost() {
    const { connected, publicKey } = useWallet();
    const { tours, updateTour, initializeUser, initialized, loading, transactionPending } = useTour();
    const { authorizeOrder } = useAuthorizeOrder();
    const router = useRouter();
    const toast = useToast();
    const { data: session } = useSession();
    const [status, setStatus] = useState<'loading' | 'info' | 'warning' | 'success' | 'error' | undefined>('info');

    const currentEditListing = useMemo(
        () =>
            tours.find(
                (listing: any) =>
                    listing.publicKey.toString() === router.query.orderIdBlockChain &&
                    listing.account.authority.toString() === router.query.publicKey?.toString(),
            ),

        [router.query.orderIdBlockChain, router.query.publicKey?.toString(), tours],
    );

    const handleChangeStatusOrder = useCallback(
        async (tourIdx: number, tourPda: string, authority: string) => {
            try {
                await updateTour({ tourIdx: tourIdx, tourPda: tourPda });
                await authorizeOrder({ orderIdBlockChain: tourPda, publicKey: authority });
                setStatus('success');
                setTimeout(() => {}, 10000);
            } catch (error) {
                toast({
                    title: 'Xác nhận đơn hàng thất bại',
                    description: 'Hệ thống lỗi, vui lòng thử lại sau',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
            }
        },
        [connected, toast, updateTour, authorizeOrder],
    );
    // console.log('currentEditListing', currentEditListing);
    // console.log('idx', currentEditListing?.account.idx);
    // console.log('router', router.query.orderIdBlockChain?.toString(), router.query.publicKey?.toString());
    useEffect(() => {
        if (session?.user.accountAuthorize === publicKey?.toString() && connected) {
            
            if (
                currentEditListing?.account.idx &&
                connected &&
                router.query.orderIdBlockChain?.toString() &&
                router.query.publicKey?.toString()
            ) {
                console.log('runIndentity');
                if (currentEditListing.account.statusOrder === 'SUCCESS') {
                    setStatus('loading');
                    handleChangeStatusOrder(
                        currentEditListing?.account.idx,
                        router.query.orderIdBlockChain?.toString(),
                        router.query.publicKey?.toString(),
                    );
                } else {
                    setStatus((prev) => {
                        if (prev === 'success') {
                            return prev;
                        } else {
                            return 'error';
                        }
                    });
                }
            } else {
                setStatus('warning');
            }
        } else {
            toast({
                title: 'Sử dụng không đúng ví',
                status: 'warning',
                duration: 8000,
                isClosable: true,
                position: 'top',
            });
        }



        return () => {};
    }, [currentEditListing, connected, router.query.orderIdBlockChain, router.query.publicKey, publicKey, session?.user.accountAuthorize]);

    // ...

    return (
        <div className="max-h-screen">
            <div className="p-2 flex w-full justify-between">
                <div className="flex flex-col">
                    <Heading lineHeight={1.4} as="h1" fontSize={'22px'} fontWeight={'600'} noOfLines={2}>
                        Xác thực trải nghiệm
                    </Heading>
                    <Text fontSize={'14px'} fontWeight={'400'} color={'gray.500'}>
                        Người xác thực: {session?.user.username}
                    </Text>
                </div>
                <Avatar name={session?.user.username} src={'https://bit.ly/broken-link'} />
            </div>
            <Text fontSize={'14px'} fontWeight={'500'} color={'gray.500'} className="p-2 my-2">
                Ví xác thực:
            </Text>
            <div className="border border-gray-600 py-1 px-4 rounded-2xl shadow-lg">
                <WalletMultiButton className="phantom-button z-50 ml-2  my-4 rounded-2xl">
                    <span className="text-sm font-medium text-black">{connected ? truncate(publicKey?.toString()) : 'Hãy kết nối ví'}</span>
                </WalletMultiButton>
                {!connected && (
                    <Alert status="warning" size={'sm'} rounded={'xl'} mb={'2'}>
                        <AlertIcon />
                        Vui lòng kết nối ví để xác nhận
                    </Alert>
                )}
            </div>

            <div className="h-full  pt-10">
                <Alert
                    status={status}
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                    rounded={'xl'}
                    className="drop-shadow-2xl"
                >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                        {status === 'error'
                            ? 'Mã xác nhận không hợp lệ'
                            : status === 'success'
                            ? 'Mã xác nhận hợp lệ'
                            : status === 'info'
                            ? 'Chuẩn bị xác  thực mã'
                            : status === 'warning'
                            ? 'Không tìm thấy mã xác nhận'
                            : 'Đang xác nhận mã'}
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                        {status === 'error'
                            ? 'Mã xác nhận đã được sử dụng'
                            : status === 'success'
                            ? 'Mã đã được xác nhận'
                            : status === 'info'
                            ? ''
                            : status === 'warning'
                            ? 'Vui lòng kiểm tra lại mã xác nhận'
                            : 'Hệ thống đang tiến hành xác nhận mã'}
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}

export default IndentityHost;
IndentityHost.Layout = 'MobileLayout';
IndentityHost.requireAuth = true;
// const [data, setData] = useState('No result');

/* <div className="rounded-md drop-shadow-sm">
    <QrReader
        onResult={(result: any, error) => {
            if (!!result) {
                setData(result?.text);
            }

            if (!!error) {
                console.info(error);
            }
        }}
        //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will
        // open the front camera
        constraints={{ facingMode: 'environment' }}
        // style={{ width: '100%' }}
        className="w-full h-full  p-4 rounded-md drop-shadow-sm"
    />
    <p>{data}</p>
</div>; */
