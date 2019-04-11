import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
//DNS de usuarios
import DNS from '../../../assets/DNS/users.json';

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
  public isAdmin: boolean = false;

  ngOnInit() {
    this.getCurrentUser();
  }

 

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        console.log(auth.displayName);
        this.isLogged = true;
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty("admin");
        })
  }else{
      console.log('not logged');
      this.isLogged = false;
    }
      
  });
  }

  onLogout(){
    this.authService.logoutUser();
  }

  searchUserByName(){
    let search = (<HTMLInputElement>document.getElementById('search')).value;
    this.router.navigate([`user/profile/${DNS[search]}`]);
  }

}
