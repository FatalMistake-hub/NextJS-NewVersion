export const truncate = (longString:any, limit = 10) => {
    if (longString?.length > limit) {
        return longString?.substring(0, limit) + '...';
    }

    return longString;
};
