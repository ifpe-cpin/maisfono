import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable()
export class UserService {

  constructor(public db: AngularFirestore) { }

  add(user:User):Promise<any>{
    return user.add();
  }

  getAll():Observable<User[]>{
    return User.getAll(this.db);
  }

  get(id): Observable<User>{
    return User.get(this.db,id);
  }

  delete(user:User):Promise<void>{
    return user.delete();
  }
}