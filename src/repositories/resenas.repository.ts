import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {Resenas, ResenasRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class ResenasRepository extends DefaultCrudRepository<
  Resenas,
  typeof Resenas.prototype.id,
  ResenasRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Resenas.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Resenas, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
