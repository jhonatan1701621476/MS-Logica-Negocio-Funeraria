import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {Factura, FacturaRelations, ClientePlan, Pago} from '../models';
import {ClientePlanRepository} from './cliente-plan.repository';
import {PagoRepository} from './pago.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly clientePlan: BelongsToAccessor<ClientePlan, typeof Factura.prototype.id>;

  public readonly pago: HasOneRepositoryFactory<Pago, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('ClientePlanRepository') protected clientePlanRepositoryGetter: Getter<ClientePlanRepository>, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>,
  ) {
    super(Factura, dataSource);
    this.pago = this.createHasOneRepositoryFactoryFor('pago', pagoRepositoryGetter);
    this.registerInclusionResolver('pago', this.pago.inclusionResolver);
    this.clientePlan = this.createBelongsToAccessorFor('clientePlan', clientePlanRepositoryGetter,);
    this.registerInclusionResolver('clientePlan', this.clientePlan.inclusionResolver);
  }
}
