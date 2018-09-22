import { Injectable } from '@angular/core';
import { Fono } from '../models/fono';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Paciente } from '../sistema/models/paciente/paciente';


@Injectable()
export class PacientesService {

  constructor(public db: AngularFirestore) { }

  add(paciente: Paciente):Promise<any>{
    return paciente.add();
  }

  getAll():Observable<Paciente[]>{
    return Paciente.getAll(this.db,"Paciente");
  }

  get(id): Observable<Fono>{
    return Paciente.get(this.db,id);
  }

  delete(paciente: Paciente):Promise<void>{
    return paciente.delete();
  }
}
