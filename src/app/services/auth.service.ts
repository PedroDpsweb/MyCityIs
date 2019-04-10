import { UserInterface } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afsAuth: AngularFireAuth,
    private afs: AngularFirestore) { }

    private administrators :string[] =["kKkZ8lKNF2fdLwfldmXL2fTYvEy2"]

  registerUser(email: string, password: string){
    return new Promise((resolve,reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email,password)
    .then(userData => {
      resolve(userData),
      this.updateUserData(userData.user)
    }).catch(err => console.log(reject(err)))
  });
}
  loginEmailUser(email: string, pass: string){
    return new Promise((resolve, reject) =>{
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    })
  }
  
  logoutUser(){
    return this.afsAuth.auth.signOut();
  }
  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data : UserInterface = {
      id:user.uid,
      email: user.email,
      roles: {
        //revisar este ROL mas adelante
        admin:true
      }
      
    }
    return userRef.set(data, {merge:true})
  }

  isUserAdmin(userUid){
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }

  confirmUserAdmin(userUid){
    let admin = this.administrators.includes(userUid) ? true : false;
      return admin;
    
  }

  finalizar(){
    return true;
  }

}
