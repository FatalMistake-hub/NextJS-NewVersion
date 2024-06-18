'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ContextProvider } from 'src/context/store';
import { persistor, store } from 'src/redux/store';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ChakraProvider>
                <ContextProvider>
                    <QueryClientProvider
                        client={
                            new QueryClient({
                                defaultOptions: {
                                    queries: {
                                        // staleTime: Infinity,
                                        refetchOnWindowFocus: false,
                                        retry: 2,
                                    },
                                    mutations: {},
                                },
                            })
                        }
                    >
                        <ReduxProvider store={store}>
                            <PersistGate loading={null} persistor={persistor}>
                                {/* <WalletConnectionProvider>{children}</WalletConnectionProvider> */}
                                    {children}
                                <ReactQueryDevtools />
                            </PersistGate>
                        </ReduxProvider>
                    </QueryClientProvider>
                </ContextProvider>
            </ChakraProvider>
        </SessionProvider>
    );
}
