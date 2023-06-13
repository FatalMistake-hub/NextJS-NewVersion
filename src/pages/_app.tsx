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
                            <title>Du lịch & trải nghiệm</title>
                            <meta name="description" content="" />
                            <meta property="og:type" content="website" />
                            <meta name="og:title" property="og:title" content="" />
                            <meta name="og:description" property="og:description" content="" />
                            <meta property="og:site_name" content="" />
                            <meta property="og:url" content="" />
                            <meta name="twitter:card" content="summary" />
                            <meta name="twitter:title" content="" />
                            <meta name="twitter:description" content="hello" />
                            <meta name="twitter:site" content="" />
                            <meta name="twitter:creator" content="" />
                            <link
                                rel="icon"
                                type="image/png"
                                href="https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686421474/logo-search_eo6gdq.png"
                            />
                            <link rel="apple-touch-icon" href="@public/assets/image/logo-search.png" />
                            <link rel="stylesheet" href="" />
                            <meta property="og:image" content="" />
                            <meta name="twitter:image" content="" />
                            <link rel="canonical" href="" />
                            <script type="text/javascript" src=""></script>
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
