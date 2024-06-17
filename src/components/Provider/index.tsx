'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { PersistGate } from 'redux-persist/integration/react';
import { ContextProvider } from 'src/context/store';
import { store, persistor } from 'src/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import dynamic from 'next/dynamic';

export default function Providers({ children }: { children: React.ReactNode }) {
    const WalletConnectionProvider = dynamic(() => import('../../context/WalletConnectionProvider'), {
        ssr: true,
    });
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
                                <WalletConnectionProvider>{children}</WalletConnectionProvider>
                                <ReactQueryDevtools />
                            </PersistGate>
                        </ReduxProvider>
                    </QueryClientProvider>
                </ContextProvider>
            </ChakraProvider>
        </SessionProvider>
    );
}
