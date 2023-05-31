import { Box, Button } from '@chakra-ui/react';
import { ITours } from 'src/types/tours.type';
type Props = {
    children?: React.ReactNode;
    value?: Partial<ITours>;
};
const TourFormWrapper = ({ children, value }: Props) => {
    return (
        <div className=" border border-gray-800 rounded-2xl w-full h-full bg-white  relative">
            <Box px={6} pt={6} pb={20} minH={40}>
                {children}
            </Box>
            <Box className="absolute bottom-0 left-0 right-0  border-t border-t-gray-800 flex justify-end px-6 py-2  ">
                <Button size={'sm'} colorScheme={'teal'} rounded={'lg'}>
                    Lưu
                </Button>
            </Box>
        </div>
    );
};

export default TourFormWrapper;
