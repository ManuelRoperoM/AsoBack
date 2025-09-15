import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Rol } from 'src/roles/entities/roles.entity';
import { TramiteEstado } from 'src/tramite-estados/entities/tramite-estados.entity';
import { Observacion } from 'src/observaciones/entities/observaciones.entity';
import { Documento } from 'src/documentos/entities/documentos.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;

  @OneToMany(() => TramiteEstado, (tramiteEstado) => tramiteEstado.usuario)
  tramiteEstados: TramiteEstado[];

  @OneToMany(() => Observacion, (observacion) => observacion.usuario)
  observaciones: Observacion[];

  @OneToMany(() => Documento, (documento) => documento.usuario)
  documentos: Documento[];
}
