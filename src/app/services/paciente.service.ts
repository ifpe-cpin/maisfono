import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ResourceServiceInterface } from './resource.service.interface';
import { HttpClient } from '@angular/common/http';
import { PacienteSerializer } from '../serializers/paciente.serializer';
import { Paciente } from "../models/paciente";

import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';



@Injectable()
export class PacienteService extends ResourceService<Paciente> implements ResourceServiceInterface<Paciente>{
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.request_base_url,
      'pacientes',
      new PacienteSerializer);
  }
}


