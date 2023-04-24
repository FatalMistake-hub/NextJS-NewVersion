import React, { FC, PropsWithChildren } from 'react';
import Map from 'react-map-gl';

interface IMap extends PropsWithChildren<any> {
    center: { longitude: number; latitude: number };
}

const MapBase: FC<IMap> = ({ children, center }) => {
    const [viewport, setViewport] = React.useState({
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 14,
        // bearing: 0,
        // pitch: 0,
    });

    return (
        <Map
            initialViewState={viewport}
            mapStyle={process.env.MAPBOX_STYLE}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            style={{ width: '100vw', height: '100%' }}
            onMove={(viewport: any) => setViewport(viewport)}
        >
            {children}
        </Map>
    );
};

export default MapBase;
