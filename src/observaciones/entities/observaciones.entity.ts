// observaciones.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tramite } from 'src/tramites/entities/tramites.entity';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';

@Entity('observaciones')
export class Observacion {
  @PrimaryGeneratedColumn()
  id_observacion: number;

  @ManyToOne(() => Tramite, (tramite) => tramite.observaciones)
  @JoinColumn({ name: 'id_tramite' })
  tramite: Tramite;

  @ManyToOne(() => Usuario, (usuario) => usuario.observaciones)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column('text')
  observacion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}
