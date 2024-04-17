import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {PlanServicioPlan, PlanServicioPlanRelations} from '../models';

export class PlanServicioPlanRepository extends DefaultCrudRepository<
  PlanServicioPlan,
  typeof PlanServicioPlan.prototype.id,
  PlanServicioPlanRelations
> {
  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource,
  ) {
    super(PlanServicioPlan, dataSource);
  }
}
