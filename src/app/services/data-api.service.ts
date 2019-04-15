import { Observable } from 'rxjs';
import { postInterface } from './../models/post';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) {
   }

  private postsCollection : AngularFirestoreCollection<postInterface>;
  private posts: Observable<postInterface[]>;
  private postDoc: AngularFirestoreDocument<postInterface>;
  private post: Observable<postInterface>;
  public selectedPost : postInterface = {
     id: null
  }
 

  getAll(category){
    this.postsCollection = this.afs.collection<postInterface>(category);
    return this.posts = this.postsCollection.snapshotChanges()
    .pipe( map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as postInterface;
        data.id = action.payload.doc.id;
        return data;
      })
    } )) 
  }

  getOnePost(idPost: string){
    let category = sessionStorage.getItem('categoria');
    this.postDoc = this.afs.doc<postInterface>(category+`/${idPost}`);
    return this.post = this.postDoc.snapshotChanges()
    .pipe(map(action =>{
      if (action.payload.exists === false){
        return null;
      }else{
        const data = action.payload.data() as postInterface;
        data.id = action.payload.id;
        return data;
      }
    }))

  }

  
  addPost(post: postInterface){
    this.postsCollection.add(post)
  }

  updatePost(post: postInterface, category: string){
    let idPost = post.id;
    this.postDoc = this.afs.doc<postInterface>(category+`/${idPost}`);
    this.postDoc.update(post);
  }
  deletePost(idPost: string, category: string){
    this.postDoc = this.afs.doc<postInterface>(category+`/${idPost}`);
    this.postDoc.delete();
  }

  
  getUserConf(userName){
    this.postDoc = this.afs.doc(`users/${userName}`);
    return this.post = this.postDoc.snapshotChanges()
    .pipe(map(action =>{
      if (action.payload.exists === false){
        
        return null;
      }else{
        const data = action.payload.data();
        return data;
      }
    }))

  }



}
