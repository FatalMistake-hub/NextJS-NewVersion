// export const calculateZoomVP = (southWestLatitude: any, northEastLatitude: any, southWestLongtitude: any, northEastLongtitude: any) => {
//     const mapWidth = 800; // Độ rộng của bản đồ
//     const WORLD_DIM = { height: 256, width: 256 };
//     const ZOOM_MAX = 20; // Zoom tối đa cho bản đồ
//     const latFraction = (southWestLatitude - northEastLatitude) / 180;
//     const lngFraction = (southWestLongtitude - northEastLongtitude) / 360;
//     const latZoom = isFinite(latFraction) ? Math.floor(Math.log(mapWidth / 256 / latFraction) / Math.LN2) : 0;
//     const lngZoom = isFinite(lngFraction) ? Math.floor(Math.log(mapWidth / 256 / lngFraction) / Math.LN2) : 0;
//     const zoom = Math.min(latZoom, lngZoom, ZOOM_MAX);
//     console.log(zoom,southWestLatitude, northEastLatitude, southWestLongtitude, northEastLongtitude,latFraction,lngFraction,latZoom,lngZoom );
//     return zoom-4;
//     // setViewport((prevViewport) => ({ ...prevViewport, zoom }));
// };

export const calculateZoomVP = (
    southWestLatitude: number,
    northEastLatitude: number,
    southWestLongitude: number,
    northEastLongitude: number,
): number => {
    const mapWidth = 800; // Độ rộng của bản đồ
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 20; // Zoom tối đa cho bản đồ
    const latFraction = (southWestLatitude - northEastLatitude) / 180;
    const lngFraction = (southWestLongitude - northEastLongitude) / 360;
    const latZoom = isFinite(latFraction) ? Math.floor(Math.log(mapWidth / WORLD_DIM.width / latFraction) / Math.LN2) : 0;
    const lngZoom = isFinite(lngFraction) ? Math.floor(Math.log(mapWidth / WORLD_DIM.height / lngFraction) / Math.LN2) : 0;
    const zoom = Math.min(latZoom, lngZoom, ZOOM_MAX);
    console.log(zoom, southWestLatitude, northEastLatitude, southWestLongitude, northEastLongitude, latFraction, lngFraction, latZoom, lngZoom);
    return zoom;
};
