export const calculateZoomVP = (southWestLatitude: any, northEastLatitude: any, southWestLongtitude: any, northEastLongtitude: any) => {
    const mapWidth = 800; // Độ rộng của bản đồ
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 20; // Zoom tối đa cho bản đồ
    const latFraction = (southWestLatitude - northEastLatitude) / 180;
    const lngFraction = (southWestLongtitude - northEastLongtitude) / 360;
    const latZoom = Math.floor(Math.log(mapWidth / 256 / latFraction) / Math.LN2);
    const lngZoom = Math.floor(Math.log(mapWidth / 256 / lngFraction) / Math.LN2);
    const zoom = Math.min(latZoom, lngZoom, ZOOM_MAX);
    console.log(zoom);
    return zoom;
    // setViewport((prevViewport) => ({ ...prevViewport, zoom }));
};
// export const calculateZoomCoordinate = () => {
//     const mapWidth = 800; // Độ rộng của bản đồ
//     const WORLD_DIM = { height: 256, width: 256 };
//     const ZOOM_MAX = 20; // Zoom tối đa cho bản đồ

//     const lat1 = northEastLatitude; // Latitude của điểm đầu
//     const lon1 = northEastLongtitude; // Longitude của điểm đầu
//     const lat2 = southWestLatitude; // Latitude của điểm cuối
//     const lon2 = southWestLongtitude; // Longitude của điểm cuối

//     const distance = Math.sqrt(Math.pow(lon2 - lon1, 2) + Math.pow(lat2 - lat1, 2));

//     const zoom = Math.floor(Math.log((mapWidth / distance) * WORLD_DIM.width) / Math.LN2);
//     const adjustedZoom = Math.min(zoom, ZOOM_MAX);

//     setViewport((prevViewport) => ({ ...prevViewport, zoom: adjustedZoom }));
// };
