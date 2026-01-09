import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tramite } from './entities/tramites.entity';

@Injectable()
export class TramitesRepository {
  constructor(
    @InjectRepository(Tramite)
    private readonly repo: Repository<Tramite>,
  ) {}

  async getLast24h(): Promise<Tramite[]> {
    return this.repo
      .createQueryBuilder('t')
      .where('t.fecha_creacion >= NOW() - INTERVAL 24 HOUR')
      .orderBy('t.fecha_creacion', 'ASC')
      .getMany();
  }

  async getTramitesByDay(day: string): Promise<Tramite[]> {
    return this.repo
      .createQueryBuilder('t')
      .where('t.fecha_creacion >= :from', { from: `${day} 00:00:00` })
      .andWhere('t.fecha_creacion < :to', { to: `${day} 23:59:59` })
      .orderBy('t.fecha_creacion', 'ASC')
      .getMany();
  }
}
