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
  Cliente,
  Resenas,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteResenasController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/resenas', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Resenas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Resenas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Resenas>,
  ): Promise<Resenas[]> {
    return this.clienteRepository.resenas(id).find(filter);
  }

  @post('/clientes/{id}/resenas', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Resenas)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resenas, {
            title: 'NewResenasInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) resenas: Omit<Resenas, 'id'>,
  ): Promise<Resenas> {
    return this.clienteRepository.resenas(id).create(resenas);
  }

  @patch('/clientes/{id}/resenas', {
    responses: {
      '200': {
        description: 'Cliente.Resenas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resenas, {partial: true}),
        },
      },
    })
    resenas: Partial<Resenas>,
    @param.query.object('where', getWhereSchemaFor(Resenas)) where?: Where<Resenas>,
  ): Promise<Count> {
    return this.clienteRepository.resenas(id).patch(resenas, where);
  }

  @del('/clientes/{id}/resenas', {
    responses: {
      '200': {
        description: 'Cliente.Resenas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Resenas)) where?: Where<Resenas>,
  ): Promise<Count> {
    return this.clienteRepository.resenas(id).delete(where);
  }
}
