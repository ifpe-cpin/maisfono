import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { User } from '../models/user';



@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

      // Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`User/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      )
    }
  



  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }


  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`User/${user.uid}`);

    let data: Object = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }

    //verifica se o usuario já salvo possui o campo roles
    return userRef.ref.get().then(function(doc) {
      if (doc.exists) {
          let obj = doc.data();

          if(!('roles' in obj)){
            data['roles']=[];
        }
        
      } else {
          data['roles']=["admin","fono","paciente"];
      }

      userRef.set(data, { merge: true })
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });


    

   
    

  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
}
