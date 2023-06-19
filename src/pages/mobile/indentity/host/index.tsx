//scan.js

import { Alert, AlertIcon, AlertTitle, AlertDescription, useToast } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/router';
import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { QrReader } from 'react-qr-reader';
import { useTour } from 'src/hooks/blockchain/useTour';
import useAuthorizeOrder from 'src/hooks/hosting/order/useAuthorizeOrder';
import { truncate } from 'src/utils/string';

function IndentityHost() {
    const { connected, publicKey } = useWallet();
    const { tours, updateTour, initializeUser, initialized, loading, transactionPending } = useTour();
    const { authorizeOrder } = useAuthorizeOrder();
    const router = useRouter();
    const toast = useToast();
    const [status, setStatus] = useState<'loading' | 'info' | 'warning' | 'success' | 'error' | undefined>('success');

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
        console.log('runIndentity');
        return () => {};
    }, [currentEditListing, connected, router.query.orderIdBlockChain, router.query.publicKey]);

    // ...

    return (
        <div className="h-full">
            <WalletMultiButton className="phantom-button z-50 ml-2 mr-4 rounded-2xl">
                <span className="text-sm font-medium text-black">{connected ? truncate(publicKey?.toString()) : 'Connect Wallet'}</span>
            </WalletMultiButton>
            {!connected && (
                <Alert status="warning">
                    <AlertIcon />
                    Vui lòng kết nối ví để xác nhận
                </Alert>
            )}

            <div className="h-full  pt-20">
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
