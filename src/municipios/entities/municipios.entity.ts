// municipios.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tramite } from 'src/tramites/entities/tramites.entity';

@Entity('municipios')
export class Municipio {
  @PrimaryGeneratedColumn()
  id_municipio: number;

  @Column({ length: 100, unique: true })
  nombre_municipio: string;

  @OneToMany(() => Tramite, (tramite) => tramite.municipio)
  tramites: Tramite[];
}
