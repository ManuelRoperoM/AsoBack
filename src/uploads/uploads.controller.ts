import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import type { Express } from 'express'; // ✅ se usa 'type' para evitar conflictos

@Controller('api')
export class UploadsController {
  @Post('upload-files') // ✅ Cambiado de 'upload' → 'upload-files'
  @UseInterceptors(
    FileInterceptor('archivo', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const codigoAso = req.body.codigoAso;

          if (!codigoAso) {
            return cb(new Error("El campo 'codigoAso' es obligatorio"), '');
          }

          // 📂 Guardar en /dataset/<codigoAso>
          const basePath = path.join(__dirname, '../../dataset', codigoAso);

          if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true });
          }

          cb(null, basePath);
        },
        filename: (req, file, cb) => {
          // ✅ Se conserva el nombre original
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    return {
      mensaje: '✅ Archivo subido correctamente',
      nombre: file.originalname,
      ruta: file.path,
      codigoAso: body.codigoAso,
    };
  }
}
