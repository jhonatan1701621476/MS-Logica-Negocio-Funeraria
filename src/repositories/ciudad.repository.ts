import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Departamento, SedesFuneraria} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {SedesFunerariaRepository} from './sedes-funeraria.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Ciudad.prototype.id>;

  public readonly sedesFunerarias: HasManyRepositoryFactory<SedesFuneraria, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('SedesFunerariaRepository') protected sedesFunerariaRepositoryGetter: Getter<SedesFunerariaRepository>,
  ) {
    super(Ciudad, dataSource);
    this.sedesFunerarias = this.createHasManyRepositoryFactoryFor('sedesFunerarias', sedesFunerariaRepositoryGetter,);
    this.registerInclusionResolver('sedesFunerarias', this.sedesFunerarias.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
