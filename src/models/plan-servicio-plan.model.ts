import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys:
    {
      fkPlanServicioPlanPlanID: {
        name: 'fkPlanServicioPlanPlanID',
        entity: 'Plan',
        entityKey: 'id',
        foreignKey: 'planId'
      },
      fkPlanServicioPlanServicioPlanID: {
        name: 'fkPlanServicioPlanServicioPlanID',
        entity: 'ServicioPlan',
        entityKey: 'id',
        foreignKey: 'servicioPlanId'
      }
    }
  }
})

export class PlanServicioPlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  planId?: number;

  @property({
    type: 'number',
  })
  servicioPlanId?: number;

  constructor(data?: Partial<PlanServicioPlan>) {
    super(data);
  }
}

export interface PlanServicioPlanRelations {
  // describe navigational properties here
}

export type PlanServicioPlanWithRelations = PlanServicioPlan & PlanServicioPlanRelations;
