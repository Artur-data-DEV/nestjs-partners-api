import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { SpotStatus } from '@prisma/client';

type CreateSpotInput = CreateSpotDto & {
  eventId: string;
};

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}
  async create(createSpotDto: CreateSpotInput) {
    const event = await this.prismaService.event.findFirst({
      where: { id: createSpotDto.eventId },
    });
    const spot = await this.prismaService.spot.findFirst({
      where: { eventId: createSpotDto.eventId, name: createSpotDto.name },
    });
    if (!event) {
      throw new Error('Event not found');
    }
    if (spot) {
      throw new Error('Spot already exists');
    }
    return this.prismaService.spot.create({
      data: { ...createSpotDto, status: SpotStatus.avaiable },
    });
  }

  findAll(eventId: string) {
    return this.prismaService.spot.findMany({ where: { eventId } });
  }

  findOne(eventId: string, spotId: string) {
    return this.prismaService.spot.findFirst({
      where: { id: spotId, eventId },
    });
  }

  async update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    const spot = await this.prismaService.spot.findFirst({
      where: { id: spotId, eventId },
    });

    if (!spot) {
      throw new Error('Spot not found in the provided event');
    }
    return this.prismaService.spot.update({
      where: { id: spotId },
      data: { ...updateSpotDto },
    });
  }

  remove(eventId: string, spotId: string) {
    return this.prismaService.spot.delete({ where: { id: spotId, eventId } });
  }
}
