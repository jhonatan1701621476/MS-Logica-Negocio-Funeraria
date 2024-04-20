import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Beneficiario} from './beneficiario.model';

@model({
  settings: {
    foreignKeys:
    {
      fkEstadoBeneficiarioBeneficiarioID: {
        name: 'fkEstadoBeneficiarioBeneficiarioID',
        entity: 'Beneficiario',
        entityKey: 'id',
        foreignKey: 'beneficiarioId'
      }
    }
  }
})
export class EstadoBeneficiario extends Entity {
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
  estado: string;

  @property({
    type: 'string',
  })
  detalle?: string;

  @belongsTo(() => Beneficiario)
  beneficiarioId: number;

  constructor(data?: Partial<EstadoBeneficiario>) {
    super(data);
  }
}

export interface EstadoBeneficiarioRelations {
  // describe navigational properties here
}

export type EstadoBeneficiarioWithRelations = EstadoBeneficiario & EstadoBeneficiarioRelations;
