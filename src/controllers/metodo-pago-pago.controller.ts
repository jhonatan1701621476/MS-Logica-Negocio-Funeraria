import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MetodoPago,
  Pago,
} from '../models';
import {MetodoPagoRepository} from '../repositories';

export class MetodoPagoPagoController {
  constructor(
    @repository(MetodoPagoRepository)
    public metodoPagoRepository: MetodoPagoRepository,
  ) { }

  @get('/metodo-pagos/{id}/pago', {
    responses: {
      '200': {
        description: 'Pago belonging to MetodoPago',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pago),
          },
        },
      },
    },
  })
  async getPago(
    @param.path.number('id') id: typeof MetodoPago.prototype.id,
  ): Promise<Pago> {
    return this.metodoPagoRepository.pago(id);
  }
}
