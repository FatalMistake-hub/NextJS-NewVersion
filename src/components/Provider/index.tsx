'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider, isServer } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ContextProvider } from 'src/context/store';
import { persistor, store } from 'src/redux/store';
function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false,
                // retry: 2,
            },
            mutations: {},
        },
    });
}
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient();
    } else {
        // Browser: make a new query client if we don't already have one
        // This is very important, so we don't re-make a new client if React
        // suspends during the initial render. This may not be needed if we
        // have a suspense boundary BELOW the creation of the query client
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}
const queryClient = getQueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ChakraProvider>
                <ContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <ReduxProvider store={store}>
                            <PersistGate loading={null} persistor={persistor}>
                                {/* <WalletConnectionProvider>{children}</WalletConnectionProvider> */}
                                {children}
                                <ReactQueryDevtools initialIsOpen={false} />
                            </PersistGate>
                        </ReduxProvider>
                    </QueryClientProvider>
                </ContextProvider>
            </ChakraProvider>
        </SessionProvider>
    );
}
