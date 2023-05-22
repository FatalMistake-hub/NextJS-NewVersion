import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type } from 'os';
import { RootState } from '../store';

// declaring the types for our state

export const becomeHostSlice = createSlice({
    name: 'becomeHost',
    initialState: {
        step: 0,
        btnStatus: false,
        tour: {
            categories: [
                {
                    categoryId: undefined,
                },
            ],
            tourId: null,
            title: '',
            rating: 0,
            city: '',
            priceOnePerson: null,
            imageMain: '',
            working: '',
            latitude: 18.0583,
            longitude: 107.20623,
            destination: '',
            destinationDescription: '',
            userId: '',
            imageList: [
                {
                    // link: '',
                    // tourId: null,
                },
            ],
        },
    },
    reducers: {
        SET_STEP: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        SET_btnSTATUS: (state, action) => {
            state.btnStatus = action.payload;
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
        SET_CATEGORY: (state, action) => { 
            state.tour.categories[0].categoryId = action.payload;

        }
    },
});
// exporting the actions
export const { SET_STEP, SET_COORDINATE, SET_DESTINATION, SET_CITY, SET_btnSTATUS, SET_CATEGORY } = becomeHostSlice.actions;

export const selectBecomeHost = (state: RootState) => state.becomeHost;
export default becomeHostSlice.reducer;
