import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type } from 'os';
import { RootState } from '../store';

// declaring the types for our state

interface ISearchState {
    location: string;
    checkIn: Date | null;
    checkOut: Date | null;
    guests: IGuests;
}
interface IGuests {
    adults: number;
    children: number;
    infants: number;
}

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        location: '',
        checkIn: null,
        checkOut: null,
        guests: { adults: 0, children: 0, infants: 0 },
    } as ISearchState,
    reducers: {
        SET_LOCATION: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
        },
        SET_CHECK_IN: (state, action: PayloadAction<Date | null>) => {
            state.checkIn = action.payload;
        },
        SET_CHECK_OUT: (state, action: PayloadAction<Date | null>) => {
            state.checkOut = action.payload;
        },
        SET_GUESTS: (state, action: PayloadAction<IGuests>) => {
            state.guests = action.payload;
        },
        RESET_DATES: (state, action: PayloadAction<Date | null>) => {
            state.checkOut = action.payload;
            state.checkIn = action.payload;
        },
        RESET_GUESTS: (state, action: PayloadAction<number>) => {
            state.guests.children = action.payload;
            state.guests.adults = action.payload;
            state.guests.infants = action.payload;
        },
        INCREASE_ADULTS: (state, action: PayloadAction<number>) => {
            if (state.guests.adults < 16 && state.guests.adults + state.guests.children < 16) {
                state.guests.adults += 1;
            }
        },
        INCREASE_CHILDREN: (state, action: PayloadAction<number>) => {
            if (state.guests.children >= 5) {
            } else if (state.guests.children < 5 && state.guests.adults <= 0) {
                state.guests.children += 1;
                state.guests.adults += 1;
            } else if (state.guests.adults + state.guests.children < 16) {
                state.guests.children += 1;
            }
        },
        INCREASE_INFANTS: (state, action: PayloadAction<number>) => {
            if (state.guests.infants >= 5) {
            } else if (state.guests.infants < 5 && state.guests.adults <= 0) {
                state.guests.infants += 1;
                state.guests.adults += 1;
            } else {
                state.guests.infants += 1;
            }
        },
        DECREASE_ADULTS: (state, action: PayloadAction<number>) => {
            if (state.guests.adults <= 0) {
            } else if (state.guests.adults <= 1 && (state.guests.children >= 1 || state.guests.infants >= 1)) {
            } else {
                state.guests.adults -= 1;
            }
        },
        DECREASE_CHILDREN: (state, action: PayloadAction<number>) => {
            if (state.guests.children <= 0) {
            } else {
                state.guests.children -= 1;
            }
        },
        DECREASE_INFANTS: (state, action: PayloadAction<number>) => {
            if (state.guests.infants <= 0) {
            } else {
                state.guests.infants -= 1;
            }
        },
    },
});
// exporting the actions
export const {
    SET_LOCATION,
    SET_CHECK_IN,
    SET_CHECK_OUT,
    SET_GUESTS,
    RESET_DATES,
    RESET_GUESTS,
    INCREASE_ADULTS,
    INCREASE_CHILDREN,
    INCREASE_INFANTS,
    DECREASE_ADULTS,
    DECREASE_CHILDREN,
    DECREASE_INFANTS,
} = searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;
export default searchSlice.reducer;
