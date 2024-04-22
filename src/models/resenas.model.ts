import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model({
  settings: {
    foreignKeys:
    {
      fkResenaClienteID: {
        name: 'fkResenaClienteID',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
    },
  },
})
export class Resenas extends Entity {
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
  comentario: string;

  @property({
    type: 'number',
    required: true,
  })
  calificacion: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<Resenas>) {
    super(data);
  }
}

export interface ResenasRelations {
  // describe navigational properties here
}

export type ResenasWithRelations = Resenas & ResenasRelations;
