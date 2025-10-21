import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tramite } from '../../tramites/entities/tramites.entity';

@Entity('solicitantes_tipos')
export class SolicitantesTipos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  nombre: string;

  // 👇 Relación inversa (un tipo de solicitante puede tener varios trámites)
  @OneToMany(() => Tramite, (tramite) => tramite.solicitanteTipo)
  tipoSolicitud: Tramite[];
}
