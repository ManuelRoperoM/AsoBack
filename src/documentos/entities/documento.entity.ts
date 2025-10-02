import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Tramite } from '../../tramites/entities/tramite.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn({ name: 'id_documento' })
  id_documento: number;

  @ManyToOne(() => Tramite, (t) => t.historial, { nullable: true })
  @JoinColumn({ name: 'id_tramite' })
  tramite: Tramite;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ length: 255 })
  nombre_archivo: string;

  @Column({ type: 'text' })
  ruta: string;

  @Column({ length: 50 })
  tipo: string;

  @CreateDateColumn({ name: 'fecha_subida' })
  fecha_subida: Date;
}

