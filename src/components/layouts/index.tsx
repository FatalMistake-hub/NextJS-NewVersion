import MainLayout from './MainLayout';
import NoSearchLayout from './NoSearchLayout';

export const Layouts = {
    Main: MainLayout,
    NoSearchLayout: NoSearchLayout,
};
export type LayoutKeys = keyof typeof Layouts; // "Main" | "Admin"
