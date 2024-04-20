import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pago} from './pago.model';

@model({
  settings: {
    foreignKeys:
    {
      fkMetodoPagoPagoID: {
        name: 'fkMetodoPagoPagoID',
        entity: 'Pago',
        entityKey: 'id',
        foreignKey: 'pagoId'
      }
    }
  }
})

export class MetodoPago extends Entity {
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
  metodoPago: string;

  @belongsTo(() => Pago)
  pagoId: number;

  constructor(data?: Partial<MetodoPago>) {
    super(data);
  }
}

export interface MetodoPagoRelations {
  // describe navigational properties here
}

export type MetodoPagoWithRelations = MetodoPago & MetodoPagoRelations;
