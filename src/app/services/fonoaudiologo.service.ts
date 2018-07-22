import { Injectable } from '@angular/core';
import { Fono } from '../models/fono';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


@Injectable()
export class FonoaudiologoService {

  constructor(public db: AngularFirestore) { }

  add(fono:Fono):Promise<any>{
    return fono.add();
  }

  getAll():Observable<Fono[]>{
    return Fono.getAll(this.db);
  }

  get(id): Observable<Fono>{
    return Fono.get(this.db,id);
  }

  delete(fono:Fono):Promise<void>{
    return fono.delete();
  }
}
