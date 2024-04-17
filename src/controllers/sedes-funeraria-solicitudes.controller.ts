import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  SedesFuneraria,
  Solicitudes,
} from '../models';
import {SedesFunerariaRepository} from '../repositories';

export class SedesFunerariaSolicitudesController {
  constructor(
    @repository(SedesFunerariaRepository) protected sedesFunerariaRepository: SedesFunerariaRepository,
  ) { }

  @get('/sedes-funerarias/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Array of SedesFuneraria has many Solicitudes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitudes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitudes>,
  ): Promise<Solicitudes[]> {
    return this.sedesFunerariaRepository.solicitudes(id).find(filter);
  }

  @post('/sedes-funerarias/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'SedesFuneraria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitudes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SedesFuneraria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {
            title: 'NewSolicitudesInSedesFuneraria',
            exclude: ['id'],
            optional: ['sedesFunerariaId']
          }),
        },
      },
    }) solicitudes: Omit<Solicitudes, 'id'>,
  ): Promise<Solicitudes> {
    return this.sedesFunerariaRepository.solicitudes(id).create(solicitudes);
  }

  @patch('/sedes-funerarias/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'SedesFuneraria.Solicitudes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {partial: true}),
        },
      },
    })
    solicitudes: Partial<Solicitudes>,
    @param.query.object('where', getWhereSchemaFor(Solicitudes)) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.sedesFunerariaRepository.solicitudes(id).patch(solicitudes, where);
  }

  @del('/sedes-funerarias/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'SedesFuneraria.Solicitudes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitudes)) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.sedesFunerariaRepository.solicitudes(id).delete(where);
  }
}
