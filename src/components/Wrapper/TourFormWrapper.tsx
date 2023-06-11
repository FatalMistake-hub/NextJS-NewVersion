import { Box, Button } from '@chakra-ui/react';
import usePatchTour from 'src/hooks/hosting/tours/useUpdateTour';
import { ITours } from 'src/types/tours.type';
type Props = {
    children?: React.ReactNode;
    value: Partial<ITours>;
    tourId?: string;
    onClose?: () => void;
    type?: string;
    isActive?: boolean;
};
const TourFormWrapper = ({ children, value, tourId, onClose, type, isActive=true }: Props) => {
    // const{id}=
    const { patchTours, isLoadingPost, isError, isSuccess, updateTourTime, patchToursFrameTime } = usePatchTour(Number(tourId));

    return (
        <div className=" border border-gray-800 rounded-2xl w-full h-full bg-white  relative">
            <Box px={6} pt={6} pb={20} minH={40}>
                {children}
            </Box>
            <Box className="absolute bottom-0 left-0 right-0  border-t border-t-gray-800 flex justify-end px-6 py-2  ">
                <Button
                    isDisabled={!isActive }
                    isLoading={isLoadingPost || updateTourTime.isLoading}
                    size={'sm'}
                    colorScheme={'teal'}
                    rounded={'lg'}
                    onClick={() => {
                        type === 'time' ? patchToursFrameTime(value) : patchTours(value);
                        if (onClose && isSuccess) onClose();
                    }}
                >
                    Lưu
                </Button>
            </Box>
        </div>
    );
};

export default TourFormWrapper;
