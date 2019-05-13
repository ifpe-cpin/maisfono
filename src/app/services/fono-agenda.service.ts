import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ResourceServiceInterface } from './resource.service.interface';
import { HttpClient } from '@angular/common/http';
import { Agenda } from '../models/agenda';
import { environment } from '../../environments/environment';
import { FonoAgendaSerializer } from '../serializers/fono-agenda.serializer';
import { FonoAgenda } from '../models/fono-agenda';


@Injectable()
export class FonoAgendaService extends ResourceService<FonoAgenda> implements ResourceServiceInterface<FonoAgenda>{
  
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.request_base_url,
      'fonoaudiologoAgenda',
      new FonoAgendaSerializer);
  }
}
