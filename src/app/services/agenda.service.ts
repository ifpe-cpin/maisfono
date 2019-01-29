import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ResourceServiceInterface } from './resource.service.interface';
import { HttpClient } from '@angular/common/http';
import { AgendaSerializer } from '../serializers/agenda.serializer';
import { Agenda } from '../models/agenda';
import { environment } from '../../environments/environment.prod';


@Injectable()
export class AgendaService extends ResourceService<Agenda> implements ResourceServiceInterface<Agenda>{
  
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.request_base_url,
      'fonoaudiologoAgenda',
      new AgendaSerializer);
  }
}
