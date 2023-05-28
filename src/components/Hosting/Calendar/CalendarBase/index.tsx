import FullCalendar from '@fullcalendar/react';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/locales/vi';
import viLocale from '@fullcalendar/core/locales/vi';
import { start } from 'repl';
import { useToast } from '@chakra-ui/react';

const headerToolbar = {
    start: 'title',
    center: '',
    end: 'today prev,next',
};
const CalendarBase = () => {

    const toast = useToast();
    return (
        <FullCalendar

            // validRange={{
            //     start: new Date().toISOString().split('T')[0],
            // }}
            lazyFetching={true}
            headerToolbar={headerToolbar}
            events={[
                {
                    // title: 'event2',
                    start: '2023-05-28T12:30:00',
                    end: '2023-05-28T16:30:00',
                    display: 'list-item',
                },
                
            ]}
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
                    console.log(info.startStr);
                }
            }}
            //
            //
            //
            //
            //
            //
            timeZone="UTC"
            locale="vi"
            plugins={[multiMonthPlugin, interactionPlugin]}
            initialView="multiMonthYear"
            multiMonthMaxColumns={1}
            eventColor="#0b0c0c"
            displayEventEnd={true}
            firstDay={1}
            locales={[viLocale]}
            eventTextColor={'white'}
            titleFormat={{ year: 'numeric' }}
        />
    );
};

export default CalendarBase;
