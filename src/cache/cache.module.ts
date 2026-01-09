import { Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { TramitesCacheService } from './tramites-cache.service';
@Module({
  providers: [RedisProvider, TramitesCacheService],
  exports: [RedisProvider, TramitesCacheService],
})
export class CacheModule {}
