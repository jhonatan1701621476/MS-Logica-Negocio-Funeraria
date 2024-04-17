import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EstadoBeneficiario,
  Beneficiario,
} from '../models';
import {EstadoBeneficiarioRepository} from '../repositories';

export class EstadoBeneficiarioBeneficiarioController {
  constructor(
    @repository(EstadoBeneficiarioRepository)
    public estadoBeneficiarioRepository: EstadoBeneficiarioRepository,
  ) { }

  @get('/estado-beneficiarios/{id}/beneficiario', {
    responses: {
      '200': {
        description: 'Beneficiario belonging to EstadoBeneficiario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Beneficiario),
          },
        },
      },
    },
  })
  async getBeneficiario(
    @param.path.number('id') id: typeof EstadoBeneficiario.prototype.id,
  ): Promise<Beneficiario> {
    return this.estadoBeneficiarioRepository.beneficiario(id);
  }
}
