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
  Pago,
  MetodoPago,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoMetodoPagoController {
  constructor(
    @repository(PagoRepository) protected pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/metodo-pagos', {
    responses: {
      '200': {
        description: 'Array of Pago has many MetodoPago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MetodoPago)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MetodoPago>,
  ): Promise<MetodoPago[]> {
    return this.pagoRepository.metodosPago(id).find(filter);
  }

  @post('/pagos/{id}/metodo-pagos', {
    responses: {
      '200': {
        description: 'Pago model instance',
        content: {'application/json': {schema: getModelSchemaRef(MetodoPago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pago.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {
            title: 'NewMetodoPagoInPago',
            exclude: ['id'],
            optional: ['pagoId']
          }),
        },
      },
    }) metodoPago: Omit<MetodoPago, 'id'>,
  ): Promise<MetodoPago> {
    return this.pagoRepository.metodosPago(id).create(metodoPago);
  }

  @patch('/pagos/{id}/metodo-pagos', {
    responses: {
      '200': {
        description: 'Pago.MetodoPago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {partial: true}),
        },
      },
    })
    metodoPago: Partial<MetodoPago>,
    @param.query.object('where', getWhereSchemaFor(MetodoPago)) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.pagoRepository.metodosPago(id).patch(metodoPago, where);
  }

  @del('/pagos/{id}/metodo-pagos', {
    responses: {
      '200': {
        description: 'Pago.MetodoPago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MetodoPago)) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.pagoRepository.metodosPago(id).delete(where);
  }
}
