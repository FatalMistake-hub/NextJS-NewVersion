import { ex } from '@fullcalendar/core/internal-common';
import { format } from 'date-fns';
import { es, ru } from 'date-fns/locale';
import { min } from 'moment';
export const formatCheckDate = (date: Date, dateFormat?: string) => {
    if (!date) return '';
    return format(date, dateFormat || 'MMM d');
};

export const formatRangeDate = (startDate: any, endDate: any) => {
    if (!startDate || !endDate) return false;
    let template = `${formatCheckDate(startDate)} - ${formatCheckDate(endDate)}`;
    if (formatCheckDate(startDate, 'd m y') === formatCheckDate(endDate, 'd m y')) {
        template = `${formatCheckDate(startDate)} - ${parseInt(formatCheckDate(endDate, 'd')) + 1}`;
    }

    if (formatCheckDate(startDate, 'y') !== formatCheckDate(endDate, 'y')) {
        template = `${formatCheckDate(startDate, 'MMM d, y')} - ${formatCheckDate(endDate, 'MMM d, y')}`;
    }
    return template;
};
export const test = () => {
    const timeSlotLength = 180; // độ dài khung thời gian trong phút
    const startTime = new Date(2023, 4, 1, 8, 0); // thời gian bắt đầu
    const endTime = new Date(2023, 4, 1, 18, 0); // thời gian kết thúc

    const timeSlots = [];
    let currentTime = startTime;

    while (currentTime < endTime) {
        const start = new Date(currentTime);
        const end = new Date(currentTime.getTime() + timeSlotLength * 60000); // tính toán thời gian kết thúc của khung thời gian

        if (end > endTime) {
            // kiểm tra xem khung thời gian mới có vượt quá thời gian kết thúc không
            break; // nếu có, thoát khỏi vòng lặp
        }

        timeSlots.push({ start, end });
        currentTime = end;
    }
    console.log('a', timeSlots);
};
export const listTimeSlot = () => {
    const start = 30;
    const end = 1440;
    const step = 30;
    const length = 60;

    const list = [];

    for (let i = start; i <= end; i += step) {
        list.push(i);
    }

    const renderedList = list.slice(0, length);
    return renderedList;
};
export const numberToTime = (minutes: number) => {
    const hours = minutes / 60;
    const formattedTime = hours + ' giờ';
    return formattedTime;
};
export const timeToMinute = (timePoint: any) => {
    const totalMinutes = timePoint.hour * 60 + timePoint.minutes;
    return totalMinutes;
};
export const minuteToTime = (totalMinutes: any) => {
    const timePoint = {
        hour: Math.floor(totalMinutes / 60),
        minutes: totalMinutes % 60,
    };
    return timePoint;
};
export const TimeFrameList = (timestart = 0, timeSlotLength = 0) => {
    const timePoints = [];

    let minutes = 0 + timestart + timeSlotLength;
    let totalMinutes = 1440;
    while (minutes < totalMinutes) {
        const hour = Math.floor(minutes / 60);
        let minute = minutes % 60;

        const timePoint = {
            hour: hour,
            minutes: minute,
        };

        timePoints.push(timePoint);

        minutes += 30;
    }

    return timePoints;
};
