import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inmueble } from './entities/inmuebles.entity';
import { CreateInmuebleDto } from './dto/create-inmuebles.dto';
import { UpdateInmuebleDto } from './dto/update-inmuebles.dto';
import { Ciudades } from 'src/ciudades/entities/ciudades.entity';
import { Municipios } from 'src/municipios/entities/municipios.entity';
import { Tramite } from 'src/tramites/entities/tramites.entity';

@Injectable()
export class InmueblesService {
  constructor(
    @InjectRepository(Inmueble)
    private readonly repo: Repository<Inmueble>,

    @InjectRepository(Ciudades)
    private readonly ciudadesRepo: Repository<Ciudades>,

    @InjectRepository(Municipios)
    private readonly municipiosRepo: Repository<Municipios>,

    @InjectRepository(Tramite)
    private readonly tramiteRepo: Repository<Tramite>,
  ) {}

  async create(dto: CreateInmuebleDto) {
    const municipio = await this.municipiosRepo.findOne({
      where: { id: dto.municipio_id },
    });

    console.log('Municipio: ', municipio);

    if (!municipio) throw new NotFoundException('Municipios no encontrados');

    const inmueble = this.repo.create({
      ...dto,
      municipio,
    });

    return this.repo.save(inmueble);
  }

  async createByTramite(idTramite: number, dto: CreateInmuebleDto) {
    const existTramite = await this.tramiteRepo.findOne({
      where: { id: idTramite },
    });

    if (!existTramite) {
      throw new NotFoundException(
        `No se encontro el tramite con id ${idTramite}`,
      );
    }

    const tramiteInmuebleExist = await this.repo.findOne({
      where: {
        tramite: {
          id: existTramite.id,
        },
      },
    });

    console.log('Tramite inmueble:', tramiteInmuebleExist);

    if (tramiteInmuebleExist) {
      throw new BadRequestException(`El tramite ya tiene un inmueble asingado`);
    }

    const municipio = await this.municipiosRepo.findOne({
      where: { id: dto.municipio_id },
    });

    if (!municipio) throw new NotFoundException('Municipios no encontrados');

    const inmueble = this.repo.create({
      tipo: dto.tipo,
      municipio: municipio,
      ficha: dto.ficha,
      matricula: dto.matricula,
      tramite: existTramite,
    });

    return this.repo.save(inmueble);
  }

  findAll() {
    return this.repo.find({ relations: ['tramite'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['tramite'] });
  }

  async update(id_inmueble: number, dto: UpdateInmuebleDto) {
    await this.repo.update(id_inmueble, dto);
    return this.findOne(id_inmueble);
  }

  async remove(id_inmueble: number) {
    const inmueble = await this.findOne(id_inmueble);
    if (inmueble) {
      await this.repo.delete(id_inmueble);
    }
    return inmueble;
  }
}
