import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {SalaVelacion, SalaVelacionRelations, SedesFuneraria} from '../models';
import {SedesFunerariaRepository} from './sedes-funeraria.repository';

export class SalaVelacionRepository extends DefaultCrudRepository<
  SalaVelacion,
  typeof SalaVelacion.prototype.id,
  SalaVelacionRelations
> {

  public readonly sedesFuneraria: BelongsToAccessor<SedesFuneraria, typeof SalaVelacion.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('SedesFunerariaRepository') protected sedesFunerariaRepositoryGetter: Getter<SedesFunerariaRepository>,
  ) {
    super(SalaVelacion, dataSource);
    this.sedesFuneraria = this.createBelongsToAccessorFor('sedesFuneraria', sedesFunerariaRepositoryGetter,);
    this.registerInclusionResolver('sedesFuneraria', this.sedesFuneraria.inclusionResolver);
  }
}
