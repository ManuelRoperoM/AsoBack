import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tramite } from '../../tramites/entities/tramites.entity';
import { Municipios } from '../../municipios/entities/municipios.entity';

@Entity('inmuebles')
export class Inmueble {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['URBANO', 'RURAL'] })
  tipo: 'URBANO' | 'RURAL';

  @ManyToOne(() => Municipios, { nullable: true })
  @JoinColumn({ name: 'codigo_municipio' })
  municipio: Municipios;

  @Column({ type: 'varchar', length: 50, nullable: true })
  matricula: string;

  @Column({ type: 'varchar', nullable: true })
  ficha: string;

  @ManyToOne(() => Tramite, (tramite) => tramite.inmuebles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_tramite' })
  tramite: Tramite;
}
