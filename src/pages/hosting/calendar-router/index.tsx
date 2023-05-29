import { ReactElement, useMemo } from 'react';
import { HeaderHosting } from '@components/layouts/common/HeaderHosting';
import { Stack, SkeletonText } from '@chakra-ui/react';

import useGetAllHostTour from 'src/hooks/hosting/tours/useGetAllHostTour';
import { useRouter } from 'next/router';

const CalendarRouter = () => {
    const { status, ref, data, isSuccess, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetAllHostTour(10);
    const router = useRouter();

    if (isSuccess) {
        router.push({
            pathname: `/hosting/calendar/${data?.pages[0].data.content[0].tourId}`,
        });
    }
    return (
        <div className="pt-[86px] flex relative   ">
            <Stack w={'full'} className="relative justify-center flex items-center">
                <SkeletonText w={'80%'} mt="20" noOfLines={2} spacing="4" skeletonHeight="8" />
                <SkeletonText w={'80%'} pt="20" noOfLines={4} spacing="4" skeletonHeight="8" />
            </Stack>
            <Stack w={'430px'} float={'right'} className="relative justify-start flex items-center ">
                <SkeletonText w={'80%'} mt="20" noOfLines={2} spacing="4" skeletonHeight="8" />
                <SkeletonText w={'80%'} pt="20" noOfLines={4} spacing="4" skeletonHeight="8" />
            </Stack>
        </div>
    );
};

// CalendarRouter.requireAuth = true;
export default CalendarRouter;

CalendarRouter.getLayout = function (page: ReactElement) {
    return (
        <>
            <HeaderHosting />
            {page}
        </>
    );
};
