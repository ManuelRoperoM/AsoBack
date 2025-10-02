import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Tramite } from './tramite.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { TramiteEstado } from '../../tramite-estados/entities/tramite-estado.entity';

@Entity('observaciones')
export class Observacion {
  @PrimaryGeneratedColumn({ name: 'id_observacion' })
  id_observacion: number;

  @ManyToOne(() => Tramite, (tramite) => tramite.observaciones)
  @JoinColumn({ name: 'id_tramite' })
  tramite: Tramite;

  @ManyToOne(() => Usuario, (u) => u.observaciones, { eager: true })
  @JoinColumn({ name: 'id_autor' })
  autor: Usuario;

  @ManyToOne(() => TramiteEstado, { nullable: true, eager: true })
  @JoinColumn({ name: 'id_estado' })
  estado: TramiteEstado;

  @Column({ type: 'text' })
  contenido: string;

  @CreateDateColumn({ name: 'fecha' })
  fecha: Date;
}

