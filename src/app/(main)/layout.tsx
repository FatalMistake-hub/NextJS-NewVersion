import MainLayout from '@components/layouts/MainLayout';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return <MainLayout isFooter={false}>{children}</MainLayout>;
}
