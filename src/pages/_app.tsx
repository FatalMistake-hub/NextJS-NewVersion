import '@styles/global.scss';
import '@styles/reactDateRange.scss';
// import '@styles/swiper.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { type DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from 'src/context/store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import theme from '@definitions/chakra/theme';
import { useState, ReactElement, ReactNode } from 'react';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import { persistor, store } from 'src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MainLayout from '@components/layouts/MainLayout';
import { NextPage } from 'next';
// import { useLoadScript } from '@react-google-maps/api';

const progressBar = new ProgressBar({
    size: 4,
    color: '#00b0b3',
    className: 'z-50',
    delay: 100,
});

Router.events.on('routeChangeStart', progressBar.start);
Router.events.on('routeChangeComplete', progressBar.finish);
Router.events.on('routeChangeError', progressBar.finish);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const [queryClient] = useState(() => new QueryClient());
    // const getLayout = Component.getLayout ?? ((page) => page);
    const renderWithLayout =
        Component.getLayout ||
        function (page) {
            return <MainLayout>{page}</MainLayout>;
        };
    //     let key: string;
    // if (process.env.GOOGLE_MAPS_API_KEY) {
    //     key = process.env.GOOGLE_MAPS_API_KEY;
    //     const { isLoaded } = useLoadScript({
    //         googleMapsApiKey: 'AIzaSyDmqhwSvxnTbBPWxvQVTpu9lWME-JZvul0',
    //         // libraries: ['places'],
    //     });
    //     console.log('key', key);

    // }
    return (
        
            <ChakraProvider theme={theme}>
                <ContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <Provider store={store}>
                            <PersistGate loading={null} persistor={persistor}>
                                {/* <Hydrate state={pageProps.dehydratedState}> */}
                                {renderWithLayout(<Component {...pageProps} />)}
                                <ReactQueryDevtools />
                                {/* </Hydrate> */}
                            </PersistGate>
                        </Provider>
                    </QueryClientProvider>
                </ContextProvider>
            </ChakraProvider>
       
    );
}

export default MyApp;
