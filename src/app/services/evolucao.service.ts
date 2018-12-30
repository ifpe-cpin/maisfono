import { Injectable } from '@angular/core';
import { Evolucao } from '../models/evolucao';
import { ResourceService } from './resource.service';
import { HttpClient } from '@angular/common/http';
import { EvolucaoSerializer } from '../serializers/evolucao.serializer';
import { REQUEST_BASE_URL } from '../models/request';

@Injectable()
export class EvolucaoService extends ResourceService<Evolucao>{
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      REQUEST_BASE_URL,
      'evolucoes',
      new EvolucaoSerializer);
  }
}
