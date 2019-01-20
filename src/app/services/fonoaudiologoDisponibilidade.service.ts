import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ResourceServiceInterface } from './resource.service.interface';
import { HttpClient } from '@angular/common/http';
import { REQUEST_BASE_URL } from '../models/request';
import { FonoaudiologoDisponibilidadeSerializer } from '../serializers/fonoaudiologoDisponibilidade.serializer';
import { FonoaudiologoDisponibilidade } from '../models/fonoaudiologoDisponibilidade';


@Injectable()
export class FonoaudiologoDisponibilidadeService extends ResourceService<FonoaudiologoDisponibilidade> implements ResourceServiceInterface<FonoaudiologoDisponibilidade>{
  
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      REQUEST_BASE_URL,
      'fonoaudiologoDisponibilidade',
      new FonoaudiologoDisponibilidadeSerializer);
  }
}
