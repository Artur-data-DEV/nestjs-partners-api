import { PartialType } from '@nestjs/mapped-types';
import { CreateEventsDto } from './create-event.dto';

export class UpdateEventsDto extends PartialType(CreateEventsDto) {}
