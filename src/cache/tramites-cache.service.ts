import { TramiteCache } from './interfaces/tramite.cache.interface';
import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class TramitesCacheService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
  ) {}

  private key(day: string) {
    return `tramites:${day}`;
  }

  async getDay(day: string): Promise<TramiteCache[] | null> {
    const cached = await this.redis.get(this.key(day));
    if (!cached) return null;

    try {
      return JSON.parse(cached);
    } catch {
      await this.redis.del(this.key(day));
      return null;
    }
  }

  async getDays(days: string[]): Promise<TramiteCache[]> {
    const keys = days.map((d) => this.key(d));
    const values = await this.redis.mget(keys);

    const result: TramiteCache[] = [];

    values.forEach((v, i) => {
      if (!v) return;
      try {
        result.push(...JSON.parse(v));
      } catch {
        this.redis.del(keys[i]);
      }
    });

    return result;
  }

  async setDay(day: string, data: TramiteCache[]): Promise<void> {
    await this.redis.set(
      this.key(day),
      JSON.stringify(data),
      'EX',
      60 * 60 * 24,
    );
  }

  // 👇 ESTE MÉTODO REEMPLAZA getHistorical
  async getHistorical(days: string[]): Promise<TramiteCache[]> {
    return this.getDays(days);
  }
}
