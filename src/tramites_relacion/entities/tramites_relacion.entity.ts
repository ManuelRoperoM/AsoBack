import { TramitesTipos } from 'src/tramites_tipos/entities/tramites_tipos.entity';
import { SolicitudesTipos } from 'src/solicitudes_tipos/entities/solicitudes_tipos.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('tramites_relacion')
export class TramitesRelacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => TramitesTipos,
    (tramiteTipo) => tramiteTipo.tramitesRelacion,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'tramite_tipo_id' })
  tramiteTipo: TramitesTipos;

  @ManyToOne(
    () => SolicitudesTipos,
    (solicitudTipo) => solicitudTipo.tramitesRelacion,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'solicitud_tipo_id' })
  solicitudTipo: SolicitudesTipos;
}
