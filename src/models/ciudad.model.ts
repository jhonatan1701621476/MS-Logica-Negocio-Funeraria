import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {SedesFuneraria} from './sedes-funeraria.model';

@model({
  settings: {
    foreignKeys:
    {
      fkCiudadesDepartamentoID: {
        name: 'fkCiudadesDepartamentoID',
        entity: 'Departamento',
        entityKey: 'id',
        foreignKey: 'departamentoId'
      }
    }
  }
})

export class Ciudad extends Entity {
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
  nombreCiudad: string;

  @belongsTo(() => Departamento)
  departamentoId: number;

  @hasMany(() => SedesFuneraria)
  sedesFunerarias: SedesFuneraria[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
