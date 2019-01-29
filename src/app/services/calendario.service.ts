import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ResourceServiceInterface } from './resource.service.interface';
import { HttpClient } from '@angular/common/http';
import { CalendarioSerializer } from '../serializers/calendario.serializer';
import { Calendario } from '../models/calendario';
import { environment } from '../../environments/environment.prod';


@Injectable()
export class CalendarioService extends ResourceService<Calendario> implements ResourceServiceInterface<Calendario>{
  
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.request_base_url,
      'fonoaudiologoCalendario',
      new CalendarioSerializer);
  }
}
