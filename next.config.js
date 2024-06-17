const withPlugins = require('next-compose-plugins');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
module.exports = withPlugins([], {
    images: {
        domains: ['res.cloudinary.com', 'a0.muscache.com', 'bit.ly', 'tiki.vn'],
    },
    experimental: {
        forceSwcTransforms: true,
    },
    env: {
        NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoibmhhdDIxMzEzIiwiYSI6ImNsZ3Awb3FvejBhaDMzcnN1NWkzeGJudmwifQ.2ZO79jZEqHSkozC4Qh0Gfw',
        MAPBOX_STYLE: 'mapbox://styles/nhat21313/clgqcgh2y00k101r7dg0he141',
        MAPBOX_URL: 'https://api.mapbox.com/search/geocode/v6/',
        MAPBOX_ADDRESS_URL: 'https://maps.vnpost.vn/api',
        // NEXT_APP_BASE_URL: 'https://221.132.33.161:9000/api',
        NEXT_APP_BASE_URL: 'http://192.168.5.107:9000/api',
        // NEXTAUTH_URL: 'https://experience-travel.vercel.app',
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXTAUTH_SECRET: 'c8f18c19336ce5aa7fdb4aecab25feba',
    },
    runtime: 'nodejs',
    compilers: {
        styledComponents: true,
    }
});

// module.exports = {

// };
