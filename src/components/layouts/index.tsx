import BlankLayout from './BlankLayout';
import HostingLayout from './HostingLayout';
import MainLayout from './MainLayout';
import MobileLayout from './MobileLayout';
import NoSearchLayout from './NoSearchLayout';

export const Layouts = {
    Main: MainLayout,
    NoSearchLayout: NoSearchLayout,
    HostingLayout: HostingLayout,
    BlankLayout: BlankLayout,
    MobileLayout:MobileLayout,
};
export type LayoutKeys = keyof typeof Layouts; // "Main" | "Admin"
