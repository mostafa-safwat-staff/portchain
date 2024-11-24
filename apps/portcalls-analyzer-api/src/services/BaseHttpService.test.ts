// import axios, { AxiosInstance } from 'axios';
// import axiosRetry from 'axios-retry';
// import { BaseHttpService, BaseHttpServiceContext } from './BaseHttpService';

// jest.mock('axios');
// jest.mock('axios-retry');

// describe('BaseHttpService', () => {
//     const baseUrl = 'https://api.example.com';
//     const timeout = 10_000;
//     const retries = { retries: 3, retryDelay: jest.fn(() => 1000) };

//     class TestHttpService extends BaseHttpService {
//         public getBaseUrl(): string {
//             return this.baseUrl;
//         }
//         public getAxiosInstance(): AxiosInstance {
//             return this.makeRequest;
//         }
//     }

//     it('should initialize with default timeout and no retries', () => {
//         const context: BaseHttpServiceContext = { baseUrl };
//         const service = new TestHttpService(context);

//         expect(service.getBaseUrl()).toBe(baseUrl);
//         expect(service.getAxiosInstance().defaults.baseURL).toBe(baseUrl);
//         expect(service.getAxiosInstance().defaults.timeout).toBe(30_000);
//         expect(axiosRetry).not.toHaveBeenCalled();
//     });

//     it('should initialize with custom timeout and no retries', () => {
//         const context: BaseHttpServiceContext = { baseUrl, timeout };
//         const service = new TestHttpService(context);

//         expect(service.getBaseUrl()).toBe(baseUrl);
//         expect(service.getAxiosInstance().defaults.baseURL).toBe(baseUrl);
//         expect(service.getAxiosInstance().defaults.timeout).toBe(timeout);
//         expect(axiosRetry).not.toHaveBeenCalled();
//     });

//     it('should initialize with retries when provided', () => {
//         const context: BaseHttpServiceContext = { baseUrl, retries };
//         const service = new TestHttpService(context);

//         expect(service.getBaseUrl()).toBe(baseUrl);
//         expect(service.getAxiosInstance().defaults.baseURL).toBe(baseUrl);
//         expect(axiosRetry).toHaveBeenCalledWith(service.getAxiosInstance(), retries);
//     });

//     it('should initialize with both custom timeout and retries', () => {
//         const context: BaseHttpServiceContext = { baseUrl, timeout, retries };
//         const service = new TestHttpService(context);

//         expect(service.getBaseUrl()).toBe(baseUrl);
//         expect(service.getAxiosInstance().defaults.baseURL).toBe(baseUrl);
//         expect(service.getAxiosInstance().defaults.timeout).toBe(timeout);
//         expect(axiosRetry).toHaveBeenCalledWith(service.getAxiosInstance(), retries);
//     });
// });
