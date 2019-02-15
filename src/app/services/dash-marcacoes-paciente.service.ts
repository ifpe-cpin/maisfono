import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ResourceServiceInterface } from './resource.service.interface';
import { HttpClient } from '@angular/common/http';
import { DashMarcacoesSerializer } from '../serializers/dash-marcacoes.serializer';
import { DashMarcacoes } from '../models/dash-marcacoes';
import { environment } from '../../environments/environment';


@Injectable()
export class DashMarcacoesPacienteService extends ResourceService<DashMarcacoes> implements ResourceServiceInterface<DashMarcacoes>{
  
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.request_base_url,
      'fonoaudiologoDashMarcacoesPaciente',
      new DashMarcacoesSerializer);
  }
}
