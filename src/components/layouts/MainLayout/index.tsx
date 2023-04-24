
import { Header } from './Header';
import { Footer } from './Footer';
const name = '[Your Name]';
export const siteTitle = 'Next.js Sample Website';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="pt-[86px]">{children}</div>
            <Footer />
        </>
    );
}
