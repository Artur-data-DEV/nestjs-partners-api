import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpotsService } from '@app/core/spots/spots.service';
import { CriarAssentoRequest } from './request/criar-assento.request';
import { AtualizarAssentoRequest } from './request/atualizar-assento.request';

@Controller('eventos/:eventoId/assentos')
export class AssentosController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(
    @Body() criarAssentoRequest: CriarAssentoRequest,
    @Param('eventoId') eventoId: string,
  ) {
    return this.spotsService.create({
      eventId: eventoId,
      name: criarAssentoRequest.nome,
    });
  }

  @Get()
  findAll(@Param('eventoId') eventoId: string) {
    return this.spotsService.findAll(eventoId);
  }

  @Get(':id')
  findOne(@Param('id') spotId: string, @Param('eventoId') eventoId: string) {
    return this.spotsService.findOne(eventoId, spotId);
  }

  @Patch(':id')
  update(
    @Param('id') spotId: string,
    @Param('eventoId') eventoId: string,
    @Body() atualizarAssentoRequest: AtualizarAssentoRequest,
  ) {
    return this.spotsService.update(eventoId, spotId, {
      name: atualizarAssentoRequest.nome,
    });
  }

  @Delete(':id')
  remove(@Param('id') spotId: string, @Param('eventoId') eventoId: string) {
    return this.spotsService.remove(eventoId, spotId);
  }
}
