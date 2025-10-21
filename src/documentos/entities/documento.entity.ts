import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Tramite } from '../../tramites/entities/tramites.entity';

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  // 🔹 Relación con trámite (ya no con usuario)
  @ManyToOne(() => Tramite, (tramite) => tramite.documentos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_tramite' })
  tramite: Tramite;

  @Column({ length: 255 })
  nombre_archivo: string;

  @Column({ type: 'text' })
  ruta: string;

  @Column({ length: 50 })
  tipo: string;

  @CreateDateColumn({ name: 'fecha_subida' })
  fecha_subida: Date;
}
