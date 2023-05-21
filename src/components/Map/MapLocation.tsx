import React, { FC, PropsWithChildren } from 'react';
import ReactMapGL, { GeolocateControl, FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl';
import { selectBecomeHost } from 'src/redux/slice/becomeHostSlice';
import { useAppSelector } from 'src/redux/hook';
interface IMap extends PropsWithChildren<any> {
    center: { longitude: number; latitude: number };
}

const MapLocation: FC = ({children}) => {
    const { tour } = useAppSelector(selectBecomeHost);

    // const [viewport, setViewport] = React.useState({
    //     latitude: 16.047079,
    //     longitude: 108.20623,
    //     zoom: 12,
    //     // bearing: 0,
    //     // pitch: 0,
    // });
    const viewport = {
        latitude: tour.latitude,
        longitude: tour.longitude,
        zoom: tour.destination ? 16 : 10,
    };
    return (
        <ReactMapGL
            {...viewport}
            mapStyle={process.env.MAPBOX_STYLE}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            // style={{ width: '100vw', height: '100vh' }}
            width="100%"
            height="100%"
            // onViewportChange={(viewport: any) => setViewport(viewport)}
            className="relative rounded-3xl"
        >
            {children}
        </ReactMapGL>
    );
};

export default MapLocation;
