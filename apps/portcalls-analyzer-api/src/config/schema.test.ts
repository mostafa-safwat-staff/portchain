// schema.test.js
import schema from './schema';

describe('Schema Validation', () => {
    test('should validate the schema structure', () => {
        expect(schema).toEqual({
            type: 'object',
            required: ['HOST', 'PORT', 'BASE_PORT_CHAIN_API_URL'],
            properties: {
                HOST: {
                    type: 'string',
                    default: 'localhost',
                },
                PORT: {
                    type: 'string',
                    default: 3001,
                },
                BASE_PORT_CHAIN_API_URL: {
                    type: 'string',
                },
            },
        });
    });

    test('should have required fields', () => {
        expect(schema.required).toContain('HOST');
        expect(schema.required).toContain('PORT');
        expect(schema.required).toContain('BASE_PORT_CHAIN_API_URL');
    });

    test('default values should be correct', () => {
        const { HOST, PORT } = schema.properties;
        expect(HOST.default).toBe('localhost');
        expect(PORT.default).toBe(3001);
    });

    test('all properties should have correct types', () => {
        const { HOST, PORT, BASE_PORT_CHAIN_API_URL } = schema.properties;
        expect(HOST.type).toBe('string');
        expect(PORT.type).toBe('string');
        expect(BASE_PORT_CHAIN_API_URL.type).toBe('string');
    });
});
