import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';
import 'rxjs/add/operator/map';
import { ResourceService } from './resource.service';
import { HttpClient } from '@angular/common/http';
import { ResourceServiceInterface } from './resource.service.interface';
import { FonoaudiologoPaciente } from '../models/fonoaudiologo-paciente';
import { FonoaudiologoPacienteSerializer } from '../serializers/fonoaudiologo-paciente.serializer';
import { environment } from '../../environments/environment';



@Injectable()
export class FonoaudiologoPacienteService extends ResourceService<FonoaudiologoPaciente> implements ResourceServiceInterface<FonoaudiologoPaciente>{
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.request_base_url,
      'fonoaudiologosPacientes',
      new FonoaudiologoPacienteSerializer);
  }
}
