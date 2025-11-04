import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('municipios')
export class Municipios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  nombre: string;

  @Column({ length: 10, nullable: true })
  caso: string;

  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.municipios, {
    nullable: true,
    eager: true,
  })
  gestorAsignado: Usuario;
}
