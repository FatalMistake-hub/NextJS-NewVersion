import HostingLayout from './HostingLayout';
import MainLayout from './MainLayout';
import NoSearchLayout from './NoSearchLayout';

export const Layouts = {
    Main: MainLayout,
    NoSearchLayout: NoSearchLayout,
    HostingLayout: HostingLayout,
};
export type LayoutKeys = keyof typeof Layouts; // "Main" | "Admin"
