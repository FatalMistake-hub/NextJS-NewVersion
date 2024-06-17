import Footer from '../common/Footer';
import { Header } from '../common/Header';

const name = '[Your Name]';
export const siteTitle = 'Next.js Sample Website';

export default function MainLayout({ children, isFooter = true }: { children: React.ReactNode, isFooter?: boolean }) {
    return (
        <>
            <Header />
            <div className="pt-[76px] min-h-screen">{children}</div>
            {isFooter && <Footer />}
        </>
    );
}
