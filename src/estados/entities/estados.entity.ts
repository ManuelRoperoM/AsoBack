// estados.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tramite } from 'src/tramites/entities/tramites.entity';
import { TramiteEstado } from 'src/tramite-estados/entities/tramite-estados.entity';

@Entity('estados')
export class Estado {
  @PrimaryGeneratedColumn()
  id_estado: number;

  @Column({ length: 50, unique: true })
  nombre_estado: string;

  @OneToMany(() => Tramite, (tramite) => tramite.estadoActual)
  tramites: Tramite[];

  @OneToMany(() => TramiteEstado, (tramiteEstado) => tramiteEstado.estado)
  tramiteEstados: TramiteEstado[];
}
