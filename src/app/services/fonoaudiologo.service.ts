import { Injectable } from '@angular/core';
import { Fonoaudiologo } from '../models/fonoaudiologo';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from './resource.service';
import { FonoaudiologoSerializer } from '../serializers/fonoaudiologo.serializer';
import { REQUEST_BASE_URL } from '../models/request';
import { ResourceServiceInterface } from './resource.service.interface';

@Injectable()
export class FonoaudiologoService extends ResourceService<Fonoaudiologo>
 implements ResourceServiceInterface<Fonoaudiologo>{
  

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      REQUEST_BASE_URL,
      'fonoaudiologos',
      new FonoaudiologoSerializer);
  }

  
   
}
