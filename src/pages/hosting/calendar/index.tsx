import FullCalendar from '@fullcalendar/react';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/locales/vi';
import { ReactElement } from 'react';
import { HeaderHosting } from '@components/layouts/common/HeaderHosting';
import viLocale from '@fullcalendar/core/locales/vi';
const headerToolbar = {
    start: 'title', // will normally be on the left. if RTL, will be on the right
    center: '',
    end: 'today prev,next',
};
const eventRender = (info: any) => {
    info.el.style.backgroundColor = 'red';
};

const Calendar = () => {
    return (
        <div className="pt-[150px] h-[calc(100vh-150px)]">
            <FullCalendar
                headerToolbar={headerToolbar}
                events={[
                    {
                        title: 'event1',
                        start: '2023-05-17',
                        end: '2023-05-18',
                    },
                    {
                        // title: 'event2',
                        start: '2023-05-18T12:30:00',
                        end: '2023-05-18T16:30:00',
                        display: 'list-item',
                    },
                    {
                        // title: 'event2',
                        start: '2023-05-19T13:30:00',
                        display: 'list-item',
                    },
                    {
                        title: 'event3',
                        start: '2023-05-20T12:30:00',
                        end: '2023-05-20T15:30:00',
                        
                    },
                ]}
                selectable={true}
                dateClick={function (info) {
                    console.log('clicked ' + info.dateStr);
                }}
                select={function (info) {
                    console.log('selected ' + info.startStr + ' to ' + info.endStr);
                }}
                navLinks={true}
                navLinkDayClick={function (date, jsEvent: any) {
                    console.log('day', date.toISOString());
                    console.log('coords', jsEvent.pageX, jsEvent.pageY);
                }}
                //
                //
                //
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
                titleFormat={{ year: 'numeric', month: '2-digit' }}
            />
        </div>
    );
};

Calendar.requireAuth = true;
export default Calendar;

Calendar.getLayout = function (page: ReactElement) {
    return (
        <>
            <HeaderHosting />
            {page}
        </>
    );
};
