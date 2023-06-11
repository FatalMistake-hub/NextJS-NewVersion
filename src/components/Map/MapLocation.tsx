import React, { FC, PropsWithChildren, ReactNode } from 'react';
import ReactMapGL, { GeolocateControl, FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl';
import { selectBecomeHost } from 'src/redux/slice/becomeHostSlice';
import { useAppSelector } from 'src/redux/hook';
interface IMap {
    longitude?: number;
    latitude?: number;
    children?: any;
}

const MapLocation = ({ latitude, longitude, children }: IMap) => {
    const { tour } = useAppSelector(selectBecomeHost);
    const viewport =
        longitude && latitude
            ? {
                  latitude: latitude,
                  longitude: longitude,
                  zoom: 16,
              }
            : {
                  latitude: tour.latitude,
                  longitude: tour.longitude,
                  zoom: tour.destination ? 16 : 5,
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
            <NavigationControl className="top-3 right-3" />
            <ScaleControl className="bottom-3 left-3" />
            {children}
        </ReactMapGL>
    );
};

export default MapLocation;
