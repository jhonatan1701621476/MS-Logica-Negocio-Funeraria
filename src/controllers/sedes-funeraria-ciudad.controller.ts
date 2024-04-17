import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SedesFuneraria,
  Ciudad,
} from '../models';
import {SedesFunerariaRepository} from '../repositories';

export class SedesFunerariaCiudadController {
  constructor(
    @repository(SedesFunerariaRepository)
    public sedesFunerariaRepository: SedesFunerariaRepository,
  ) { }

  @get('/sedes-funerarias/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to SedesFuneraria',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ciudad),
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.number('id') id: typeof SedesFuneraria.prototype.id,
  ): Promise<Ciudad> {
    return this.sedesFunerariaRepository.ciudad(id);
  }
}
