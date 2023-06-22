import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from 'src/redux/hook';
import { searchByCoordinate } from 'src/utils/apis/maps.api';

const useSearchLocation = (longitude: number, latitude: number) => {
    // const dispatch = useAppDispatch();
    const { isLoading, error, data, isSuccess } = useQuery(
        ['SEARCH_BY_COOR', longitude, latitude],
        async () => await searchByCoordinate(longitude, latitude),

        {
            onSuccess(data) {
                console.log(data);
            },
            enabled: longitude && latitude ? true : false,
        },
    );

    return {
        data,
        isLoading,
        error,
        isSuccess,
    };
};

export default useSearchLocation;
