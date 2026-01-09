import Redis from 'ioredis';

export const RedisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    const client = new Redis({
      host: process.env.REDIS_HOST ?? '127.0.0.1',
      port: Number(process.env.CACHE_PORT ?? 6379),
    });

    client.on('connect', () => {
      console.log('🟢 Redis conectado');
    });

    client.on('error', (err) => {
      console.error('🔴 Redis error', err);
    });

    return client;
  },
};
