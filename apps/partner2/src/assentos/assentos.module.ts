import { Module } from '@nestjs/common';
import { SpotsCoreModule } from '@app/core/spots/spots-core.module';
import { AssentosController } from './assentos.controller';

@Module({
  imports: [SpotsCoreModule],
  controllers: [AssentosController],
})
export class AssentosModule {}
