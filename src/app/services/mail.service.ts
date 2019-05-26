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
    console.log(user);
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
    return this.mail = this.mailDoc.snapshotChanges()
    .pipe(map(action =>{
      if (action.payload.exists === false){
        return null;
      }else{
        const data = action.payload.data();
        return data;
      }
    }))

  }

  sendMail(mail: mailInterface, destination){
    console.log("destino del mensaje", destination);
    let user = mail.user;
    this.mailsCollection = this.afs.collection(`users/${destination}/inBox`);
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

  ///Pongo los coments aqui pero hay que refactorizarlo en un solo codigo, son las mismas funciones
  getAll(category, destination){
    this.mailsCollection = this.afs.collection(`${category}/${destination}/coments`, ref => ref.orderBy('date', 'desc'));
    return this.mails = this.mailsCollection.snapshotChanges()
    .pipe( map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data();
        data.id = action.payload.doc.id;
        return data;
      })
    } ))
  }


  send(message,category, destination){
    this.mailsCollection = this.afs.collection(`${category}/${destination}/coments`);
    this.mailsCollection.add(message)
  }

  update(mail: mailInterface,id: string,category, destination){
    this.mailDoc = this.afs.doc<mailInterface>(`${category}/${destination}/coments/${id}`);
    this.mailDoc.update(mail);
  }

  delete(id,category, destination){
    this.mailDoc = this.afs.doc<mailInterface>(`${category}/${destination}/coments/${id}`);
    this.mailDoc.delete();
  }



}
