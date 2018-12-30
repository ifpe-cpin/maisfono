import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';
import 'rxjs/add/operator/map';
import { ResourceService } from './resource.service';
import { HttpClient } from '@angular/common/http';
import { PacienteSerializer } from '../serializers/paciente.serializer';



@Injectable()
export class PacienteService extends ResourceService<Paciente>{
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'http://localhost/maisfono/Slim/public/index.php',
      'pacientes',
      new PacienteSerializer);
  }
}
