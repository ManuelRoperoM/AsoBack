import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TramitesRelacion } from 'src/tramites_relacion/entities/tramites_relacion.entity';

@Entity('solicitudes_tipo')
export class SolicitudesTipos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120, nullable: true })
  nombre: string;

  @OneToMany(() => TramitesRelacion, (relacion) => relacion.solicitudTipo)
  tramitesRelacion: TramitesRelacion[];
}
