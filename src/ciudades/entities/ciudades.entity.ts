import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ciudades')
export class Ciudades {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  nombre: string;
}
