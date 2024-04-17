import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {SedesFuneraria, SedesFunerariaRelations, Solicitudes, Ciudad, SalaVelacion} from '../models';
import {SolicitudesRepository} from './solicitudes.repository';
import {CiudadRepository} from './ciudad.repository';
import {SalaVelacionRepository} from './sala-velacion.repository';

export class SedesFunerariaRepository extends DefaultCrudRepository<
  SedesFuneraria,
  typeof SedesFuneraria.prototype.id,
  SedesFunerariaRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitudes, typeof SedesFuneraria.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof SedesFuneraria.prototype.id>;

  public readonly salaVelaciones: HasManyRepositoryFactory<SalaVelacion, typeof SedesFuneraria.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('SolicitudesRepository') protected solicitudesRepositoryGetter: Getter<SolicitudesRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('SalaVelacionRepository') protected salaVelacionRepositoryGetter: Getter<SalaVelacionRepository>,
  ) {
    super(SedesFuneraria, dataSource);
    this.salaVelaciones = this.createHasManyRepositoryFactoryFor('salaVelaciones', salaVelacionRepositoryGetter,);
    this.registerInclusionResolver('salaVelaciones', this.salaVelaciones.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudesRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
