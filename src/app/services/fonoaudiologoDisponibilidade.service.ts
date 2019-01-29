import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ResourceServiceInterface } from './resource.service.interface';
import { HttpClient } from '@angular/common/http';
import { FonoaudiologoDisponibilidadeSerializer } from '../serializers/fonoaudiologoDisponibilidade.serializer';
import { FonoaudiologoDisponibilidade } from '../models/fonoaudiologoDisponibilidade';
import { environment } from '../../environments/environment';


@Injectable()
export class FonoaudiologoDisponibilidadeService extends ResourceService<FonoaudiologoDisponibilidade> implements ResourceServiceInterface<FonoaudiologoDisponibilidade>{
  
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.request_base_url,
      'fonoaudiologoDisponibilidade',
      new FonoaudiologoDisponibilidadeSerializer);
  }
}
