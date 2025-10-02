import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Observacion } from '../../observaciones/entities/observacion.entity';
import { Historial } from './historial.entity';
import { TramiteEstado } from '../../tramite-estados/entities/tramite-estado.entity';
import { Ciudad } from '../../ciudades/entities/ciudad.entity';

@Entity('tramites')
export class Tramite {
  @PrimaryGeneratedColumn({ name: 'id_tramite' })
  id_tramite: number;

  @Column({ length: 200 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ManyToOne(() => TramiteEstado, (e) => e.id_estado, { eager: true, nullable: true })
  @JoinColumn({ name: 'id_estado' })
  estadoEntity: TramiteEstado;

  @Column({ length: 50, default: 'RADICADO' })
  estado: string;

  @ManyToOne(() => Usuario, (user) => user.tramitesSolicitados, { eager: true })
  @JoinColumn({ name: 'id_solicitante' })
  solicitante: Usuario;

  @ManyToOne(() => Usuario, (user) => user.tramitesGestionados, { nullable: true, eager: true })
  @JoinColumn({ name: 'id_gestor_asignado' })
  gestorAsignado: Usuario;

  @ManyToOne(() => Ciudad, (c) => c.tramites, { nullable: true, eager: true })
  @JoinColumn({ name: 'id_ciudad' })
  ciudad: Ciudad;

  @Column({ length: 200, nullable: true })
  notaria: string;

  @OneToMany(() => Observacion, (obs) => obs.tramite, { cascade: true })
  observaciones: Observacion[];

  @OneToMany(() => Historial, (his) => his.tramite, { cascade: true })
  historial: Historial[];

  @CreateDateColumn({ name: 'creado_en' })
  creado_en: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizado_en: Date;
}

