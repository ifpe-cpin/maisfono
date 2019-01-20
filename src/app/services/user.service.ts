import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ResourceServiceInterface } from './resource.service.interface';
import { HttpClient } from '@angular/common/http';
import { REQUEST_BASE_URL } from '../models/request';
import { UsuarioSerializer } from '../serializers/usuario.serializer';
import { User } from '../models/user';


@Injectable()
export class UserService extends ResourceService<User> implements ResourceServiceInterface<User>{
  

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      REQUEST_BASE_URL,
      'usuarios',
      new UsuarioSerializer);
  }
}