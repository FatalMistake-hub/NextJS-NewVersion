import { ReactElement } from 'react';
import { HeaderHosting } from '@components/layouts/common/HeaderHosting';
import {
    Stack,
} from '@chakra-ui/react';

import { BiCheck, BiMinus, BiPlus, BiX } from 'react-icons/bi';
import CalendarBase from '@components/Hosting/Calendar/CalendarBase';
import DaySection from '@components/Hosting/Calendar/DaySection';
const CalendarHosting = () => {
    return (
        <div className="pt-[86px] flex relative   ">
            <Stack w={'full'}>
                <CalendarBase />
            </Stack>
            <Stack w={'430px'} float={'right'} className="border-l border-l-gray-700  ">
                <DaySection />
            </Stack>
        </div>
    );
};

CalendarHosting.requireAuth = true;
export default CalendarHosting;

CalendarHosting.getLayout = function (page: ReactElement) {
    return (
        <>
            <HeaderHosting />
            {page}
        </>
    );
};
