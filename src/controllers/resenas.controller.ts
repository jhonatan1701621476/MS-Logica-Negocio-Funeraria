import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Resenas} from '../models';
import {ResenasRepository} from '../repositories';

export class ResenasController {
  constructor(
    @repository(ResenasRepository)
    public resenasRepository : ResenasRepository,
  ) {}

  @post('/resena')
  @response(200, {
    description: 'Resenas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Resenas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resenas, {
            title: 'NewResenas',
            exclude: ['id'],
          }),
        },
      },
    })
    resenas: Omit<Resenas, 'id'>,
  ): Promise<Resenas> {
    return this.resenasRepository.create(resenas);
  }

  @get('/resena/count')
  @response(200, {
    description: 'Resenas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Resenas) where?: Where<Resenas>,
  ): Promise<Count> {
    return this.resenasRepository.count(where);
  }

  @get('/resena')
  @response(200, {
    description: 'Array of Resenas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Resenas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Resenas) filter?: Filter<Resenas>,
  ): Promise<Resenas[]> {
    return this.resenasRepository.find(filter);
  }

  @patch('/resena')
  @response(200, {
    description: 'Resenas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resenas, {partial: true}),
        },
      },
    })
    resenas: Resenas,
    @param.where(Resenas) where?: Where<Resenas>,
  ): Promise<Count> {
    return this.resenasRepository.updateAll(resenas, where);
  }

  @get('/resena/{id}')
  @response(200, {
    description: 'Resenas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Resenas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Resenas, {exclude: 'where'}) filter?: FilterExcludingWhere<Resenas>
  ): Promise<Resenas> {
    return this.resenasRepository.findById(id, filter);
  }

  @patch('/resena/{id}')
  @response(204, {
    description: 'Resenas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resenas, {partial: true}),
        },
      },
    })
    resenas: Resenas,
  ): Promise<void> {
    await this.resenasRepository.updateById(id, resenas);
  }

  @put('/resena/{id}')
  @response(204, {
    description: 'Resenas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resenas: Resenas,
  ): Promise<void> {
    await this.resenasRepository.replaceById(id, resenas);
  }

  @del('/resena/{id}')
  @response(204, {
    description: 'Resenas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resenasRepository.deleteById(id);
  }
}
