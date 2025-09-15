// tramites.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Municipio } from 'src/municipios/entities/municipios.entity';
import { Estado } from 'src/estados/entities/estados.entity';
import { TramiteEstado } from 'src/tramite-estados/entities/tramite-estados.entity';
import { Observacion } from 'src/observaciones/entities/observaciones.entity';
import { Documento } from 'src/documentos/entities/documentos.entity';

@Entity('tramites')
export class Tramite {
  @PrimaryGeneratedColumn()
  id_tramite: number;

  @Column({ default: 'Catastral' })
  tipo_tramite: string;

  @Column({ length: 100 })
  usuario_solicitante: string;

  @ManyToOne(() => Municipio, (municipio) => municipio.tramites)
  @JoinColumn({ name: 'id_municipio' })
  municipio: Municipio;

  @ManyToOne(() => Estado, (estado) => estado.tramites)
  @JoinColumn({ name: 'id_estado_actual' })
  estadoActual: Estado;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_radicacion: Date;

  @OneToMany(() => TramiteEstado, (tramiteEstado) => tramiteEstado.tramite)
  tramiteEstados: TramiteEstado[];

  @OneToMany(() => Observacion, (observacion) => observacion.tramite)
  observaciones: Observacion[];

  @OneToMany(() => Documento, (documento) => documento.tramite)
  documentos: Documento[];
}
