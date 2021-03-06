import { Component, OnInit ,Output , EventEmitter} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import { ToolsService } from '../../services/tools.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MailControllerService } from '../../services/mail.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService :AuthService,
    private afsAuth: AngularFireAuth,
    private router: Router,
    private tools: ToolsService,
    private mail: MailControllerService
    ) { }

  public app_name: string = "My City Is";
  public isLogged = this.authService.logged;
  public userUid: string = "";
  public userName: string = "";
  private password;
  public isAdmin = this.authService.admin;

  ngOnInit() {
    // this.getCurrentUser();
    let session = this.getSessionCredentials();
    if(session==true){
      this.onLogin()
    }

  }


  // getCurrentUser(): any{
  //   if(sessionStorage.getItem("userInfo")){
  //     let userInfo =this.authService.getUserInfo();
  //     this.authService.LogIn(userInfo.name, userInfo.password)
  //   }
  // }

  onLogout(){
    this.isAdmin = false;
    sessionStorage.clear();
    this.authService.logoutUser();
  }

  searchUserByName(){
    let search = (<HTMLInputElement>document.getElementById('search')).value;
    this.router.navigate([`user/profile/${search}`]);
  }

  getSessionCredentials(){
    if(sessionStorage.getItem('userInfo')){
      let user =  JSON.parse(sessionStorage.getItem('userInfo'))
      this.userName = user.name;
      this.password = this.tools.decryptPlainText(user.password);
      return true
    }
  }

  onLogin(){
     //sessionStorage.clear();
     let cipherPass = this.tools.encryptPlainText(this.password);
      this.authService.LogIn(this.userName, this.password);
    
  }

  async suggestion(){
   	
const {value: text} = await Swal.fire({
  title: 'Envianos tu segerencia',
  input: 'textarea',
  inputPlaceholder: 'Envianos una sugerencia',
  showCancelButton: true
})
if (text) {
 this.mail.suggestionMail(this.authService.user.name, text);
  Swal.fire(
    'Gracias por ayudarnos',
  'Nuestro equipo revisará tu sugerencia',
  'success'
    )
}
  }

}
