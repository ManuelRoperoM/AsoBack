import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tramite } from './entities/tramites.entity';
import { TramitesService } from './tramites.service';
import { TramitesController } from './tramites.controller';
import { TramitesRelacion } from '../tramites_relacion/entities/tramites_relacion.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Inmueble } from '../inmuebles/entities/inmuebles.entity';
import { SolicitantesTipos } from '../solicitantes_tipos/entities/solicitantes_tipos.entity';
import { InmueblesService } from 'src/inmuebles/inmuebles.service';
import { InmueblesModule } from 'src/inmuebles/inmuebles.module';
import { Ciudades } from 'src/ciudades/entities/ciudades.entity';
import { Municipios } from 'src/municipios/entities/municipios.entity';
import { DocumentosModule } from 'src/documentos/documentos.module';
import { Documento } from 'src/documentos/entities/documento.entity';
import { TitularesModule } from 'src/titulares/titulares.module';
import { TrazabilidadService } from 'src/trazabilidad/trazabilidad.service';
import { TrazabilidadModule } from 'src/trazabilidad/trazabilidad.module';
import { Trazabilidad } from 'src/trazabilidad/entities/trazabilidad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tramite,
      TramitesRelacion,
      Usuario,
      Inmueble,
      SolicitantesTipos,
      Ciudades,
      Municipios,
      Documento,
      Trazabilidad,
    ]),
    InmueblesModule,
    DocumentosModule,
    TitularesModule,
    TrazabilidadModule,
  ],
  controllers: [TramitesController],
  providers: [TramitesService, InmueblesService, TrazabilidadService],
  exports: [TramitesService],
})
export class TramitesModule {}
