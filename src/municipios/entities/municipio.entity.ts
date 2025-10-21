import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('municipios')
export class Municipio {
  @PrimaryGeneratedColumn({ name: 'id_municipio' })
  id_municipio: number;

  @Column({ length: 150, unique: true })
  nombre: string;
}

