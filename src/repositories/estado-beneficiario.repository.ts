import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {EstadoBeneficiario, EstadoBeneficiarioRelations, Beneficiario} from '../models';
import {BeneficiarioRepository} from './beneficiario.repository';

export class EstadoBeneficiarioRepository extends DefaultCrudRepository<
  EstadoBeneficiario,
  typeof EstadoBeneficiario.prototype.id,
  EstadoBeneficiarioRelations
> {

  public readonly beneficiario: BelongsToAccessor<Beneficiario, typeof EstadoBeneficiario.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('BeneficiarioRepository') protected beneficiarioRepositoryGetter: Getter<BeneficiarioRepository>,
  ) {
    super(EstadoBeneficiario, dataSource);
    this.beneficiario = this.createBelongsToAccessorFor('beneficiario', beneficiarioRepositoryGetter,);
    this.registerInclusionResolver('beneficiario', this.beneficiario.inclusionResolver);
  }
}
