import { userInterface } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService

  ) { }

  user: userInterface = {
    name:'',
    email:'',
    photoUrl:''

  }
  ngOnInit() {
    
    this.authService.isAuth().subscribe( user => {
      if(user){
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
      } 
    }
      

    )
  }

}
