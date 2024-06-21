enum TicketKind_BR {
  inteira = 'inteira',
  meia = 'meia',
}

export class ReservarAssentoRequest {
  assentos: string[];
  tipo_ingresso: TicketKind_BR;
  email: string;
}
