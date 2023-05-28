import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

// declaring the types for our state
const today = new Date();
export const calendarHostSlice = createSlice({
    name: 'calendarHost',
    initialState: {
        view: 'month',
        dateRange: {
            startDate: today.toISOString().slice(0, 10),
            endDate: today.toISOString().slice(0, 10),
        },
        tourId: 0,
    },
    reducers: {
        SET_VIEW: (state, action: PayloadAction<string>) => {
            state.view = action.payload;
        },
        SET_dateRange: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
            state.dateRange = action.payload;
        },
        SET_TOURID: (state, action: PayloadAction<number>) => {
            state.tourId = action.payload;
        },
        RESET: (state) => {

            state.dateRange = {
                startDate: today.toISOString().slice(0, 10),
                endDate: today.toISOString().slice(0, 10),
            };
            state.tourId = 0;
        }
    },
});
// exporting the actions
export const { SET_VIEW, SET_dateRange, SET_TOURID, RESET } = calendarHostSlice.actions;

export const selectCalendarHost = (state: RootState) => state.calendarHost;
export default calendarHostSlice.reducer;
