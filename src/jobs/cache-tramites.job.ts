import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TramitesRepository } from 'src/tramites/tramites.repositry';
import { mapTramiteToCache } from 'src/tramites/mappers/tramite-to-cache.mapper';
import { format, subDays } from 'date-fns';
import { TramitesCacheService } from 'src/cache/tramites-cache.service';

@Injectable()
export class TramitesCacheJob {
  constructor(
    private readonly repo: TramitesRepository,
    private readonly cache: TramitesCacheService,
  ) {}
  //   @Cron('0 2 * * *', { timeZone: 'America/Bogota' })
  @Cron('* * * * *') // cada minuto
  async warmCache() {
    try {
      console.log('Cron vivo');

      const yesterdayDay = format(subDays(new Date(), 1), 'yyyy-MM-dd');
      const hasCache = await this.cache.hasAnyDay();

      if (!hasCache) {
        console.log('🟡 Redis vacío → carga histórica completa');

        const allDays = await this.repo.getAllHistoricalDays();
        for (const day of allDays) {
          const entities = await this.repo.getTramitesByDay(day);
          if (!entities.length) continue;

          await this.cache.setDay(day, entities.map(mapTramiteToCache));
          // const data = entities.map((e, i) => {
          //   if (!e) {
          //     console.log('❌ Entity undefined en índice', i);
          //     return null;
          //   }
          //   return mapTramiteToCache(e);
          // });

          // console.log(
          //   'Data con nulls:',
          //   data.filter((d) => !d),
          // );
        }

        return;
      }

      console.log('🟢 Redis inicializado → carga incremental');

      const alreadyCached = await this.cache.getDay(yesterdayDay);
      if (alreadyCached?.length) {
        console.log('🟢 Ayer ya estaba cacheado');
        return;
      }

      const entities = await this.repo.getTramitesByDay(yesterdayDay);
      if (!entities.length) {
        console.log('No hay trámites nuevos para', yesterdayDay);
        return;
      }

      await this.cache.setDay(yesterdayDay, entities.map(mapTramiteToCache));

      console.log('🟢 Cache guardado para', yesterdayDay);
    } catch (error) {
      console.error('🔴 ERROR EN CRON', error);
    }
  }
}
