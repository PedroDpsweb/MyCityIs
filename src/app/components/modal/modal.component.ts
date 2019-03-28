import { AuthService } from './../../services/auth.service';
import { postInterface } from './../../models/post';
import { DataApiService } from 'src/app/services/data-api.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    private authService :AuthService,
    private dataApiService : DataApiService
  ) { }

  public post :postInterface = {
    title:'',
    user:'',
    description:'',
    photoUrl:'',
    date:'',
    like:''

  };

  private user="";

  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if(user){
        this.user = user.displayName;
      }})
  }

  addPost(){
    this.post.user = this.user;
    this.dataApiService.addPost(this.post);

  }



}
