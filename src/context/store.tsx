'use client';
import { ReactNode, createContext, useReducer } from 'react';

import { dataReducer } from './reducer';

interface IInitialState {
    location: string;
    checkIn: Date | null;
    checkOut: Date | null;
    guests: {
        adults: number;
        children: number;
        infants: number;
    };
}

export const initialState: IInitialState = {
    location: '',
    checkIn: null,
    checkOut: null,
    guests: { adults: 0, children: 0, infants: 0 },
};

export const DataContext = createContext<[any, React.Dispatch<any>]>([initialState, () => null]);

export const ContextProvider = ({ children }: { children: ReactNode }) => (
    <DataContext.Provider value={useReducer(dataReducer, initialState)}>{children}</DataContext.Provider>
);
