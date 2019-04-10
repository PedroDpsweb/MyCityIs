import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { mailInterface } from './../models/mail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailControllerService {

  constructor(
    private afs: AngularFirestore
  ) { }

  private postsCollection : AngularFirestoreCollection<mailInterface>;
  private mails: Observable<mailInterface[]>;
  private postDoc: AngularFirestoreDocument<mailInterface>;
  private mail: Observable<mailInterface>;
  public selectedMail : mailInterface = {
    id: null
 }

 

  getInBox(user){
    this.postsCollection = this.afs.collection(`inBox/${user}/mail`);
    return this.mails = this.postsCollection.snapshotChanges()
    .pipe( map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data();
        data.id = action.payload.doc.id;
        return data;
      })
    } )) 
  }

  getMessage(){
    this.postDoc = this.afs.doc('inBox/ezm5quDN4YwoMZtj1jJe');
    console.log('prueba', this.postDoc);
    return this.mail = this.postDoc.snapshotChanges()
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
}
