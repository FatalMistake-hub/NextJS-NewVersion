import React, { FC, PropsWithChildren } from 'react';
import ReactMapGL, { GeolocateControl, FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl';
// interface IMap extends PropsWithChildren<any> {
//     center: { longitude: number; latitude: number };
// }

const MapTrip: FC = () => {
const [viewport, setViewport] = React.useState({
    latitude: 10.762622,
    longitude: 106.660172,
    zoom: 14,
    // bearing: 0,
    // pitch: 0,
});

    return (
        <ReactMapGL
            {...viewport}
            mapStyle={process.env.MAPBOX_STYLE}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            // style={{ width: '100vw', height: '100vh' }}
            width="100%"
            height="100%"
            onViewportChange={(viewport: any) => setViewport(viewport)}
            className="relative"
        >
            <NavigationControl className="top-3 right-3" />
            <ScaleControl className="bottom-3 left-3" />
            {/* {children} */}
        </ReactMapGL>
    );
};

export default MapTrip;
