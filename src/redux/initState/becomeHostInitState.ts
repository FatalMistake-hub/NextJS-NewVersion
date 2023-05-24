// declaring the types for our state
// Ngày hiện tại
const today = new Date();
const formattedToday = today.toISOString().slice(0, 10);

// Ngày sau đó 6 tháng
const sixMonthsLater = new Date();
sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
const formattedSixMonthsLater = sixMonthsLater.toISOString().slice(0, 10);
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
        checkIn: '',
        checkOut: '',
        startDay: formattedToday,
        endDay: formattedSixMonthsLater,
    },
};
