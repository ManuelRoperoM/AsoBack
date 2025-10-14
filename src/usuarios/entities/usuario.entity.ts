import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tramite } from '../../tramites/entities/tramite.entity';
import { Observacion } from '../../observaciones/entities/observacion.entity';
import { Historial } from '../../tramites/entities/historial.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ length: 150 })
  nombre: string;

  @Column({ length: 150, unique: true })
  correo: string;

  @Column({ length: 200 })
  password: string;

  @Column({ length: 50, default: 'CIUDADANO' })
  rol: string; // ADMIN | GESTOR | CIUDADANO

  @OneToMany(() => Tramite, (tramite) => tramite.solicitante)
  tramitesSolicitados: Tramite[];

  @OneToMany(() => Tramite, (tramite) => tramite.gestorAsignado)
  tramitesGestionados: Tramite[];

  @OneToMany(() => Observacion, (obs) => obs.autor)
  observaciones: Observacion[];

  @OneToMany(() => Historial, (hist) => hist.usuario)
  historial: Historial[];
}
