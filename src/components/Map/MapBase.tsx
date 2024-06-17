'use client'
import React, { FC, PropsWithChildren, memo, useEffect, useMemo } from 'react';
import ReactMapGL, { GeolocateControl, FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl';
import { useAppSelector } from 'src/redux/hook';
import { selectSearch } from 'src/redux/slice/searchSlice';
import { calculateZoomVP } from 'src/utils/mapUntil';

interface IMap extends PropsWithChildren<any> {
    center: { longitude: number; latitude: number };
    viewportBbox?: any;
}

const MapBase: FC<IMap> = ({ children, center, viewportBbox }) => {
    // const { latitude, longitude } = useAppSelector(selectSearch);

    const calculatedZoom = useMemo(
        () =>
            calculateZoomVP(
                viewportBbox.southWestLatitude,
                viewportBbox.northEastLatitude,
                viewportBbox.southWestLongtitude,
                viewportBbox.northEastLongtitude,
            ),
        [viewportBbox.southWestLatitude, viewportBbox.northEastLatitude, viewportBbox.southWestLongtitude, viewportBbox.northEastLongtitude]
    );

    const [viewport, setViewport] = React.useState<any>({
        zoom: calculatedZoom,
        latitude: center.latitude || 18.0583,
        longitude: center.longitude || 107.20623,
    });

    useEffect(() => {
        setViewport((prevViewport: any) => ({
            ...prevViewport,
            zoom: calculatedZoom,
            latitude: center.latitude || 18.0583,
            longitude: center.longitude || 107.20623,
        }));
    }, [calculatedZoom, center.latitude, center.longitude]);

    return (
        <ReactMapGL
            {...viewport}
            mapStyle={process.env.MAPBOX_STYLE}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            width="100%"
            height="100%"
            onViewportChange={(viewport: any) => {
                setViewport(viewport);
            }}
            className="relative"
        >
            <NavigationControl className="top-3 right-3" />
            <ScaleControl className="bottom-3 left-3" />
            {children}
        </ReactMapGL>
    );
};

export default memo(MapBase);
