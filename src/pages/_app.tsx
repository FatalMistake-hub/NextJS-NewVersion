import '@styles/global.scss';
import '@styles/cardSwiper.scss';
import '@styles/reactDateRange.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { type DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from 'src/context/store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import theme from '@definitions/chakra/theme';
import { useState, ReactElement, ReactNode, Component } from 'react';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import { persistor, store } from 'src/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { PersistGate } from 'redux-persist/integration/react';
import MainLayout from '@components/layouts/MainLayout';
import { NextPage } from 'next';
import { Session } from 'next-auth';
import { ProtectedLayout } from '@components/layouts/ProtectedLayouts';
import { LayoutKeys, Layouts } from '@components/layouts';


const progressBar = new ProgressBar({
    size: 2,
    color: '#00b0b3',
    className: 'z-50',
    // delay: 100,
});

Router.events.on('routeChangeStart', progressBar.start);
Router.events.on('routeChangeComplete', progressBar.finish);
Router.events.on('routeChangeError', progressBar.finish);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
    requireAuth?: boolean;
    Layout?: LayoutKeys;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout & { Layout: LayoutKeys };
    session?: Session;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const Layout = Layouts[Component.Layout] || MainLayout;
    const [queryClient] = useState(() => new QueryClient());
    // const getLayout = Component.getLayout ?? ((page) => page);
    const SessionProps = pageProps as { session: Session };
    const renderWithLayout =
        Component.getLayout ||
        function (page) {
            return <Layout>{page}</Layout>;
        };

    return (
        <SessionProvider>
            <ChakraProvider theme={theme}>
                <ContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <ReduxProvider store={store}>
                            <PersistGate loading={null} persistor={persistor}>
                                {/* <Hydrate state={pageProps.dehydratedState}> */}
                                {Component.requireAuth ? (
                                    <ProtectedLayout>{renderWithLayout(<Component {...pageProps} />)}</ProtectedLayout>
                                ) : (
                                    renderWithLayout(<Component {...pageProps} />)
                                )}
                                <ReactQueryDevtools />
                                {/* </Hydrate> */}
                            </PersistGate>
                        </ReduxProvider>
                    </QueryClientProvider>
                </ContextProvider>
            </ChakraProvider>
        </SessionProvider>
    );
}

export default MyApp;
