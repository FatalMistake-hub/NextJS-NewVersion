import axios, { AxiosInstance } from 'axios';

class HttpBase {
    instance: AxiosInstance;

    constructor(baseURL?: string, timeout?: number) {
        this.instance = axios.create({
            baseURL: baseURL,
            timeout: timeout,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
class Http extends HttpBase {
    constructor() {
        super(process.env.BASE_URL, 10000);
    }
}

class HttpAuth extends HttpBase {
    constructor() {
        super(process.env.AUTH_URL, 10000);
    }
}

class HttpMap extends HttpBase {
    constructor() {
        super(process.env.MAPBOX_URL, 10000);
    }
}

class HttpHost extends HttpBase {
    constructor() {
        super(process.env.HOST_URL, 10000);
    }
}

class HttpMapAddress extends HttpBase {
    constructor() {
        super(process.env.MAP_ADDRESS_URL, 10000);
    }
}

class HttpGptChat extends HttpBase {
    constructor() {
        super(process.env.NEXT_APP_BASE_URL, 300000);
    }
}

export type CustomOptions = Omit<RequestInit, 'method'> & {
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
    console.log('url', url);
    const data = {
        status: res.status,
        payload,
    };
    return data;
};

export const httpSever = {
    get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('GET', url, { ...options });
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
