import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService : AuthService

  ){}

  public email: string = '';
  public password: string = '';
  public isError = false;

  ngOnInit() {
  }

  onLogin() {
    sessionStorage.clear();
    this.authService.loginEmailUser(this.email, this.password)
    .then ((res) =>{
      let userId = this.afAuth.auth.currentUser.uid;
      let userName = this.afAuth.auth.currentUser.displayName;
      sessionStorage.setItem("currentUser",userId);
      sessionStorage.setItem("currentUserName", userName);
      this.router.navigate(['user/categorias']);
    }).catch( err => this.isError = true);
  }

  onLogout(){
    this.afAuth.auth.signOut();
  }

  

}
