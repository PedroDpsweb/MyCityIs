
import { postInterface } from './../../models/post';
import { PostComponent } from './../post/post.component';
import { DataApiService } from 'src/app/services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms' ;
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import { ToolsService } from '../../services/tools.service';





@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private dataApi: DataApiService,
    private authService :AuthService,
    private router: Router,
    public tools: ToolsService,

  ) { }

  public posts: postInterface[];
  public categories = [];
  public isAdmin: any = null;
  public userUid: string = null;
  public userName: string = null;

  public selectedCategory :"";
  public users;
  public selectedUser;
  public unknown;




  ngOnInit() {
    this.getCategories();
  }

;


  getCategories(){
    this.dataApi.getAll('Categoria').subscribe(categories =>{
      this.categories = categories;
    })
  }

  selectCategory(categoria){
 return categoria;
  }

  getListPosts(categoria){
  this.selectedCategory = categoria;
    this.dataApi.getAll(categoria).subscribe(posts =>{
      this.posts = posts;
    })
  }

  onDeletePost(postId,category){
    const confirmacion = confirm('¿Seguro que quieres eliminar el Post?');
    if (confirmacion){
      this.dataApi.deletePost(postId,category);
    }
  }

  onPreUpdatePost(post,category){
    sessionStorage.setItem("categoria", category);
    this.dataApi.selectedPost = Object.assign({}, post)
  }

  getAllUsers(){
    this.authService.getAllUsers().subscribe(data => this.users=data);
  }

  getOneUser(){
    this.unknown = false;
    this.selectedUser = null;
    let userName= (<HTMLInputElement>document.getElementById("searchUser")).value
    console.log(userName);
    this.authService.getOneUser(userName).subscribe(data => {
      if(data){
        this.selectedUser = data
      }else{
        this.unknown = true;
      }

    } )
  }
  onDelUser(userName){
    const confirmacion = confirm('¿Seguro que quieres eliminar este Usuario?');
    if(confirmacion){
      this.authService.deleteUser(userName);
    }
    }


}
