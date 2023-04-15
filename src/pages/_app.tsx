import '@styles/global.scss';

import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from 'src/context/store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import theme from '@definitions/chakra/theme';
import { useState } from 'react';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import { persistor, store } from 'src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const progressBar = new ProgressBar({
    size: 4,
    color: '#00b0b3',
    className: 'z-50',
    delay: 100,
});

Router.events.on('routeChangeStart', progressBar.start);
Router.events.on('routeChangeComplete', progressBar.finish);
Router.events.on('routeChangeError', progressBar.finish);
function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>): JSX.Element {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ChakraProvider theme={theme}>
            <ContextProvider>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <Hydrate state={pageProps.dehydratedState}>
                                <Component {...pageProps} />
                                <ReactQueryDevtools />
                            </Hydrate>
                        </PersistGate>
                    </Provider>
                </QueryClientProvider>
            </ContextProvider>
        </ChakraProvider>
    );
}

export default MyApp;
