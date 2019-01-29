import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ResourceServiceInterface } from './resource.service.interface';
import { HttpClient } from '@angular/common/http';
import { REQUEST_BASE_URL } from '../models/request';
import { PacienteSerializer } from '../serializers/paciente.serializer';
import { Paciente } from "../models/paciente";

import 'rxjs/add/operator/map';



@Injectable()
export class PacienteService extends ResourceService<Paciente> implements ResourceServiceInterface<Paciente>{
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      REQUEST_BASE_URL,
      'pacientes',
      new PacienteSerializer);
  }
}


