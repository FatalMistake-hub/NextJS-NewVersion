import axios, { AxiosInstance } from 'axios';
const https = require('https');
class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.NEXT_APP_BASE_URL,
            timeout: 100000,
            headers: {
                'Content-Type': 'application/json',
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        });
    }
}
class HttpHost {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.NEXT_APP_BASE_URL,
            timeout: 100000,
            headers: {
                'Content-Type': 'application/json',
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        });
    }
}
class HttpAuth {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.NEXT_APP_BASE_URL,
            timeout: 100000,
            headers: {
                'Content-Type': 'application/json',
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        });
    }
}
class HttpMap {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.MAPBOX_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
    }
}
class HttpGptChat {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.NEXT_APP_BASE_URL,
            timeout: 300000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
class HttpMapAddress {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.MAPBOX_ADDRESS_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export const http = new Http().instance;
export const httpAuth = new HttpAuth().instance;
export const httpMap = new HttpMap().instance;
export const httpHost = new HttpHost().instance;
export const httpMapAddress = new HttpMapAddress().instance;
export const httpGptChat = new HttpGptChat().instance;
