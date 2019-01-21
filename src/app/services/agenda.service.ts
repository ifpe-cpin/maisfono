import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ResourceServiceInterface } from './resource.service.interface';
import { HttpClient } from '@angular/common/http';
import { REQUEST_BASE_URL } from '../models/request';
import { AgendaSerializer } from '../serializers/agenda.serializer';
import { Agenda } from '../models/agenda';


@Injectable()
export class AgendaService extends ResourceService<Agenda> implements ResourceServiceInterface<Agenda>{
  
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      REQUEST_BASE_URL,
      'fonoaudiologoAgenda',
      new AgendaSerializer);
  }
}
