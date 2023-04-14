// import { DATA_ACTION_TYPES } from 'context/actionTypes';

import { DateRange } from 'react-date-range';
import { FC } from 'react';

// import { useDataContext } from 'hooks/useDataContext';

// context

interface IAppDateRangeProps {
    months?: number;
}

const DateRangeCP: FC<IAppDateRangeProps> = ({ months }) => {
    // const [{ checkIn, checkOut }, dispatch] = useDataContext();

    // const selectionRange = {
    //     startDate: checkIn,
    //     endDate: checkOut,
    //     key: 'selection',
    // };

    // const handleDatePicker = (range: any) => {
    //     const { startDate, endDate } = range.selection;
    //     dispatch({ type: DATA_ACTION_TYPES.SET_CHECK_IN, payload: startDate });
    //     dispatch({ type: DATA_ACTION_TYPES.SET_CHECK_OUT, payload: endDate });
    // };

    return (
        <div className="md:py-4 rounded-3xl">
            <DateRange
                // ranges={[selectionRange]}
                // onChange={handleDatePicker}
                months={months || 2}
                direction="horizontal"
                showMonthAndYearPickers={false}
                rangeColors={['#F7F7F7']}
                minDate={new Date()}
                showDateDisplay={false}
                monthDisplayFormat="MMMM YYY"
            />
        </div>
    );
};

export default DateRangeCP;
