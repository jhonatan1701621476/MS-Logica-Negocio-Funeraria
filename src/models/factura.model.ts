import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {ClientePlan} from './cliente-plan.model';
import {Pago} from './pago.model';

@model({
  settings: {
    foreignKeys:
    {
      fkFacturaClientePlanID: {
        name: 'fkFacturaClientePlanID',
        entity: 'ClientePlan',
        entityKey: 'id',
        foreignKey: 'clientePlanId'
      }
    }
  }
})

export class Factura extends Entity {
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
  fechaLimitePago: string;

  @belongsTo(() => ClientePlan)
  clientePlanId: number;

  @hasOne(() => Pago)
  pago: Pago;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
