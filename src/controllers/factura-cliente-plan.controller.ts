import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  ClientePlan,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaClientePlanController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/cliente-plan', {
    responses: {
      '200': {
        description: 'ClientePlan belonging to Factura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ClientePlan),
          },
        },
      },
    },
  })
  async getClientePlan(
    @param.path.number('id') id: typeof Factura.prototype.id,
  ): Promise<ClientePlan> {
    return this.facturaRepository.clientePlan(id);
  }
}
