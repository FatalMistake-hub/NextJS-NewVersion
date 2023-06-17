export const handleColorStatus = (status: string) => {
    switch (status) {
        case 'SUCCESS':
            return 'green';
        case 'CANCEL':
            return 'red';
        case 'WAITING':
            return 'blue';
        case 'USED':
            return 'yellow';
        default:
            return '';
    }
};
export const handleNameStatus = (status: string) => {
    switch (status) {
        case 'SUCCESS':
            return 'Đã xác nhận';
        case 'CANCEL':
            return 'Đã hủy';
        case 'WAITING':
            return 'Chờ xác nhận';
        case 'USED':
            return 'Đã hoàn tất';
        default:
            return '';
    }
};
