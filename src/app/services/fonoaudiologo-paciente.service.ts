import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';
import 'rxjs/add/operator/map';
import { ResourceService } from './resource.service';
import { HttpClient } from '@angular/common/http';
import { PacienteSerializer } from '../serializers/paciente.serializer';
import { REQUEST_BASE_URL } from '../models/request';
import { ResourceServiceInterface } from './resource.service.interface';
import { FonoaudiologoPaciente } from '../models/fonoaudiologo-paciente';
import { FonoaudiologoPacienteSerializer } from '../serializers/fonoaudiologo-paciente.serializer';



@Injectable()
export class FonoaudiologoPacienteService extends ResourceService<FonoaudiologoPaciente> implements ResourceServiceInterface<FonoaudiologoPaciente>{
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      REQUEST_BASE_URL,
      'fonoaudiologosPacientes',
      new FonoaudiologoPacienteSerializer);
  }
}
