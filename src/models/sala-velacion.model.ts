import {Entity, model, property, belongsTo} from '@loopback/repository';
import {SedesFuneraria} from './sedes-funeraria.model';

@model({
  settings: {
    foreignKeys:
    {
      fkSalaVelacionSedesFunerariaID: {
        name: 'fkSalaVelacionSedesFunerariaID',
        entity: 'SedesFuneraria',
        entityKey: 'id',
        foreignKey: 'sedesFunerariaId'
      }
    }
  }
})

export class SalaVelacion extends Entity {
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
  nombreSala: string;

  @property({
    type: 'string',
    required: true,
  })
  ubicacion: string;

  @property({
    type: 'number',
    required: true,
  })
  capacidad: number;

  @property({
    type: 'string',
    required: true,
  })
  tiempoDisponible: string;

  @belongsTo(() => SedesFuneraria)
  sedesFunerariaId: number;

  constructor(data?: Partial<SalaVelacion>) {
    super(data);
  }
}

export interface SalaVelacionRelations {
  // describe navigational properties here
}

export type SalaVelacionWithRelations = SalaVelacion & SalaVelacionRelations;
