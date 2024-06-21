import { PartialType } from '@nestjs/mapped-types';
import { CriarAssentoRequest } from './criar-assento.request';

export class AtualizarAssentoRequest extends PartialType(CriarAssentoRequest) {}
