import { HeaderHosting } from '@components/layouts/common/HeaderHosting';
import { ReactElement } from 'react';

const Listings = () => {
    return <div className=""></div>;
};

export default Listings;
Listings.getLayout = function (page: ReactElement) {
    return (
        <>
            <HeaderHosting />
            {page}
        </>
    );
};
