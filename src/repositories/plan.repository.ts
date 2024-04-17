import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {Plan, PlanRelations, Cliente, ClientePlan, ServicioPlan, PlanServicioPlan} from '../models';
import {ClientePlanRepository} from './cliente-plan.repository';
import {ClienteRepository} from './cliente.repository';
import {PlanServicioPlanRepository} from './plan-servicio-plan.repository';
import {ServicioPlanRepository} from './servicio-plan.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly clientes: HasManyThroughRepositoryFactory<Cliente, typeof Cliente.prototype.id,
          ClientePlan,
          typeof Plan.prototype.id
        >;

  public readonly serviciosPlan: HasManyThroughRepositoryFactory<ServicioPlan, typeof ServicioPlan.prototype.id,
          PlanServicioPlan,
          typeof Plan.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('ClientePlanRepository') protected clientePlanRepositoryGetter: Getter<ClientePlanRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('PlanServicioPlanRepository') protected planServicioPlanRepositoryGetter: Getter<PlanServicioPlanRepository>, @repository.getter('ServicioPlanRepository') protected servicioPlanRepositoryGetter: Getter<ServicioPlanRepository>,
  ) {
    super(Plan, dataSource);
    this.serviciosPlan = this.createHasManyThroughRepositoryFactoryFor('serviciosPlan', servicioPlanRepositoryGetter, planServicioPlanRepositoryGetter,);
    this.registerInclusionResolver('serviciosPlan', this.serviciosPlan.inclusionResolver);
    this.clientes = this.createHasManyThroughRepositoryFactoryFor('clientes', clienteRepositoryGetter, clientePlanRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
