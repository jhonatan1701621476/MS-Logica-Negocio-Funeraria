import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitudes,
  SedesFuneraria,
} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesSedesFunerariaController {
  constructor(
    @repository(SolicitudesRepository)
    public solicitudesRepository: SolicitudesRepository,
  ) { }

  @get('/solicitudes/{id}/sedes-funeraria', {
    responses: {
      '200': {
        description: 'SedesFuneraria belonging to Solicitudes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SedesFuneraria),
          },
        },
      },
    },
  })
  async getSedesFuneraria(
    @param.path.number('id') id: typeof Solicitudes.prototype.id,
  ): Promise<SedesFuneraria> {
    return this.solicitudesRepository.sedesFuneraria(id);
  }
}
