import dynamic from 'next/dynamic';
import Footer from '../common/Footer';
import { Header } from '../common/Header';
import { HeaderHosting } from '../common/HeaderHosting';
const WalletConnectionProvider = dynamic(() => import('../../../context/WalletConnectionProvider'), {
    ssr: false,
});
export default function HostingLayout({ children }: { children: React.ReactNode }) {
    return (
        <WalletConnectionProvider>
            <HeaderHosting />
            <div className="pt-[76px] min-h-screen">{children}</div>
            <Footer />
        </WalletConnectionProvider>
    );
}
