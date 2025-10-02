import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Municipio } from '../../municipios/entities/municipio.entity';
import { Tramite } from '../../tramites/entities/tramite.entity';

@Entity('ciudades')
export class Ciudad {
  @PrimaryGeneratedColumn({ name: 'id_ciudad' })
  id_ciudad: number;

  @Column({ length: 150 })
  nombre: string;

  @ManyToOne(() => Municipio, (m) => m.ciudades, { eager: true })
  @JoinColumn({ name: 'id_municipio' })
  municipio: Municipio;

  @OneToMany(() => Tramite, (t) => t.ciudad)
  tramites: Tramite[];
}

