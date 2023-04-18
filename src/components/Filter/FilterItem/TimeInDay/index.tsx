import React from 'react';
import { SimpleGrid, Checkbox, Stack, Button } from '@chakra-ui/react';
interface ITimeInDayProps {
    collumn?: number;
}

const TimeInDay: React.FC<ITimeInDayProps> = ({ collumn=1 }) => {
    return (
        <>
            <SimpleGrid columns={collumn} spacing={10} px={2} py={4}>
                <Checkbox size="lg" colorScheme="teal" defaultChecked alignItems={'flex-start'}>
                    <div className="ml-1">
                        <div className="flex items-start text-base leading-5">Buổi sáng</div>
                        <div className="flex items-start pt-1 text-sm leading-4 text-gray-300">Bắt đầu trước 12:00</div>
                    </div>
                </Checkbox>
                <Checkbox size="lg" colorScheme="teal" defaultChecked alignItems={'flex-start'}>
                    <div className="ml-1">
                        <div className="flex items-start text-base leading-5">Buổi chiều</div>
                        <div className="flex items-start pt-1 text-sm leading-4 text-gray-300">Bắt đầu sau 12 giờ trưa</div>
                    </div>
                </Checkbox>
                <Checkbox size="lg" colorScheme="teal" defaultChecked alignItems={'flex-start'}>
                    <div className="ml-1">
                        <div className="flex items-start text-base leading-5">Buổi tối</div>
                        <div className="flex items-start pt-1 text-sm leading-4 text-gray-300">Bắt đầu sau 5 giờ chiều</div>
                    </div>
                </Checkbox>
            </SimpleGrid>
        </>
    );
};

export default TimeInDay;
