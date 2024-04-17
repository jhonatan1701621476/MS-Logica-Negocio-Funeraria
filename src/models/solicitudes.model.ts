import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Beneficiario} from './beneficiario.model';
import {SedesFuneraria} from './sedes-funeraria.model';

@model()
export class Solicitudes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'string',
  })
  observaciones?: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoSolicitud: string;

  @belongsTo(() => Beneficiario)
  beneficiarioId: number;

  @belongsTo(() => SedesFuneraria)
  sedesFunerariaId: number;

  constructor(data?: Partial<Solicitudes>) {
    super(data);
  }
}

export interface SolicitudesRelations {
  // describe navigational properties here
}

export type SolicitudesWithRelations = Solicitudes & SolicitudesRelations;
