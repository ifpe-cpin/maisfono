import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Evolucao } from '../models/evolucao';
import 'rxjs/add/operator/map';

@Injectable()
export class EvolucaoService {
  evolucaosCollection: AngularFirestoreCollection<Evolucao>;
  evolucaos: Observable<Evolucao[]>;
  evolucaoDoc: AngularFirestoreDocument<Evolucao>;

  constructor(public db:AngularFirestore) {
    this.evolucaosCollection = this.db.collection('tb_evolucao');
    // this.evolucaos = this.db.collection('evolucaos').valueChanges();
    this.evolucaos = this.evolucaosCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Evolucao;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getEvolucaos() {
    return this.evolucaos; 
  }

  addEvolucao(evolucao: Evolucao) {
    this.evolucaosCollection.add(evolucao);
  }

  deleteEvolucao(evolucao: Evolucao) {
    this.evolucaoDoc = this.db.doc('tb_evolucao/${evolucao.id}');
    this.evolucaoDoc.delete();
  }

  updateEvolucao(evolucao: Evolucao) {
    this.evolucaoDoc = this.db.doc('tb_evolucao/${evolucao.id}');
    this.evolucaoDoc.update(evolucao);
  }
}
