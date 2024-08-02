import MainLayout from "@components/layouts/MainLayout";

export default function NoSearchLayout({ children }: { children: React.ReactNode }) {
    return <MainLayout isHeaderNoSearch={true}>{children}</MainLayout>;
}
