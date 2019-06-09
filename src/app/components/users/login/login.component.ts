import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToolsService } from '../../../services/tools.service';
import { isError } from 'util';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MailControllerService } from '../../../services/mail.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public authService: AuthService,
    private tools: ToolsService,
    private mail: MailControllerService
  ) {}

  public userName: string = '';
  public password: string = '';
  public isError = false;
  private logged;

  ngOnInit() {}

  onLogin() {
    this.authService.LogIn(this.userName, this.password);
  }

  onLogout() {
    this.authService.logoutUser();
  }

  async rememberPass() {
    const { value: text } = await Swal.fire({
      title: 'Recordar Contraseña',
      input: 'text',
      inputPlaceholder: 'Introduce tu nombre de usuario',
      showCancelButton: true
    });
    if (text) {
      //this.mail.rememberPass(text);
      Swal.fire(
        'Tu contraseña ha sido enviada',
        'Te hemos enviado la contraseña, por favor revisa tu correo',
        'success'
      );
    }
  }
}
