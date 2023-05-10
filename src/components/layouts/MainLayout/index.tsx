
import Footer from './Footer';
import { Header } from './Header';

const name = '[Your Name]';
export const siteTitle = 'Next.js Sample Website';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="pt-[86px] min-h-screen">{children}</div>
            <Footer />
        </>
    );
}
