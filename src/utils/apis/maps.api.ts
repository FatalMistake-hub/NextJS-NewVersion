import { httpMap, httpMapAddress } from '../instance/http';

export const searchLocation = async (query: string | undefined) =>
    await httpMap.get<any>('forward', {
        params: {
            q: query,
            country: 'vn',
            language: 'en',
            proximity: 'ip',
            access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        },
    });
export const searchByCoordinate = async (longitude?: number, latitude?: number) =>
    await httpMap.get<any>('reverse', {
        params: {
            longitude: longitude,
            latitude: latitude,
            country: 'vn',
            // language: 'en',
            // proximity: 'ip',
            access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        },
    });
export const searchAddress = async (query: string) => {
    const apiKey = '8fb3246c12d442525034be04bcd038f22e34571be4adbd4c';

    return await httpMapAddress.get<any>(`search?text=${encodeURIComponent(query)}&apikey=${apiKey}&formatOut=nominatim&api-version=1.1`);
};
