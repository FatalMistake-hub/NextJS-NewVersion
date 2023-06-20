import Footer from '../common/Footer';

import { HeaderNoSearch } from '../common/HeaderNoSearch';

const name = '[Your Name]';
export const siteTitle = 'Next.js Sample Website';

export default function NoSearchLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeaderNoSearch />
            <div className="pt-[76px] min-h-screen">{children}</div>
            <Footer />
        </>
    );
}
