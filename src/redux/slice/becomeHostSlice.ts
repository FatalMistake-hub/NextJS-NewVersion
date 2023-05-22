import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type } from 'os';
import { ICategory } from 'src/types/category.type';
import { RootState } from '../store';

// declaring the types for our state
// Ngày hiện tại
const today = new Date();
const formattedToday = today.toISOString().slice(0, 10);

// Ngày sau đó 6 tháng
const sixMonthsLater = new Date();
sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
const formattedSixMonthsLater = sixMonthsLater.toISOString().slice(0, 10);

export const becomeHostSlice = createSlice({
    name: 'becomeHost',
    initialState: {
        step: 1,
        btnStatus: false,
        tour: {
            categories: [
                {
                    categoryId: undefined,
                    categoryName: '',
                },
            ],

            title: '',
            rating: 0,
            city: '',
            priceOnePerson: null,
            imageMain: '',
            working: '',
            latitude: 18.0583,
            longitude: 107.20623,
            destination: '',
            timeSlotLength: 120,
            destinationDescription: '',

            imageDtoList: [
                {
                    // link: '',
                    // tourId: null,
                },
            ],
            timeBookStart: {
                hour: undefined,
                minutes: undefined,
            },
            timeBookEnd: {
                hour: undefined,
                minutes: undefined,
            },
            checkIn: '',
            checkOut: '',
            startDay: formattedToday,
            endDay: formattedSixMonthsLater,
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
        SET_TIMEBOOKSTART: (state, action) => {
            state.tour.timeBookStart.hour = action.payload.hour;
            state.tour.timeBookStart.minutes = action.payload.minutes;
        },
        SET_TIMEBOOKEND: (state, action) => {
            state.tour.timeBookEnd.hour = action.payload.hour;
            state.tour.timeBookEnd.minutes = action.payload.minutes;
        },
        SET_DESTINATION: (state, action) => {
            state.tour.destination = action.payload;
        },
        SET_CITY: (state, action) => {
            state.tour.city = action.payload;
        },
        SET_WORKING: (state, action) => {
            state.tour.working = action.payload.replace(/\n/g, '<br/>');
        },
        SET_destinationDECRIPTION: (state, action) => {
            state.tour.destinationDescription = action.payload.replace(/\n/g, '<br/>');
        },
        SET_CATEGORY: (state, action) => {
            state.tour.categories[0].categoryId = action.payload.categoryId;
            state.tour.categories[0].categoryName = action.payload.categoryName;
        },
        SET_TIMESLOTLENGTH: (state, action) => {
            state.tour.timeSlotLength = action.payload;
        },
    },
});
// exporting the actions
export const {
    SET_STEP,
    SET_COORDINATE,
    SET_DESTINATION,
    SET_CITY,
    SET_btnSTATUS,
    SET_CATEGORY,
    SET_WORKING,
    SET_destinationDECRIPTION,
    SET_TIMESLOTLENGTH,
    SET_TIMEBOOKSTART,
    SET_TIMEBOOKEND,
} = becomeHostSlice.actions;

export const selectBecomeHost = (state: RootState) => state.becomeHost;
export default becomeHostSlice.reducer;
