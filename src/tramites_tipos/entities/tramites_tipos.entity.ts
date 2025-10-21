import { TramitesRelacion } from 'src/tramites_relacion/entities/tramites_relacion.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tramites_tipos')
export class TramitesTipos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  nombre: string;

  @OneToMany(() => TramitesRelacion, (relacion) => relacion.tramiteTipo)
  tramitesRelacion: TramitesRelacion[];
}
