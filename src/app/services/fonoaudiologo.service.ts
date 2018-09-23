import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Fonoaudiologo } from '../models/fonoaudiologo';
import 'rxjs/add/operator/map';

@Injectable()
export class FonoaudiologoService {
  fonoaudiologosCollection: AngularFirestoreCollection<Fonoaudiologo>;
  fonoaudiologos: Observable<Fonoaudiologo[]>;
  fonoaudiologoDoc: AngularFirestoreDocument<Fonoaudiologo>;

  constructor(public db:AngularFirestore) {
    this.fonoaudiologosCollection = this.db.collection('tb_fonoaudiologo');
    // this.fonoaudiologos = this.db.collection('fonoaudiologos').valueChanges();
    this.fonoaudiologos = this.fonoaudiologosCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Fonoaudiologo;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getFonoaudiologos() {
    return this.fonoaudiologos; 
  }

  addFonoaudiologo(fonoaudiologo: Fonoaudiologo) {
    this.fonoaudiologosCollection.add(fonoaudiologo);
  }

  deleteFonoaudiologo(fonoaudiologo: Fonoaudiologo) {
    this.fonoaudiologoDoc = this.db.doc('tb_fonoaudiologo/${fonoaudiologo.id}');
    this.fonoaudiologoDoc.delete();
  }

  updateFonoaudiologo(fonoaudiologo: Fonoaudiologo) {
    this.fonoaudiologoDoc = this.db.doc('tb_fonoaudiologo/${fonoaudiologo.id}');
    this.fonoaudiologoDoc.update(fonoaudiologo);
  }
}
