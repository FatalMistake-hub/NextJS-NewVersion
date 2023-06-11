import { ERole } from "./constants/Enums";

interface IFormatGuestOptions {
    noInfants?: boolean;
}

export const formatGuests = (guests: any, options?: IFormatGuestOptions) => {
    if (!guests) return false;
    const { noInfants } = options || {};
    const { children, adults, infants } = guests;
    const total = adults + children;
    if (!total) return 0;
    let template = `${total} khách`;
    if (total >= 2) template = `${total} khách`;
    if (infants && !noInfants) template += `, ${infants} trẻ em`;
    return template;
};
export const formatGuestsMinimal = (guests: any, options?: IFormatGuestOptions) => {
    if (!guests) return false;
    const { noInfants } = options || {};
    const { children, adults, infants } = guests;
    const total = adults + children;
    if (!total) return 0;
    let template = `${total} khách`;
    if (total >= 2) template = `${total} khách`;
    // if (infants && !noInfants) template += `, ${infants} infant`;
    return template;
};
export const formatRole = (role: ERole|undefined) => {
    if (!role) return false;
    if (role === 'ADMIN') return 'Quản trị viên';
    if (role === 'OWNER') return 'Chủ nhà/Người tổ chức mới';
    if (role === 'USER') return 'Khách';
    return false;
}
