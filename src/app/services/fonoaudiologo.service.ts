import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Fonoaudiologo } from '../models/fonoaudiologo';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from './resource.service';
import { FonoaudiologoSerializer } from '../serializers/fonoaudiologo.serializer';

@Injectable()
export class FonoaudiologoService extends ResourceService<Fonoaudiologo>{
  

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'http://localhost/maisfono/Slim/public/index.php',
      'fonoaudiologos',
      new FonoaudiologoSerializer);
  }

  
   
}
