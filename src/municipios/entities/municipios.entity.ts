import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('municipios')
export class Municipios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  nombre: string;
}
