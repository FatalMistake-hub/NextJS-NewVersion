import axios, { AxiosInstance } from 'axios';

class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.NEXT_APP_BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
class HttpAuth {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.NEXT_APP_BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export const http = new Http().instance;
export const httpAuth = new HttpAuth().instance;


