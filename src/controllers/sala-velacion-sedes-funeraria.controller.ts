import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SalaVelacion,
  SedesFuneraria,
} from '../models';
import {SalaVelacionRepository} from '../repositories';

export class SalaVelacionSedesFunerariaController {
  constructor(
    @repository(SalaVelacionRepository)
    public salaVelacionRepository: SalaVelacionRepository,
  ) { }

  @get('/sala-velacions/{id}/sedes-funeraria', {
    responses: {
      '200': {
        description: 'SedesFuneraria belonging to SalaVelacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SedesFuneraria),
          },
        },
      },
    },
  })
  async getSedesFuneraria(
    @param.path.number('id') id: typeof SalaVelacion.prototype.id,
  ): Promise<SedesFuneraria> {
    return this.salaVelacionRepository.sedesFuneraria(id);
  }
}
