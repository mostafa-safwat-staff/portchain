import { Schedule, Vessel } from '../types/portChain.types';
import { PortChainService } from './PortChainService';
import axios from 'axios';

jest.mock('axios');

describe('PortChainService', () => {
    const baseUrl = 'https://api.portchain.com';
    let portChainService: PortChainService;

    beforeEach(() => {
        portChainService = new PortChainService({ baseUrl });
        console.log('>>>>4', portChainService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch vessels successfully', async () => {
        const vesselsMock: Vessel[] = [
            { imo: 1234567, name: 'Vessel A' },
            { imo: 7654321, name: 'Vessel B' },
        ];

        console.log('>>>>', portChainService);
        // Mock the axios instance
        (axios.create as jest.Mock).mockReturnValue({
            request: jest.fn().mockResolvedValue({ data: vesselsMock }),
        });

        const result = await portChainService.getVessels();
        expect(result).toEqual(vesselsMock);

        const axiosInstance = (axios.create as jest.Mock).mock.results[0].value;
        expect(axiosInstance.request).toHaveBeenCalledWith({
            url: '/api/v2/vessels',
            method: 'GET',
        });
    });

    it('should fetch a port calls successfully', async () => {
        const scheduleMock: Schedule = {
            vessel: { imo: 1234567, name: 'Vessel A' },
            portCalls: [
                {
                    port: { id: '1', name: 'Port X' },
                    updatedField: 'arrival',
                    arrival: '2024-11-25T10:00:00Z',
                    departure: '2024-11-26T14:00:00Z',
                    isOmitted: false,
                    createdDate: '2024-11-20T12:00:00Z',
                    service: 'Service A',
                    logEntries: [
                        {
                            updatedField: 'departure',
                            arrival: '2024-11-25T10:00:00Z',
                            departure: '2024-11-26T14:00:00Z',
                            isOmitted: null,
                            createdDate: '2024-11-20T12:00:00Z',
                        },
                    ],
                },
            ],
        };

        // Mock the axios instance
        (axios.create as jest.Mock).mockReturnValue({
            request: jest.fn().mockResolvedValue({ data: scheduleMock }),
        });

        const vesselId = 1234567;
        const result = await portChainService.getPortCallsSchedules(vesselId);
        expect(result).toEqual(scheduleMock);

        const axiosInstance = (axios.create as jest.Mock).mock.results[0].value;
        expect(axiosInstance.request).toHaveBeenCalledWith({
            url: `/api/v2/schedule/${vesselId}`,
            method: 'GET',
        });
    });

    it('should throw an error if the getVessels request fails', async () => {
        (axios.create as jest.Mock).mockReturnValue({
            request: jest.fn().mockRejectedValue(new Error('Network error')),
        });

        await expect(portChainService.getVessels()).rejects.toThrow('Network error');
    });

    it('should throw an error if the getSchedule request fails', async () => {
        (axios.create as jest.Mock).mockReturnValue({
            request: jest.fn().mockRejectedValue(new Error('Server error')),
        });

        const vesselId = 1234567;
        await expect(portChainService.getPortCallsSchedules(vesselId)).rejects.toThrow(
            'Server error'
        );
    });
});
