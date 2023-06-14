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
    // const { viewport: view, latitude, longitude } = useAppSelector(selectSearch);

    const calculatedZoom = useMemo(
        () =>
            calculateZoomVP(
                viewportBbox.southWestLatitude,
                viewportBbox.northEastLatitude,
                viewportBbox.southWestLongtitude,
                viewportBbox.northEastLongtitude,
            ),
        [viewportBbox],
    );
    const [viewport, setViewport] = React.useState<any>({
        longitude: 107.20623,
        latitude: 18.0583,
        zoom: calculatedZoom,
        // latitude: center.latitude,
        // longitude: center.longitude,
    });
    return (
        <ReactMapGL
            {...viewport}
            zoom={
                // viewport.zoom?.toString().length > 0
                viewport.zoom ? viewport.zoom : calculatedZoom
            }
            mapStyle={process.env.MAPBOX_STYLE}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            // style={{ width: '100vw', height: '100vh' }}
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
