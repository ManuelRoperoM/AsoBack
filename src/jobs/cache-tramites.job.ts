import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TramitesRepository } from 'src/tramites/tramites.repositry';
import { mapTramiteToCache } from 'src/tramites/mappers/tramite-to-cache.mapper';
import { format, subDays } from 'date-fns';
import { TramitesCacheService } from 'src/cache/tramites-cache.service';

@Injectable()
export class TramitesCacheJob {
  private readonly logger = new Logger(TramitesCacheJob.name);
  constructor(
    private readonly repo: TramitesRepository,
    private readonly cache: TramitesCacheService,
  ) {}
  //   @Cron('0 2 * * *', { timeZone: 'America/Bogota' })
  @Cron('* * * * *') // cada minuto
  async warmCache() {
    try {
      console.log('cron ejecutandose');

      const day = format(subDays(new Date(), 1), 'yyyy-MM-dd');

      const entities = await this.repo.getTramitesByDay(day);

      if (!entities.length) return;

      const data = entities.map(mapTramiteToCache);

      await this.cache.setDay(day, data);
    } catch (error) {
      this.logger.error('Error warming tramites cache', error);
    }
  }
}
