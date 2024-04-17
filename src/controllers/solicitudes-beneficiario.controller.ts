import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitudes,
  Beneficiario,
} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesBeneficiarioController {
  constructor(
    @repository(SolicitudesRepository)
    public solicitudesRepository: SolicitudesRepository,
  ) { }

  @get('/solicitudes/{id}/beneficiario', {
    responses: {
      '200': {
        description: 'Beneficiario belonging to Solicitudes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Beneficiario),
          },
        },
      },
    },
  })
  async getBeneficiario(
    @param.path.number('id') id: typeof Solicitudes.prototype.id,
  ): Promise<Beneficiario> {
    return this.solicitudesRepository.beneficiario(id);
  }
}
