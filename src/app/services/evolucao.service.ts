import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Evolucao } from '../models/evolucao';
import 'rxjs/add/operator/map';
import { groupBy } from 'rxjs/internal/operators/groupBy';

@Injectable()
export class EvolucaoService {
  evolucaosCollection: AngularFirestoreCollection<Evolucao>;
  evolucaosCollection2: AngularFirestoreCollection<Evolucao>;
  evolucoes: Observable<Evolucao[]>;
  evolucaoDoc: AngularFirestoreDocument<Evolucao>;

  constructor(public db:AngularFirestore) {
        this.evolucaosCollection = this.db.collection('tb_evolucao', 
          ref => ref.where('frg_paciente','==', '8AAIQ2myxZBE8VTCwwWg'));


    /*
    
    this.evolucaosCollection = this.db.collection('tb_evolucao');
    
          */
    // this.evolucoes = this.db.collection('evolucoes').valueChanges();
    this.evolucoes = this.evolucaosCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Evolucao;
        //data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getEvolucoes() {
    return this.evolucoes; 
  }

  getEvolucoesPaciente(idPaciente){
    this.evolucaosCollection = this.db.collection('/tb_evolucoes', 
        ref => ref.orderBy('dat_evolucao', 'desc').where('frg_paciente','==', idPaciente))

        console.log(this.evolucaosCollection)
    return this.evolucaosCollection
  }

  addEvolucao(evolucao: Evolucao) {
    this.evolucaosCollection.add(evolucao);
  }

  deleteEvolucao(evolucao: Evolucao) {
    this.evolucaoDoc = this.db.doc(`tb_evolucao/${evolucao.id}`);
    this.evolucaoDoc.delete();
  }

  updateEvolucao(evolucao: Evolucao) {
    this.evolucaoDoc = this.db.doc(`tb_evolucao/${evolucao.id}`);
    this.evolucaoDoc.update(evolucao);
  }
}
