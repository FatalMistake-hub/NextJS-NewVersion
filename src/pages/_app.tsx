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
import Head from 'next/head';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorNotify from '@components/Error';

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
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // staleTime: Infinity,
                        refetchOnWindowFocus: false,
                        retry: 2,
                    },
                    mutations: {},
                },
            }),
    );
    // const getLayout = Component.getLayout ?? ((page) => page);
    const SessionProps = pageProps as { session: Session };
    const renderWithLayout =
        Component.getLayout ||
        function (page) {
            return (
                <ErrorBoundary
                    FallbackComponent={ErrorNotify}
                    onError={(error, info) => {
                        console.log(error, info);
                    }}
                >
                    <Layout>
                        {' '}
                        <Head>
                            <head data-locator-hook-status-message="No valid renderers found." />
                            <meta charSet="UTF-8" />
                            <link rel="icon" href="/pwa/favicon.ico" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <link rel="apple-touch-icon" sizes="57x57" href="/pwa/apple-icon-57x57.png" />
                            <link rel="apple-touch-icon" sizes="60x60" href="/pwa/apple-icon-60x60.png" />
                            <link rel="apple-touch-icon" sizes="72x72" href="/pwa/apple-icon-72x72.png" />
                            <link rel="apple-touch-icon" sizes="76x76" href="/pwa/apple-icon-76x76.png" />
                            <link rel="apple-touch-icon" sizes="114x114" href="/pwa/apple-icon-114x114.png" />
                            <link rel="apple-touch-icon" sizes="120x120" href="/pwa/apple-icon-120x120.png" />
                            <link rel="apple-touch-icon" sizes="144x144" href="/pwa/apple-icon-144x144.png" />
                            <link rel="apple-touch-icon" sizes="152x152" href="/pwa/apple-icon-152x152.png" />
                            <link rel="apple-touch-icon" sizes="180x180" href="/pwa/apple-icon-180x180.png" />
                            <link rel="icon" type="image/png" sizes="192x192" href="/pwa/android-icon-192x192.png" />
                            <link rel="icon" type="image/png" sizes="32x32" href="/pwa/favicon-32x32.png" />
                            <link rel="icon" type="image/png" sizes="96x96" href="/pwa/favicon-96x96.png" />
                            <link rel="icon" type="image/png" sizes="16x16" href="/pwa/favicon-16x16.png" />
                            <meta name="msapplication-TileColor" content="#ffffff" />
                            <meta name="msapplication-TileImage" content="pwa/ms-icon-144x144.png" />
                            <meta name="theme-color" content="#0F172A" />
                            <meta name="description" content="Cùng đặt và trải nghiệm tour tại ExpTravel" />
                            <title>Du lịch & trải nghiệm</title>
                            <link
                                rel="icon"
                                type="image/png"
                                href="https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686421474/logo-search_eo6gdq.png"
                            />
                            <link rel="modulepreload" href="/assets/vendor.b3b38b8f.js" />
                        </Head>
                        {page}
                    </Layout>
                </ErrorBoundary>
            );
        };

    return (
        <SessionProvider>
            <ChakraProvider theme={theme}>
                <ContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <ReduxProvider store={store}>
                            <PersistGate loading={null} persistor={persistor}>
                                {Component.requireAuth ? (
                                    <ProtectedLayout>{renderWithLayout(<Component {...pageProps} />)}</ProtectedLayout>
                                ) : (
                                    renderWithLayout(<Component {...pageProps} />)
                                )}
                                <ReactQueryDevtools />
                            </PersistGate>
                        </ReduxProvider>
                    </QueryClientProvider>
                </ContextProvider>
            </ChakraProvider>
        </SessionProvider>
    );
}

export default MyApp;
