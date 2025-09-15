// roles.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({ length: 50 })
  nombre_rol: string;

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}
