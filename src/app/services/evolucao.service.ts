import { Injectable } from '@angular/core';
import { Evolucao } from '../models/evolucao';
import { ResourceService } from './resource.service';
import { HttpClient } from '@angular/common/http';
import { EvolucaoSerializer } from '../serializers/evolucao.serializer';
import { ResourceServiceInterface } from './resource.service.interface';
import { environment } from '../../environments/environment';

@Injectable()
export class EvolucaoService extends ResourceService<Evolucao> implements ResourceServiceInterface<Evolucao>{
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.request_base_url,
      'evolucoes',
      new EvolucaoSerializer);
  }
}
