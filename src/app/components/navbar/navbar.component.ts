import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService :AuthService,
    private afsAuth: AngularFireAuth,
    private router: Router
    ) { }

  public app_name: string = "My City Is";
  public isLogged: boolean = false;
  public userUid: string = "";
  public userName: string = "";
  public isAdmin: boolean = false;

  ngOnInit() {
    this.getCurrentUser();
  }


  getCurrentUser(): any{
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log(auth);
        this.authService.isUserAdmin(auth.displayName).subscribe(userRole => {
          if(userRole != undefined){
          //Si el usuario no es admin no entra aquí
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty("admin");
        }
        this.userName = auth.displayName;
        this.userUid = auth.uid
        if(this.userName){
          this.isLogged = true;
          this.authService.storageInit(this.userUid,this.userName);
        }
      })
  }else{
      console.log('not logged');
      this.isLogged = false;
    }
  });
  }

  onLogout(){
    this.isAdmin = false;
    sessionStorage.clear();
    this.authService.logoutUser();
  }

  searchUserByName(){
    let search = (<HTMLInputElement>document.getElementById('search')).value;
    this.router.navigate([`user/profile/${search}`]);
  }

}
