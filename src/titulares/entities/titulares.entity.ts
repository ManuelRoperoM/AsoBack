import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tramite } from '../../tramites/entities/tramites.entity';

/**
 * Enum con tipos de documento válidos en Colombia
 */

@Entity('titulares')
export class Titular {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nombre: string;

  @Column({ length: 100, nullable: false })
  apellido: string;

  // 🔹 Tipo de documento usando Enum

  @Column({
    type: 'enum',
    enum: ['CC', 'TI', 'PA', 'NIT', 'RC'],
    default: 'CC',
  })
  tipoDocumento: string;

  @Column({ length: 20, nullable: false, unique: false })
  numeroDocumento: string;

  // 🔹 Relación con el trámite
  @ManyToOne(() => Tramite, (tramite) => tramite.titulares, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_tramite' })
  tramite: Tramite;
}
