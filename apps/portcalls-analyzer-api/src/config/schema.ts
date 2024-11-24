const schema = {
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
};

export default schema;
