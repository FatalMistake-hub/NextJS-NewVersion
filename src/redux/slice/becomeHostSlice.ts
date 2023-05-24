import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TourPost } from 'src/types/tours.type';
import { becomeHostInitState } from '../initState/becomeHostInitState';

interface InitialState {
    step: number;
    btnStatus: boolean;
    tour: TourPost;
}

export const becomeHostSlice = createSlice({
    name: 'becomeHost',
    initialState: becomeHostInitState as InitialState,
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
        SET_TITLE: (state, action) => {
            state.tour.title = action.payload;
        },
        SET_priceOnePerson: (state, action) => {
            state.tour.priceOnePerson = action.payload;
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
        SET_imageMain: (state, action) => {
            state.tour.imageMain = action.payload;
        },
        ADD_LISTIMAGE: (state, action) => {
            state.tour.imageDtoList = [...state.tour.imageDtoList, ...action.payload];

            // state.tour.imageMain = state.tour.imageDtoList[0].link;

            // state.tour.imageDtoList = action.payload.updatedImageDtoList;
            // state.tour.imageMain = action.payload.imageMain;
        },
        SET_INITSTATE: (state, action) => {
            return action.payload;
        },
        DELETE_IMAGE: (state, action) => {
            state.tour.imageDtoList.splice(action.payload, 1);
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
    SET_TITLE,
    SET_INITSTATE,
    SET_destinationDECRIPTION,
    SET_TIMESLOTLENGTH,
    SET_TIMEBOOKSTART,
    SET_TIMEBOOKEND,
    ADD_LISTIMAGE,
    DELETE_IMAGE,
    SET_priceOnePerson,
    SET_imageMain,
} = becomeHostSlice.actions;

export const selectBecomeHost = (state: RootState) => state.becomeHost;
export default becomeHostSlice.reducer;
// export const addListImageAsync = createAsyncThunk('tour/addListImageAsync', async (payload: any, { getState, dispatch }) => {
//     // Logic để thêm danh sách ảnh
//     try {
//         const state: any = getState();
//         console.log('state', state);
//         const imageDtoList = state.becomeHost.tour.imageDtoList;

//         const updatedImageDtoList = [...imageDtoList, ...payload];
//         let imageMain = '';
//         if (updatedImageDtoList.length > 0) {
//             imageMain = updatedImageDtoList[0]?.link || '';
//         }

//         dispatch(ADD_LISTIMAGE({ updatedImageDtoList, imageMain }));
//     } catch (error) {
//         console.log(error);
//     }
// });
