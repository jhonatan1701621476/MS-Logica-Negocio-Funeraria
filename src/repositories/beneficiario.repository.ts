import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations, Cliente, EstadoBeneficiario, Solicitudes} from '../models';
import {ClienteRepository} from './cliente.repository';
import {EstadoBeneficiarioRepository} from './estado-beneficiario.repository';
import {SolicitudesRepository} from './solicitudes.repository';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.id,
  BeneficiarioRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Beneficiario.prototype.id>;

  public readonly estadoBeneficiario: HasOneRepositoryFactory<EstadoBeneficiario, typeof Beneficiario.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitudes, typeof Beneficiario.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('EstadoBeneficiarioRepository') protected estadoBeneficiarioRepositoryGetter: Getter<EstadoBeneficiarioRepository>, @repository.getter('SolicitudesRepository') protected solicitudesRepositoryGetter: Getter<SolicitudesRepository>,
  ) {
    super(Beneficiario, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudesRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.estadoBeneficiario = this.createHasOneRepositoryFactoryFor('estadoBeneficiario', estadoBeneficiarioRepositoryGetter);
    this.registerInclusionResolver('estadoBeneficiario', this.estadoBeneficiario.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
