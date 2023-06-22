import { useEffect } from 'react';
import { searchByCoordinate } from 'src/utils/apis/maps.api';
import useSearchByCoordinate from './useSearchByCoordinate';
import { useAppDispatch } from 'src/redux/hook';
import { SET_COORDINATE, SET_LOCATION, SET_VIEWPORT } from 'src/redux/slice/searchSlice';

const useUserLocation = () => {
    // Sử dụng navigator.geolocation để lấy vị trí của người dùng
  const dispatch = useAppDispatch();
  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const res = await searchByCoordinate(longitude, latitude);
          dispatch(SET_LOCATION(res.data.features[0].properties.context.region.name));
          dispatch(SET_COORDINATE({ longitude, latitude }));
          dispatch(
            SET_VIEWPORT({
              northEastLongtitude: res.data.features[0].properties.bbox[0],
              northEastLatitude: res.data.features[0].properties.bbox[1],
              southWestLongtitude: res.data.features[0].properties.bbox[2],
              southWestLatitude: res.data.features[0].properties.bbox[3],
            }),
          );
        },
        (error) => {
          console.error('Lỗi khi lấy vị trí người dùng:', error);
        },
      );
    } else {
      console.error('Trình duyệt không hỗ trợ định vị.');
    }
  }, []);
};
export default useUserLocation;
