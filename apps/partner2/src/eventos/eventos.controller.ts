import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from '@app/core/events/events.service';
import { CriarEventoRequest } from './request/criar-evento.request';
import { AtualizarEventoRequest } from './request/atualizar-evento.request';
import { ReservarAssentoRequest } from './request/reservar-assento.request';
import { TicketKind } from '@prisma/client';
import { AuthGuard } from '@app/core/auth/auth.guard';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() criarEventoRequest: CriarEventoRequest) {
    return this.eventsService.create({
      name: criarEventoRequest.nome,
      description: criarEventoRequest.descricao,
      date: criarEventoRequest.data,
      price: criarEventoRequest.preco,
    });
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() atualizarEventoRequest: AtualizarEventoRequest,
  ) {
    return this.eventsService.update(id, {
      name: atualizarEventoRequest.nome,
      description: atualizarEventoRequest.descricao,
      date: atualizarEventoRequest.data,
      price: atualizarEventoRequest.preco,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/reservar')
  reserveSpots(
    @Body() reservarAssentoRequest: ReservarAssentoRequest,
    @Param('id') eventId: string,
  ) {
    return this.eventsService.reserveSpot({
      eventId,
      spots: reservarAssentoRequest.assentos,
      ticket_kind:
        reservarAssentoRequest.tipo_ingresso === 'inteira'
          ? TicketKind.full
          : TicketKind.half,
      email: reservarAssentoRequest.email,
    });
  }
}
