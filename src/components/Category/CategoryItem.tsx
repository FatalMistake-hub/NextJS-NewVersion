'use client';
import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { SET_CATEGORY, selectSearch } from 'src/redux/slice/searchSlice';
import { ICategory } from 'src/types/category.type';

export default async function CategoryItem({ item, index }: { item: ICategory; index: number }) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { location, checkIn, checkOut, guests, categoryList, viewport } = useAppSelector(selectSearch);
    const handleClickCategory = async (category: any) => {
        await dispatch(
            SET_CATEGORY({
                categoryId: category.id,
                label: category.label,
            }),
        );
        const current = new URLSearchParams(); // Convert searchParams to string[][] format
        // update as necessary
        current.set('location', location);
        current.set('checkIn', checkIn);
        current.set('checkOut', checkOut);
        current.set('guests', JSON.stringify(guests));
        current.set('categoryList', JSON.stringify(categoryList[categoryList.length - 1]));
        current.set('viewport', JSON.stringify(viewport));
        // cast to string
        const search = current.toString();
        const query = search ? `?${search}` : '';

      await router.push(`search${query}`);
      console.log('query', query);
    };
    return (
        <div key={index} className="mx-2 bg-transparent">
            <Box
                // ml={'-26px'}
                maxW={'280px'}
                h={'240px'}
                rounded={'xl'}
                p={2}
                textAlign={'left'}
                justifyContent={'space-between'}
                display={'flex'}
                flexDirection={'column'}
                backdropBlur={'2xl'}
                bgColor={'white'}
                boxShadow={'md'}
                className="hover:-translate-y-4 hover:drop-shadow-2xl transition-all duration-300 ease-in-out"
                onClick={() => {
                    handleClickCategory(item);
                }}
            >
                <Box w={'full'} minHeight={'180px'} position={'relative'}>
                    <Image
                        src={
                            item.imageLink ||
                            'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686583596/steffen-b-qDZ-Xd8dX6w-unsplash_vsuyhz.jpg'
                        }
                        alt={`Picture of `}
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL={
                            item.imageLink ||
                            'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686583596/steffen-b-qDZ-Xd8dX6w-unsplash_vsuyhz.jpg'
                        }
                        className={'rounded-xl'}
                        priority
                    />
                </Box>
                <Text p={2} noOfLines={2} fontSize={'18px'} fontWeight={600}>
                    {item.label}
                </Text>
            </Box>
        </div>
    );
}
