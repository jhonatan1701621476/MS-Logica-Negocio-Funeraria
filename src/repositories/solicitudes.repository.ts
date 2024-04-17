import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {Solicitudes, SolicitudesRelations, Beneficiario, SedesFuneraria} from '../models';
import {BeneficiarioRepository} from './beneficiario.repository';
import {SedesFunerariaRepository} from './sedes-funeraria.repository';

export class SolicitudesRepository extends DefaultCrudRepository<
  Solicitudes,
  typeof Solicitudes.prototype.id,
  SolicitudesRelations
> {

  public readonly beneficiario: BelongsToAccessor<Beneficiario, typeof Solicitudes.prototype.id>;

  public readonly sedesFuneraria: BelongsToAccessor<SedesFuneraria, typeof Solicitudes.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('BeneficiarioRepository') protected beneficiarioRepositoryGetter: Getter<BeneficiarioRepository>, @repository.getter('SedesFunerariaRepository') protected sedesFunerariaRepositoryGetter: Getter<SedesFunerariaRepository>,
  ) {
    super(Solicitudes, dataSource);
    this.sedesFuneraria = this.createBelongsToAccessorFor('sedesFuneraria', sedesFunerariaRepositoryGetter,);
    this.registerInclusionResolver('sedesFuneraria', this.sedesFuneraria.inclusionResolver);
    this.beneficiario = this.createBelongsToAccessorFor('beneficiario', beneficiarioRepositoryGetter,);
    this.registerInclusionResolver('beneficiario', this.beneficiario.inclusionResolver);
  }
}
