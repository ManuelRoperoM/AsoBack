import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tramite_estados')
export class TramiteEstado {
  @PrimaryGeneratedColumn({ name: 'id_estado' })
  id_estado: number;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
}

