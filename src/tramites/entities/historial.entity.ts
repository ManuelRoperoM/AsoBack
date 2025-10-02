import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Tramite } from './tramite.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('historial_tramite')
export class Historial {
  @PrimaryGeneratedColumn({ name: 'id_historial' })
  id_historial: number;

  @ManyToOne(() => Tramite, (t) => t.historial)
  @JoinColumn({ name: 'id_tramite' })
  tramite: Tramite;

  @ManyToOne(() => Usuario, (u) => u.historial, { eager: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ length: 100 })
  accion: string; // CREAR, ASIGNAR_GESTOR, CAMBIAR_ESTADO, OBSERVACION

  @Column({ type: 'text', nullable: true })
  detalle: string;

  @CreateDateColumn({ name: 'fecha' })
  fecha: Date;
}

