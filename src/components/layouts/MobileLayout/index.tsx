import dynamic from 'next/dynamic';

const WalletConnectionProvider = dynamic(() => import('../../../context/WalletConnectionProvider'), {
    ssr: false,
});
const MobileLayout = ({ children }: any): JSX.Element => {
    return (
        <WalletConnectionProvider>
            <div className="max-w-sm  min-h-screen  bg-white px-4 py-6 text-black  mx-auto mb-5  flex-col h-screen w-full items-center justify-center ">
                {children}
            </div>
        </WalletConnectionProvider>
    );
};

export default MobileLayout;
