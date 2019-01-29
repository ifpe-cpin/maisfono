import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ResourceServiceInterface } from './resource.service.interface';
import { HttpClient } from '@angular/common/http';
import { UsuarioSerializer } from '../serializers/usuario.serializer';
import { User } from '../models/user';
import { environment } from '../../environments/environment';


@Injectable()
export class UserService extends ResourceService<User> implements ResourceServiceInterface<User>{
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.request_base_url,
      'usuarios',
      new UsuarioSerializer);
  }
}