import axios from 'axios';

describe('GET /', () => {
    it('should return health', async () => {
        const res = await axios.get(`/`);

        expect(res.status).toBe(200);
        expect(res.data).toEqual({ healthy: true });
    });
});
describe('GET /api/statistics', () => {
    let response;

    beforeAll(async () => {
        try {
            response = await axios.get(`/api/statistics`);
        } catch (error) {
            console.error('Failed to fetch statistics:', error);
        }
    });

    it('should return the port calls statistics', () => {
        expect(response).toBeDefined();
        expect(response.data).toBeDefined();

        const { status, data } = response;

        expect(status).toBe(200);
        expect(data.top5Ports).toHaveLength(5);
        expect(data.bottom5Ports).toHaveLength(5);
        expect(data).toHaveProperty('portDurationStatistics');
    });

    it('should validate the top5Ports array', () => {
        const { top5Ports } = response.data;

        expect(Array.isArray(top5Ports)).toBe(true);
        expect(top5Ports.length).toBeLessThanOrEqual(5);

        top5Ports.forEach((portData) => {
            expect(Array.isArray(portData)).toBe(true);
            expect(portData).toHaveLength(2);

            const [port, count] = portData;

            expect(typeof port).toBe('string');
            expect(typeof count).toBe('number');

            expect(count).toBeGreaterThan(0);
        });
    });

    it('should validate the bottom5Ports array', () => {
        const { bottom5Ports } = response.data;

        expect(Array.isArray(bottom5Ports)).toBe(true);
        expect(bottom5Ports.length).toBeLessThanOrEqual(5);

        bottom5Ports.forEach((portData) => {
            expect(Array.isArray(portData)).toBe(true);
            expect(portData).toHaveLength(2);

            const [port, count] = portData;

            expect(typeof port).toBe('string');
            expect(typeof count).toBe('number');

            expect(count).toBeGreaterThanOrEqual(0);
        });
    });

    it('should validate the structure and values of each portDurationStatistics entry', () => {
        const { portDurationStatistics } = response.data;

        // Ensure each item in portDurationStatistics is an object with expected properties
        portDurationStatistics.forEach((portData) => {
            expect(typeof portData).toBe('object');
            expect(portData).toHaveProperty('port');
            expect(typeof portData.port).toBe('string');

            // Validate duration statistics properties (5, 20, 50, 75, 90) are strings representing numbers
            expect(portData).toHaveProperty('5');
            expect(portData).toHaveProperty('20');
            expect(portData).toHaveProperty('50');
            expect(portData).toHaveProperty('75');
            expect(portData).toHaveProperty('90');

            // Validate that each of these values is a string that can be parsed as a number
            expect(parseFloat(portData['5'])).toBeGreaterThan(0);
            expect(parseFloat(portData['20'])).toBeGreaterThan(0);
            expect(parseFloat(portData['50'])).toBeGreaterThan(0);
            expect(parseFloat(portData['75'])).toBeGreaterThan(0);
            expect(parseFloat(portData['90'])).toBeGreaterThan(0);
        });
    });
});
