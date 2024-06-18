import axios, { AxiosInstance } from 'axios';
class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.NEXT_APP_BASE_URL,
            timeout: 100000,
            headers: {
                'Content-Type': 'application/json',
            },
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
type CustomOptions = Omit<RequestInit, 'method'> & {
    baseUrl?: string | undefined;
};
export const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
    let body: FormData | string | undefined = undefined;
    if (options?.body instanceof FormData) {
        body = options.body;
    } else if (options?.body) {
        body = JSON.stringify(options.body);
    }
    const baseHeaders: {
        [key: string]: string;
    } =
        body instanceof FormData
            ? {}
            : {
                  'Content-Type': 'application/json',
              };

    const baseUrl = options?.baseUrl === undefined ? process.env.NEXT_APP_BASE_URL : options.baseUrl;

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers,
        } as any,
        body,
        method,
    });
    const payload: Response = await res.json();
    console.log('payload', payload);
    const data = {
        status: res.status,
        payload,
    };
    return data;
};

export const httpSever = {
    get<Response>(url: string, body?: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('GET', url, { ...options, body });
    },
    post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('POST', url, { ...options, body });
    },
    put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('PUT', url, { ...options, body });
    },
    delete<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('DELETE', url, { ...options });
    },
};

export const http = new Http().instance;
export const httpAuth = new HttpAuth().instance;
export const httpMap = new HttpMap().instance;
export const httpHost = new HttpHost().instance;
export const httpMapAddress = new HttpMapAddress().instance;
export const httpGptChat = new HttpGptChat().instance;
