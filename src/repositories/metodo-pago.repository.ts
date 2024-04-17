import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {MetodoPago, MetodoPagoRelations, Pago} from '../models';
import {PagoRepository} from './pago.repository';

export class MetodoPagoRepository extends DefaultCrudRepository<
  MetodoPago,
  typeof MetodoPago.prototype.id,
  MetodoPagoRelations
> {

  public readonly pago: BelongsToAccessor<Pago, typeof MetodoPago.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>,
  ) {
    super(MetodoPago, dataSource);
    this.pago = this.createBelongsToAccessorFor('pago', pagoRepositoryGetter,);
    this.registerInclusionResolver('pago', this.pago.inclusionResolver);
  }
}
