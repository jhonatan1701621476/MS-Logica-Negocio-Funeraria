import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Solicitudes} from './solicitudes.model';
import {Ciudad} from './ciudad.model';
import {SalaVelacion} from './sala-velacion.model';

@model()
export class SedesFuneraria extends Entity {
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
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'number',
    required: true,
  })
  celular: number;

  @hasMany(() => Solicitudes)
  solicitudes: Solicitudes[];

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasMany(() => SalaVelacion)
  salaVelaciones: SalaVelacion[];

  constructor(data?: Partial<SedesFuneraria>) {
    super(data);
  }
}

export interface SedesFunerariaRelations {
  // describe navigational properties here
}

export type SedesFunerariaWithRelations = SedesFuneraria & SedesFunerariaRelations;
