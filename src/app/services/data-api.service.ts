import { Observable } from 'rxjs';
import { postInterface } from './../models/post';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { database } from 'firebase';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) {
    //this.postsCollection = this.afs.collection<postInterface>('Post');
    //this.posts = this.postsCollection.valueChanges();
   }

  private postsCollection : AngularFirestoreCollection<postInterface>;
  private posts: Observable<postInterface[]>;
  private postDoc: AngularFirestoreDocument<postInterface>;
  private post: Observable<postInterface>;

  getAllPosts(){
    this.postsCollection = this.afs.collection<postInterface>('Post');
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
    this.postDoc = this.afs.doc<postInterface>(`Post/${idPost}`);
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

  updatePost(post: postInterface){
    let idPost = post.id;
    this.postDoc = this.afs.doc<postInterface>(`Post/${idPost}`);
    this.postDoc.update(post);
  }
  deletePost(idPost: string){
    this.postDoc = this.afs.doc<postInterface>(`Post/${idPost}`);
    this.postDoc.delete();
  }
  getAllCategories(){

  }
}
