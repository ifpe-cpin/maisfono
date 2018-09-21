import { Entity } from '../entity';
import { AngularFirestore } from 'angularfire2/firestore';
export class User extends Entity{
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    roles?: string[]
  }