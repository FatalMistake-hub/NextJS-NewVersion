import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// ...
import storage from 'redux-persist/lib/storage';
import searchSlice from './slice/searchSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['search'],
};
const rootReducer = combineReducers({
    search: searchSlice,
    
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
