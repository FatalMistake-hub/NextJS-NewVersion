import FullCalendar from '@fullcalendar/react';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/locales/vi';
import viLocale from '@fullcalendar/core/locales/vi';
import { useToast } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectCalendarHost, SET_dateRange } from 'src/redux/slice/calendarHostSlice';
import { memo, useEffect, useState } from 'react';
import useGetAllDayBookingById from 'src/hooks/guest/timeBooking/useGetAllDayBookingById';
import { IDayBook } from 'src/types/timeBooking.type';
import { useRouter } from 'next/router';

const headerToolbar = {
    start: 'title',
    center: '',
    end: 'today prev,next',
};
const CalendarBase = () => {
    const toast = useToast();
    // const [res, setRes] = useState<IDayBook[]>();
    const dispatch = useAppDispatch();
    const { view } = useAppSelector(selectCalendarHost);
    const router = useRouter();
    const { id } = router.query;
    const tourId = Number(id);

    let res: IDayBook[] | undefined = undefined;
    if (typeof tourId === 'number') {
        const { data } = useGetAllDayBookingById(tourId);
        res = data
    }
    ;

    // useEffect(() => {
    //     if (tourId !== 0) {
    //         setRes(data);
    //     }
    //     return () => {
    //         setRes(undefined);
    //     };
    // }, [tourId, data]);
// {
//                 title: 'Đã đặt',
//                 start: item.date_name.replace(' ', 'T'),
//                 end: item.date_name.replace(' ', 'T'),
//                 display: 'list-item',
//             }

    return (
        <FullCalendar
            // validRange={{
            //     start: new Date().toISOString().split('T')[0],
            // }}
            lazyFetching={true}
            headerToolbar={headerToolbar}
            events={
                res?.map((item) => {
                    if (item.isDeleted === false) {
                        return {
                            title: 'Đã đặt',
                            start: item.date_name.replace(' ', 'T'),
                            end: item.date_name.replace(' ', 'T'),
                            display: 'list-item',
                        };
                    }
                    else {
                        return {
                            title: 'Đã đặt',
                            start: item.date_name.replace(' ', 'T'),
                            end: item.date_name.replace(' ', 'T'),
                            display: 'none',
                        };
                    }
                })}
            selectable={true}
            unselectAuto={false}
            // dateClick={function (info) {
            //     const selectedDate = new Date(info.dateStr).toISOString().split('T')[0];
            //     const currentDate = new Date().toISOString().split('T')[0];
            //     if (selectedDate < currentDate) {

            //         return; // Không cho phép chọn ngày trong quá khứ
            //     }
            // }}
            select={function (info) {
                const selectedStartDate = new Date(info.startStr).toISOString().split('T')[0];
                const selectedEndDate = new Date(info.endStr).toISOString().split('T')[0];
                const currentDate = new Date().toISOString().split('T')[0];
                if (selectedStartDate < currentDate || selectedEndDate < currentDate) {
                    toast({
                        title: 'Không thể chọn ngày trong quá khứ',
                        status: 'warning',
                        duration: 3000,
                        isClosable: true,
                    });
                    return false; // Không cho phép chọn ngày trong quá khứ
                }
                const timeDiff = info.end.getTime() - info.start.getTime();
                const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
                if (timeDiff < twoDaysInMillis) {
                    dispatch(SET_dateRange({ startDate: info.startStr, endDate: info.startStr }));
                } else {
                    let date = new Date(info.endStr);
                    date.setDate(date.getDate() - 1);
                    let newDateString = date.toISOString().split('T')[0];

                    dispatch(SET_dateRange({ startDate: info.startStr, endDate: newDateString }));
                }
            }}
            //
            //
            //
            //
            //
            //

            timeZone="vi-VN"
            locale="vi"
            plugins={[multiMonthPlugin, interactionPlugin]}
            initialView="multiMonthYear"
            // initialView="multiMonthFourMonth"
            multiMonthMinWidth={500}
            multiMonthMaxColumns={view === 'month' ? 1 : 2}
            eventColor="#0b0c0c"
            displayEventEnd={true}
            firstDay={1}
            locales={[viLocale]}
            eventTextColor={'white'}
            titleFormat={{ year: 'numeric' }}
        />
    );
};

export default memo(CalendarBase);
