import moment from 'moment';

// Ngày hiện tại
const today = moment().format('YYYY-MM-DD');
// Ngày sau đó 6 tháng
const sixMonthsLater = moment().add(6, 'months').format('YYYY-MM-DD');
export const becomeHostInitState = {
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
            // {
            //     link: '',
            // },
        ],
        timeBookStart: {
            hour: undefined,
            minutes: undefined,
        },
        timeBookEnd: {
            hour: undefined,
            minutes: undefined,
        },
        // checkIn: '',
        // checkOut: '',
        startDay: today,
        endDay: sixMonthsLater,
    },
};
