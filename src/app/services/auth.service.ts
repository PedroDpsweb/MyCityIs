import { UserInterface } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { mailInterface } from '../models/mail';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afsAuth: AngularFireAuth,
    private afs: AngularFirestore) { }
    private mailsCollection : AngularFirestoreCollection<mailInterface>;

  registerUser(email: string, password: string, name: string){
    return new Promise((resolve,reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email,password)
    .then(userData => {
      resolve(userData),
      this.updateUserData(userData.user, name)
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

  updateUserData(user, userName, desc = ""){
    let inBox = this.mailsCollection;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userName}`);
    const data : UserInterface = {
      name: userName,
      id:user.uid,
      email: user.email,
      desc:"",
      stars:{
        totalStars:"0",
        userStar:[]
      },
      roles: {
        //revisar este ROL mas adelante
        user:true
      },
      categories:[]
      
      
      
    }
    return userRef.set(data, {merge:true})
  }

  updateUserDescription(userName, desc){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userName}`);
    const data : UserInterface = {
      desc:desc, 
    }
    console.log("llega aqui")
    return userRef.set(data, {merge:true})
  }

  isUserAdmin(userName){
    return this.afs.doc<UserInterface>(`users/${userName}`).valueChanges();
  }

}
