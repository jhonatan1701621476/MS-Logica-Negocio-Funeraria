import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Resenas,
  Cliente,
} from '../models';
import {ResenasRepository} from '../repositories';

export class ResenasClienteController {
  constructor(
    @repository(ResenasRepository)
    public resenasRepository: ResenasRepository,
  ) { }

  @get('/resenas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Resenas',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Resenas.prototype.id,
  ): Promise<Cliente> {
    return this.resenasRepository.cliente(id);
  }
}
