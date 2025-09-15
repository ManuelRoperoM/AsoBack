// documentos.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tramite } from 'src/tramites/entities/tramites.entity';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn()
  id_documento: number;

  @ManyToOne(() => Tramite, (tramite) => tramite.documentos)
  @JoinColumn({ name: 'id_tramite' })
  tramite: Tramite;

  @ManyToOne(() => Usuario, (usuario) => usuario.documentos)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ length: 255 })
  nombre_archivo: string;

  @Column({ length: 255 })
  ruta_archivo: string;

  @Column({ length: 50 })
  tipo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_subida: Date;
}
