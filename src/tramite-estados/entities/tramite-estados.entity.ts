// tramite-estados.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Tramite } from 'src/tramites/entities/tramites.entity';
import { Estado } from 'src/estados/entities/estados.entity';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';

@Entity('tramite_estados')
export class TramiteEstado {
  @PrimaryGeneratedColumn()
  id_tramite_estado: number;

  @ManyToOne(() => Tramite, (tramite) => tramite.tramiteEstados)
  @JoinColumn({ name: 'id_tramite' })
  tramite: Tramite;

  @ManyToOne(() => Estado, (estado) => estado.tramiteEstados)
  @JoinColumn({ name: 'id_estado' })
  estado: Estado;

  @ManyToOne(() => Usuario, (usuario) => usuario.tramiteEstados)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}
