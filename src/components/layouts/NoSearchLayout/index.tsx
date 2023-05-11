import Footer from "../common/Footer";
import { Header } from "../common/Header";
import { HeaderNoSearch } from "../common/HeaderNoSearch";

const name = '[Your Name]';
export const siteTitle = 'Next.js Sample Website';

export default function NoSearchLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeaderNoSearch />
            <div className="pt-[86px] min-h-screen">{children}</div>
            <Footer />
        </>
    );
}
