import BlankLayout from './BlankLayout';
import HostingLayout from './HostingLayout';
import MainLayout from './MainLayout';
import NoSearchLayout from './NoSearchLayout';

export const Layouts = {
    Main: MainLayout,
    NoSearchLayout: NoSearchLayout,
    HostingLayout: HostingLayout,
    BlankLayout: BlankLayout,
};
export type LayoutKeys = keyof typeof Layouts; // "Main" | "Admin"
