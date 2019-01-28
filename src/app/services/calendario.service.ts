import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ResourceServiceInterface } from './resource.service.interface';
import { HttpClient } from '@angular/common/http';
import { REQUEST_BASE_URL } from '../models/request';
import { CalendarioSerializer } from '../serializers/calendario.serializer';
import { Calendario } from '../models/calendario';


@Injectable()
export class CalendarioService extends ResourceService<Calendario> implements ResourceServiceInterface<Calendario>{
  
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      REQUEST_BASE_URL,
      'fonoaudiologoCalendario',
      new CalendarioSerializer);
  }
}
