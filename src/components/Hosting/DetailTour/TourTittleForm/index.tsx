import { Box, Button } from '@chakra-ui/react';

const TourTittleForm = () => {
    return (
        <div className=" border border-gray-800 rounded-2xl w-full h-52 relative">
            <Box p={6}>sdf</Box>
            <Box className="absolute bottom-0 left-0 right-0  border-t border-t-gray-800 flex justify-end px-6 py-4">
                <Button size={'sm'} colorScheme={'teal'} rounded={'lg'}>
                    Lưu
                </Button>
            </Box>
        </div>
    );
};

export default TourTittleForm;
