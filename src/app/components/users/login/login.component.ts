import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToolsService } from '../../../services/tools.service';
import { isError } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private tools: ToolsService
  ) {}

  public userName: string = '';
  public password: string = '';
  public isError = false;
  private logged;

  ngOnInit() {
    // let session = this.getSessionCredentials();
    // if(session==true){
    //   this.onLogin()
    // }
  }

  onLogin() {
    let cipherPass = this.tools.encryptPlainText(this.password);
    this.authService.LogIn(this.userName, this.password);

  }

  onLogout() {
    this.authService.logoutUser();
  }

}
