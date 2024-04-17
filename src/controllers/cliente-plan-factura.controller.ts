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
  ClientePlan,
  Factura,
} from '../models';
import {ClientePlanRepository} from '../repositories';

export class ClientePlanFacturaController {
  constructor(
    @repository(ClientePlanRepository) protected clientePlanRepository: ClientePlanRepository,
  ) { }

  @get('/cliente-plans/{id}/factura', {
    responses: {
      '200': {
        description: 'ClientePlan has one Factura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Factura),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura> {
    return this.clientePlanRepository.factura(id).get(filter);
  }

  @post('/cliente-plans/{id}/factura', {
    responses: {
      '200': {
        description: 'ClientePlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ClientePlan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInClientePlan',
            exclude: ['id'],
            optional: ['clientePlanId']
          }),
        },
      },
    }) factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.clientePlanRepository.factura(id).create(factura);
  }

  @patch('/cliente-plans/{id}/factura', {
    responses: {
      '200': {
        description: 'ClientePlan.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.clientePlanRepository.factura(id).patch(factura, where);
  }

  @del('/cliente-plans/{id}/factura', {
    responses: {
      '200': {
        description: 'ClientePlan.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.clientePlanRepository.factura(id).delete(where);
  }
}
