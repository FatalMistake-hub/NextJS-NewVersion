import { Text, Button } from '@chakra-ui/react';
import Link from 'next/link';

const CardSelectDay = () => {
    return (
        <div className="p-6 flex items-start justify-center  flex-col border rounded-lg border-black-400 min-w-[200px]">
            <div className="flex flex-col items-start">
                <Text mb={1} fontSize={'16px'} fontWeight={600}>
                    Th 6, 28 thg 4
                </Text>
                <Text mb={1} fontSize={'12px'} color={'black.500'}>
                    18:00–20:30
                </Text>
            </div>
            <div className="flex flex-col items-start">
                <Text mb={4} mt={8} fontSize={'16px'} fontWeight={600}>
                    Từ $35<span className="font-normal">/người</span>
                </Text>
                <Button size={'sm'} colorScheme="teal">
                    <Link href={'/payment/1'}>Chọn</Link>
                </Button>
            </div>
        </div>
    );
};

export default CardSelectDay;
