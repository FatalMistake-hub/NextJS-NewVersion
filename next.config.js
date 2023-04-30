const withPlugins = require('next-compose-plugins');
module.exports = withPlugins([], {
    images: {
        domains: [
            'www.google.com',
            'dimg04.c-ctrip.com',
            'links.papareact.com',
            'airbnb-web-clone.vercel.app',
            'upload.wikimedia.org',
            'a0.muscache.com',
        ],
    },
    experimental: {
        forceSwcTransforms: true,
    },
    env: {
        GOOGLE_MAPS_API_KEY: 'AIzaSyDmqhwSvxnTbBPWxvQVTpu9lWME-JZvul0',
        NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoibmhhdDIxMzEzIiwiYSI6ImNsZ3Awb3FvejBhaDMzcnN1NWkzeGJudmwifQ.2ZO79jZEqHSkozC4Qh0Gfw',
        MAPBOX_STYLE: 'mapbox://styles/nhat21313/clgqcgh2y00k101r7dg0he141',
        MAPBOX_URL: 'https://api.mapbox.com/search/geocode/v6/forward',
        NEXT_APP_BASE_URL: 'http://221.132.33.161:9000/api',
        NEXTAUTH_URL: 'https://experience-travel.vercel.app',
        NEXTAUTH_SECRET: 'c8f18c19336ce5aa7fdb4aecab25feba',
    },
});

// module.exports = {

// };
