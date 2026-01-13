import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Inmueble } from '../../inmuebles/entities/inmuebles.entity';
import { TramitesRelacion } from '../../tramites_relacion/entities/tramites_relacion.entity';
import { Trazabilidad } from '../../trazabilidad/entities/trazabilidad.entity';
import { Documento } from '../../documentos/entities/documento.entity';
import { Titular } from '../../titulares/entities/titulares.entity';
import { SolicitantesTipos } from '../../solicitantes_tipos/entities/solicitantes_tipos.entity';

@Entity('tramites')
export class Tramite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, default: 'RADICADO' })
  estado: string;

  @Column({ name: 'codigo_aso', length: 50, nullable: true })
  codigoAso: string;

  // 🔹 Relación con la combinación de tipo de trámite y tipo de solicitud
  @ManyToOne(() => TramitesRelacion, { eager: true, nullable: false })
  tramiteRelacion: TramitesRelacion;

  @RelationId((tramite: Tramite) => tramite.tramiteRelacion)
  tramiteRelacionId: number;

  // 🔹 Solicitante (usuario que crea el trámite)
  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.tramitesSolicitados, {
    eager: true,
  })
  solicitante: Usuario;

  @RelationId((tramite: Tramite) => tramite.solicitante)
  solicitanteIdUsuario: number;

  // 🔹 Gestor asignado (usuario que gestiona el trámite)
  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.tramitesGestionados, {
    nullable: true,
    eager: true,
  })
  gestorAsignado: Usuario;
  @RelationId((tramite: Tramite) => tramite.solicitante)
  gestorAsignadoIdUsuario: number;

  // 🔹 Gestor auxiliar  (usuario que gestiona el trámite)
  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.tramitesGestionados, {
    nullable: true,
    eager: true,
  })
  gestorAuxiliar: Usuario;
  @RelationId((tramite: Tramite) => tramite.solicitante)
  gestorAuxiliarIdUsuario: number;

  // 🔹 Relación con inmuebles asociados al trámite
  @OneToMany(() => Inmueble, (inmueble: Inmueble) => inmueble.tramite, {
    cascade: true,
  })
  inmuebles: Inmueble[];

  @OneToMany(() => Trazabilidad, (trazabilidad) => trazabilidad.tramite, {
    cascade: true,
  })
  trazabilidades: Trazabilidad[];
  // 🔹 Texto explicativo de las razones del trámite
  @Column({ type: 'text', nullable: true })
  razones?: string;

  // 🔹 Auditoría
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
  // 🔹 Relación con titulares
  @OneToMany(() => Titular, (titular) => titular.tramite, {
    cascade: true,
  })
  titulares: Titular[];

  // 🔹 Relación con documentos
  @OneToMany(() => Documento, (documento) => documento.tramite, {
    cascade: true,
  })
  documentos: Documento[];

  // 👇 Relación con SolicitantesTipos
  @ManyToOne(
    () => SolicitantesTipos,
    (solicitanesTipo: SolicitantesTipos) => solicitanesTipo.tipoSolicitud,
    {
      nullable: true,
      eager: true,
    },
  )
  solicitanteTipo: SolicitantesTipos;
  @RelationId((tramite: Tramite) => tramite.solicitante)
  solicitanteTipoId: number;
}
