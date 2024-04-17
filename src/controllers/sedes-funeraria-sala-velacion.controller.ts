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
  SalaVelacion,
} from '../models';
import {SedesFunerariaRepository} from '../repositories';

export class SedesFunerariaSalaVelacionController {
  constructor(
    @repository(SedesFunerariaRepository) protected sedesFunerariaRepository: SedesFunerariaRepository,
  ) { }

  @get('/sedes-funerarias/{id}/sala-velacions', {
    responses: {
      '200': {
        description: 'Array of SedesFuneraria has many SalaVelacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SalaVelacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SalaVelacion>,
  ): Promise<SalaVelacion[]> {
    return this.sedesFunerariaRepository.salaVelaciones(id).find(filter);
  }

  @post('/sedes-funerarias/{id}/sala-velacions', {
    responses: {
      '200': {
        description: 'SedesFuneraria model instance',
        content: {'application/json': {schema: getModelSchemaRef(SalaVelacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SedesFuneraria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalaVelacion, {
            title: 'NewSalaVelacionInSedesFuneraria',
            exclude: ['id'],
            optional: ['sedesFunerariaId']
          }),
        },
      },
    }) salaVelacion: Omit<SalaVelacion, 'id'>,
  ): Promise<SalaVelacion> {
    return this.sedesFunerariaRepository.salaVelaciones(id).create(salaVelacion);
  }

  @patch('/sedes-funerarias/{id}/sala-velacions', {
    responses: {
      '200': {
        description: 'SedesFuneraria.SalaVelacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalaVelacion, {partial: true}),
        },
      },
    })
    salaVelacion: Partial<SalaVelacion>,
    @param.query.object('where', getWhereSchemaFor(SalaVelacion)) where?: Where<SalaVelacion>,
  ): Promise<Count> {
    return this.sedesFunerariaRepository.salaVelaciones(id).patch(salaVelacion, where);
  }

  @del('/sedes-funerarias/{id}/sala-velacions', {
    responses: {
      '200': {
        description: 'SedesFuneraria.SalaVelacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SalaVelacion)) where?: Where<SalaVelacion>,
  ): Promise<Count> {
    return this.sedesFunerariaRepository.salaVelaciones(id).delete(where);
  }
}
