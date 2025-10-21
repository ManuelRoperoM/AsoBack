import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Tramite } from '../../tramites/entities/tramites.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('trazabilidad')
export class Trazabilidad {
  @PrimaryGeneratedColumn()
  id: number;

  // 🔹 Relación con el trámite
  @ManyToOne(() => Tramite, (tramite) => tramite.trazabilidades, {
    eager: true,
    onDelete: 'CASCADE',
  })
  tramite: Tramite;

  // 🔹 Usuario que realiza la acción (quien está logueado)
  @ManyToOne(() => Usuario, (usuario) => usuario.trazabilidadesHechas, {
    eager: true,
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  // 🔹 Gestor asignado (también usuario)
  @ManyToOne(() => Usuario, (usuario) => usuario.trazabilidadesGestionadas, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  gestor: Usuario;

  // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // fecha: Date;

  @CreateDateColumn({ type: 'datetime' })
  fecha: Date;

  @Column({
    type: 'enum',
    enum: ['RADICADO', 'EN PROCESO', 'FINALIZADO', 'ANULADO', 'VERIFICAR'],
    default: 'RADICADO',
  })
  estado: string;

  @Column({ type: 'text', nullable: true })
  observacion: string;
}
