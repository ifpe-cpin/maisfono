import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Paciente } from '../models/paciente';
import 'rxjs/add/operator/map';

@Injectable()
export class PacienteService {
  pacientesCollection: AngularFirestoreCollection<Paciente>;
  pacientes: Observable<Paciente[]>;
  pacienteDoc: AngularFirestoreDocument<Paciente>;

  constructor(public db:AngularFirestore) {
    this.pacientesCollection = this.db.collection('tb_paciente');
    // this.pacientes = this.db.collection('pacientes').valueChanges();
    this.pacientes = this.pacientesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Paciente;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getPacientes() {
    return this.pacientes; 
  }

  addPaciente(paciente: Paciente) {
    this.pacientesCollection.add(paciente);
  }

  deletePaciente(paciente: Paciente) {
    this.pacienteDoc = this.db.doc('tb_paciente/${paciente.id}');
    this.pacienteDoc.delete();
  }

  updatePaciente(paciente: Paciente) {
    this.pacienteDoc = this.db.doc('tb_paciente/${paciente.id}');
    this.pacienteDoc.update(paciente);
  }
}
