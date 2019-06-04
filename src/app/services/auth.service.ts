import { UserInterface } from "./../models/user";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { auth } from "firebase/app";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "@angular/fire/firestore";
import { mailInterface } from "../models/mail";
import { Router } from "@angular/router";
import { ToolsService } from './tools.service';


@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private afsAuth: AngularFireAuth,
     private afs: AngularFirestore,
     private tools: ToolsService,
     private router: Router
    ) {}
  private mailsCollection: AngularFirestoreCollection<mailInterface>;
  public logged = false;
  public admin = false;
  public user //usuario actual
  public canLog;

  regUser(userData) {
    console.log(userData);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userData.userName}`);
    const data: UserInterface = {
      name: userData.userName,
      password: this.tools.encryptPlainText(userData.password),
      email: userData.email,
      desc: "",
      stars: {
        totalStars: "0",
        userStar: []
      },
      roles: {
        user: true
      },
      profilePic: userData.profilePic,
      categories: []
    };
    userRef.set(data);
    this.LogIn(data.name, userData.password);
  }

  LogIn(user, pass) {
    let postDoc = this.afs.doc(`users/${user}`);
    postDoc.snapshotChanges().subscribe(data => {
        this.user = data.payload.data();
        if(this.user !=undefined){
        let decryptedpass=this.tools.decryptPlainText(this.user.password)
        if(pass==decryptedpass){
          this.canLog = true;
          this.logged = true;
          this.storageInit(this.user);
          this.isUserAdmin();
          this.navigateAfterLogin();
        }else{
          this.canLog = false;
        }
      }else{
        this.canLog = false;
        
      }
      
      
    });

    console.log("canLog?", this.canLog);

    return this.canLog;
  }

  logoutUser() {
    this.logged = false;
    this.admin = false;
  }

  deleteUser(userName){
    let delUser= this.afs.doc(`users/${userName}`);
    delUser.delete();
  }

  updateUserDescription(userName, desc) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userName}`);
    const data: UserInterface = {
      desc: desc
    };
    console.log("llega aqui");
    return userRef.set(data, { merge: true });
  }

  updateUserCategory(userName, categories){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userName}`);
    console.log(userName);
    const data: UserInterface = {
      categories: categories
    };
    console.log("categorias añadidas");
    return userRef.set(data, { merge: true });
  }

  updateUserProfilePic(userName, URL) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userName}`);
    const data: UserInterface = {
      profilePic: URL
    };
    return userRef.set(data, { merge: true });
  }

  isUserAdmin() {
    this.user.roles.admin ? (this.admin = true) : (this.admin = false);
  }

  storageInit(userInfo) {
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  }

  getUserInfo() {
    return JSON.parse(sessionStorage.getItem("userInfo"));
  }

  getAllUsers(){
    let allUsers = this.afs.collection('users');;
    return allUsers.snapshotChanges()
    .pipe( map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data();
        return data;
      })
    } ))
  }

  getOneUser(userName){
    let user = this.afs.doc(`users/${userName}`);
    return user.snapshotChanges()
    .pipe(map(action =>{
      if (action.payload.exists === false){
        return null;
      }else{
        const data = action.payload.data();
        return data;
      }
    } ))
  }

  navigateAfterLogin(){
    let login="/login";
    let register="/register";
    let path = window.location.pathname;
    if(path==login || path==register){
      console.log("pasa por el navigate", window.location.pathname );
     this.router.navigate(['user/categorias']);
    }
  }

}
