import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type } from 'os';
import { RootState } from '../store';

// declaring the types for our state

export const becomeHostSlice = createSlice({
    name: 'becomeHost',
    initialState: {
        step: 0,
        tour: {
            categories: [
                {
                    categoryId: 3,
                },
            ],
            tourId: null,
            title: '',
            rating: 0,
            city: '',
            priceOnePerson: null,
            imageMain: '',
            working: '',
            latitude: 12.047079,
            longitude: 104.20623,
            destination: '',
            destinationDescription: '',
            userId: '',
        },
        imageList: [
            {
                // link: '',
                // tourId: null,
            },
        ],
    },
    reducers: {
        SET_STEP: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        SET_COORDINATE: (state, action) => {
            state.tour.latitude = action.payload.latitude;
            state.tour.longitude = action.payload.longitude;
        },
        SET_DESTINATION: (state, action) => {
            state.tour.destination = action.payload;
        },
        SET_CITY: (state, action) => {
            state.tour.city = action.payload;
        },
    },
});
// exporting the actions
export const { SET_STEP, SET_COORDINATE, SET_DESTINATION, SET_CITY } = becomeHostSlice.actions;

export const selectBecomeHost = (state: RootState) => state.becomeHost;
export default becomeHostSlice.reducer;
