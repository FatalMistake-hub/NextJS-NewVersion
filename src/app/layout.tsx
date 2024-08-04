import Providers from '@components/Provider';
import MainLayout from '@components/layouts/MainLayout';
import '@styles/global.scss';
import '@styles/cardSwiper.scss';
import '@styles/reactDateRange.scss';
import '@styles/style.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { fonts } from './font';
export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={fonts.rubik.variable}>
            <body>
                <main>
                    <Providers>
                        {children}
                    </Providers>
                </main>
            </body>
        </html>
    );
}