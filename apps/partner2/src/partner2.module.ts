import { Module } from '@nestjs/common';
import { EventosModule } from './eventos/eventos.module';
import { AssentosModule } from './assentos/assentos.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/core/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.partner2' }),
    PrismaModule,
    EventosModule,
    AssentosModule,
  ],
})
export class Partner2Module {}
