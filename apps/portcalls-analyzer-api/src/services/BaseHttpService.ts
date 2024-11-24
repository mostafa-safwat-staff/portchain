import axios, { AxiosInstance } from 'axios';
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry';

export type BaseHttpServiceContext = {
    baseUrl: string;
    timeout?: number;
    retries?: Partial<Pick<IAxiosRetryConfig, 'retries' | 'retryDelay'>>;
};

const DEFAULT_TIMEOUT = 30_000;

export abstract class BaseHttpService {
    protected readonly makeRequest: AxiosInstance;

    protected readonly baseUrl: string;

    constructor(context: BaseHttpServiceContext) {
        const { baseUrl, timeout = DEFAULT_TIMEOUT, retries } = context;

        this.baseUrl = baseUrl;

        this.makeRequest = axios.create({
            baseURL: this.baseUrl,
            timeout,
        });

        if (retries) {
            axiosRetry(this.makeRequest, retries);
        }
    }
}
