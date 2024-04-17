import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {MetodoPago} from './metodo-pago.model';
import {Factura} from './factura.model';

@model()
export class Pago extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  fechaPago: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @hasMany(() => MetodoPago)
  metodosPago: MetodoPago[];

  @belongsTo(() => Factura)
  facturaId: number;

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
