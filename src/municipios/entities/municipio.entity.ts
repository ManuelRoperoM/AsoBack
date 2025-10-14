import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ciudad } from '../../ciudades/entities/ciudad.entity';

@Entity('municipios')
export class Municipio {
  @PrimaryGeneratedColumn({ name: 'id_municipio' })
  id_municipio: number;

  @Column({ length: 150, unique: true })
  nombre: string;

  @OneToMany(() => Ciudad, (c) => c.municipio)
  ciudades: Ciudad[];
}
