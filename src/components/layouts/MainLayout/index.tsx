import Footer from '../common/Footer';
import { Header } from '../common/Header';
import { HeaderNoSearch } from '../common/HeaderNoSearch';

const name = '[Your Name]';
export const siteTitle = 'Next.js Sample Website';

export default function MainLayout({ children, isFooter = true, isHeaderNoSearch }: { children: React.ReactNode, isFooter?: boolean , isHeaderNoSearch?: boolean}) {
    return (
        <>
            {isHeaderNoSearch ? <HeaderNoSearch /> : <Header />}
            <div className="pt-[76px] min-h-screen">{children}</div>
            {isFooter && <Footer />}
        </>
    );
}
