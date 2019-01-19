import { Injectable } from '@angular/core';
import { Calendario } from '../models/calendario';
import { ResourceService } from './resource.service';
import { HttpClient } from '@angular/common/http';
import { CalendarioSerializer } from '../serializers/calendario.serializer';
import { REQUEST_BASE_URL } from '../models/request';
import { ResourceServiceInterface } from './resource.service.interface';

@Injectable()
export class CalendarioService extends ResourceService<Calendario> implements ResourceServiceInterface<Calendario>{
  
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      REQUEST_BASE_URL,
      'fonoaudiologoCalendario/',
      new CalendarioSerializer);
  }
}
