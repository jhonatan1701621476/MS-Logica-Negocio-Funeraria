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
  Ciudad,
  SedesFuneraria,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadSedesFunerariaController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/sedes-funerarias', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many SedesFuneraria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SedesFuneraria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SedesFuneraria>,
  ): Promise<SedesFuneraria[]> {
    return this.ciudadRepository.sedesFunerarias(id).find(filter);
  }

  @post('/ciudads/{id}/sedes-funerarias', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(SedesFuneraria)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ciudad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SedesFuneraria, {
            title: 'NewSedesFunerariaInCiudad',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) sedesFuneraria: Omit<SedesFuneraria, 'id'>,
  ): Promise<SedesFuneraria> {
    return this.ciudadRepository.sedesFunerarias(id).create(sedesFuneraria);
  }

  @patch('/ciudads/{id}/sedes-funerarias', {
    responses: {
      '200': {
        description: 'Ciudad.SedesFuneraria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SedesFuneraria, {partial: true}),
        },
      },
    })
    sedesFuneraria: Partial<SedesFuneraria>,
    @param.query.object('where', getWhereSchemaFor(SedesFuneraria)) where?: Where<SedesFuneraria>,
  ): Promise<Count> {
    return this.ciudadRepository.sedesFunerarias(id).patch(sedesFuneraria, where);
  }

  @del('/ciudads/{id}/sedes-funerarias', {
    responses: {
      '200': {
        description: 'Ciudad.SedesFuneraria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SedesFuneraria)) where?: Where<SedesFuneraria>,
  ): Promise<Count> {
    return this.ciudadRepository.sedesFunerarias(id).delete(where);
  }
}
