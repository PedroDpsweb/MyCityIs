
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { mailInterface } from '../models/mail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailControllerService {

  constructor(
    private afs: AngularFirestore
  ) { }

  private mailsCollection : AngularFirestoreCollection<mailInterface>;
  private mails: Observable<mailInterface[]>;
  private mailDoc: AngularFirestoreDocument<mailInterface>;
  private mail: Observable<mailInterface>;
  public selectedMail : mailInterface = {
    id: null
 }

 

  getInBox(user){
    //this.mailsCollection = this.afs.collection(`inBox/${user}/mail`);
    this.mailsCollection = this.afs.collection(`users/${user}/inBox`);
    return this.mails = this.mailsCollection.snapshotChanges()
    .pipe( map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data();
        data.id = action.payload.doc.id;
        return data;
      })
    } )) 
  }

  getMail(){
    this.mailDoc = this.afs.doc('inBox/ezm5quDN4YwoMZtj1jJe');
    console.log('prueba', this.mailDoc);
    return this.mail = this.mailDoc.snapshotChanges()
    .pipe(map(action =>{
      if (action.payload.exists === false){
        console.log('prueba', action);
        return null;
      }else{
        const data = action.payload.data();
        return data;
      }
    }))

  }

  sendMail(user,mail: mailInterface){
    this.mailsCollection = this.afs.collection(`users/${user}/inBox`);
    this.mailsCollection.add(mail)
  }

  updateMail(mail: mailInterface,idMail: string, user){
    this.mailDoc = this.afs.doc<mailInterface>(`users/${user}/inBox/${idMail}`);
    this.mailDoc.update(mail);
  }

  deleteMail(idMail: string, user){
    this.mailDoc = this.afs.doc<mailInterface>(`users/${user}/inBox/${idMail}`);
    this.mailDoc.delete();
  }



}
