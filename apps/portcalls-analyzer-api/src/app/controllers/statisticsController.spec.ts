import { FastifyReply, FastifyRequest } from 'fastify';
import { getStatistics } from './statisticsController';

describe('getStatistics Handler', () => {
    const mockPortChainService = {
        getVessels: jest.fn(),
        getPortCallsSchedules: jest.fn(),
    };

    const mockReply = {
        send: jest.fn(),
    } as unknown as FastifyReply;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should calculate statistics correctly', async () => {
        const vessels = [
            { imo: 9303807, name: 'ABIDJAN EXPRESS' },
            { imo: 9314935, name: 'AS CAROLINA' },
        ];
        const schedules = [
            {
                vessel: { imo: 9757187, name: 'MILANO BRIDGE' },
                portCalls: [
                    {
                        port: { id: 'Port1' },
                        isOmitted: false,
                        arrival: '2024-11-20T08:00:00Z',
                        departure: '2024-11-20T12:00:00Z',
                    },
                    {
                        port: { id: 'Port2' },
                        isOmitted: false,
                        arrival: '2024-11-21T10:00:00Z',
                        departure: '2024-11-21T18:00:00Z',
                    },
                ],
            },
            {
                vessel: { imo: 9314935, name: 'AS CAROLINA' },
                portCalls: [
                    {
                        port: { id: 'Port1' },
                        isOmitted: false,
                        arrival: '2024-11-22T14:00:00Z',
                        departure: '2024-11-22T18:00:00Z',
                    },
                ],
            },
            {
                vessel: { imo: 9314935, name: 'AS CAROLINA' },
                portCalls: [
                    {
                        port: { id: 'Port1' },
                        isOmitted: false,
                        arrival: '2024-11-22T14:00:00Z',
                        departure: '2024-11-22T18:00:00Z',
                    },
                ],
            },
        ];

        // Mock implementations
        mockPortChainService.getVessels.mockResolvedValue(vessels);
        mockPortChainService.getPortCallsSchedules.mockImplementation(async (imo) => {
            return schedules[vessels.findIndex((v) => v.imo === imo)];
        });

        const req = {
            server: { portChainService: mockPortChainService },
        } as unknown as FastifyRequest;

        // Call the handler
        await getStatistics(req, mockReply);

        // Assertions on send
        const expectedStatistics = {
            top5Ports: [
                ['Port1', 2],
                ['Port2', 1],
            ],
            bottom5Ports: [
                ['Port1', 2],
                ['Port2', 1],
            ],
            portDurationStatistics: [
                { port: 'Port1', 5: '4.00', 20: '4.00', 50: '4.00', 75: '4.00', 90: '4.00' },
                { port: 'Port2', 5: '8.00', 20: '8.00', 50: '8.00', 75: '8.00', 90: '8.00' },
            ],
        };
        expect(mockReply.send).toHaveBeenCalledWith(expectedStatistics);
    });

    it('should handle empty vessels gracefully', async () => {
        // Mock empty vessels
        mockPortChainService.getVessels.mockResolvedValue([]);

        const req = {
            server: { portChainService: mockPortChainService },
        } as unknown as FastifyRequest;

        // Call the handler
        await getStatistics(req, mockReply);

        // Assertions
        const expectedStatistics = {
            top5Ports: [],
            bottom5Ports: [],
            portDurationStatistics: [],
        };
        expect(mockReply.send).toHaveBeenCalledWith(expectedStatistics);
    });

    it('should ignore omitted port calls', async () => {
        // Mock input with omitted port calls
        const vessels = [{ imo: '123' }];
        const schedules = [
            {
                portCalls: [
                    {
                        port: { id: 'Port1' },
                        isOmitted: true,
                        arrival: '2024-11-20T08:00:00Z',
                        departure: '2024-11-20T12:00:00Z',
                    },
                ],
            },
        ];

        mockPortChainService.getVessels.mockResolvedValue(vessels);
        mockPortChainService.getPortCallsSchedules.mockResolvedValue(schedules[0]);

        const req = {
            server: { portChainService: mockPortChainService },
        } as unknown as FastifyRequest;

        // Call the handler
        await getStatistics(req, mockReply);

        // Assertions
        const expectedStatistics = {
            top5Ports: [],
            bottom5Ports: [],
            portDurationStatistics: [],
        };
        expect(mockReply.send).toHaveBeenCalledWith(expectedStatistics);
    });
});
