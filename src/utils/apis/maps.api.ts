
import { httpMap } from '../instance/http';

export const searchLocation = async (query: string|undefined) =>
    await httpMap.get<any>('', {
        params: {
            q: query,
            country: 'vn',
            language: 'en',
            proximity: 'ip',
            access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        },
    });
