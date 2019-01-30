import { Injectable } from '@angular/core';
import { Fonoaudiologo } from '../models/fonoaudiologo';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from './resource.service';
import { FonoaudiologoSerializer } from '../serializers/fonoaudiologo.serializer';
import { ResourceServiceInterface } from './resource.service.interface';
import { environment } from '../../environments/environment';

@Injectable()
export class FonoaudiologoService extends ResourceService<Fonoaudiologo>
 implements ResourceServiceInterface<Fonoaudiologo>{
  

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.request_base_url,
      'fonoaudiologos',
      new FonoaudiologoSerializer);
  }

  
   
}
