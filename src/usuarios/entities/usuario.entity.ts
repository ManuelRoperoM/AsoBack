import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tramite } from '../../tramites/entities/tramites.entity';
import { Trazabilidad } from '../../trazabilidad/entities/trazabilidad.entity';
import { Municipios } from '../../municipios/entities/municipios.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column({
    type: 'enum',
    enum: ['CC', 'CE', 'PA', 'NIT'],
    default: 'CC',
  })
  tipoDocumento: string;

  @Column({ length: 20, nullable: false, unique: true })
  numeroDocumento: string;

  @Column({ length: 150 })
  nombre: string;

  @Column({ length: 15 })
  telefono: string;

  @Column({ length: 150, unique: true })
  correo: string;

  @Column({ length: 200 })
  password: string;

  @Column({
    type: 'enum',
    enum: [
      'ADMIN',
      'GESTOR',
      'USER',
      'COORDINADOR',
      'FUNCIONARIO',
      'SUPERVISOR',
      'ATENCION_AL_USUARIO',
      'CIUDADANO',
    ],
    default: 'USER',
  })
  rol: string;

  // 🔹 Trámites solicitados por el usuario
  @OneToMany(() => Tramite, (tramite) => tramite.solicitante)
  tramitesSolicitados: Tramite[];

  // 🔹 Trámites gestionados por el usuario (si es gestor)
  @OneToMany(() => Tramite, (tramite) => tramite.gestorAsignado)
  tramitesGestionados: Tramite[];

  // 🔹 Trazabilidades creadas por este usuario (acciones realizadas)
  @OneToMany(() => Trazabilidad, (trazabilidad) => trazabilidad.usuario)
  trazabilidadesHechas: Trazabilidad[];

  // 🔹 Trazabilidades donde el usuario figura como gestor
  @OneToMany(() => Trazabilidad, (trazabilidad) => trazabilidad.gestor)
  trazabilidadesGestionadas: Trazabilidad[];

  @OneToMany(() => Municipios, (municipio) => municipio.gestorAsignado)
  municipios: Municipios[];
}
