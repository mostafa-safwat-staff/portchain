import Fastify from 'fastify';
import { app } from './app/app';
import fastifyEnv from '@fastify/env';
import schema from './config/schema';
import cors from '@fastify/cors';

// Instantiate Fastify with some config
const server = Fastify({
    logger: true,
});

// Register CORS plugin
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Register Environment Variable
server.register(fastifyEnv, {
    confKey: 'config',
    schema,
    dotenv: true,
});

// Register the application as a normal plugin.
server.register(app);

// Start the server after all plugins registered.
server.ready((err) => {
    if (err) throw err;

    // Get PORT and HOST from process.env or config
    const port = process.env.PORT || server.config.PORT;
    const host = process.env.HOST || server.config.HOST || '0.0.0.0';

    // Start listening.
    server.listen({ port, host }, (err) => {
        if (err) {
            server.log.error(err);
            process.exit(1);
        } else {
            console.log(`[ ready ] http://${host}:${port}`);
        }
    });
});
