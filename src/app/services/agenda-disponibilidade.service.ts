import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ResourceServiceInterface } from './resource.service.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AgendaDisponibilidade } from '../models/agenda-disponibilidade';
import { AgendaDisponibilidadeSerializer } from '../serializers/agenda-disponibilidade.serializer';


@Injectable()
export class AgendaDisponibilidadeService extends ResourceService<AgendaDisponibilidade> implements ResourceServiceInterface<AgendaDisponibilidade>{
  
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.request_base_url,
      'fonoaudiologoDisponibilidade',
      new AgendaDisponibilidadeSerializer);
  }
}
