import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {Pago, PagoRelations, MetodoPago, Factura} from '../models';
import {MetodoPagoRepository} from './metodo-pago.repository';
import {FacturaRepository} from './factura.repository';

export class PagoRepository extends DefaultCrudRepository<
  Pago,
  typeof Pago.prototype.id,
  PagoRelations
> {

  public readonly metodosPago: HasManyRepositoryFactory<MetodoPago, typeof Pago.prototype.id>;

  public readonly factura: BelongsToAccessor<Factura, typeof Pago.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('MetodoPagoRepository') protected metodoPagoRepositoryGetter: Getter<MetodoPagoRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Pago, dataSource);
    this.factura = this.createBelongsToAccessorFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.metodosPago = this.createHasManyRepositoryFactoryFor('metodosPago', metodoPagoRepositoryGetter,);
    this.registerInclusionResolver('metodosPago', this.metodosPago.inclusionResolver);
  }
}
