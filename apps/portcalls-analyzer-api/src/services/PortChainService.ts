import { Schedule, Vessel } from '../types/portChain.types';
import { BaseHttpService } from './BaseHttpService';

export type Context = {
    baseUrl: string;
};

export class PortChainService extends BaseHttpService {
    public constructor(context: Context) {
        const { baseUrl } = context;

        super({ baseUrl });
    }

    public async getVessels(): Promise<Vessel[]> {
        const endpoint = '/api/v2/vessels';

        const { data } = await this.makeRequest<Vessel[]>(endpoint, {
            method: 'GET',
        });

        return data;
    }

    public async getPortCallsSchedules(vesselId: number): Promise<Schedule> {
        const endpoint = `/api/v2/schedule/${vesselId}`;

        const { data } = await this.makeRequest<Schedule>(endpoint, {
            method: 'GET',
        });

        return data;
    }
}
