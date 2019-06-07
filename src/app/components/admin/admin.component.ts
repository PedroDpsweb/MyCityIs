
import { postInterface } from './../../models/post';
import { PostComponent } from './../post/post.component';
import { DataApiService } from 'src/app/services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms' ;
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import { ToolsService } from '../../services/tools.service';
import Swal from 'sweetalert2'






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
  public pageActual:number = 1;
  public pageActualUsers:number = 1;




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
      console.log(this.posts);
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
    let conf = Swal.fire({
      title: '¿ Estas seguro ?',
      text: " Vas a borrar a un usuario",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Borrado',
          'El usuario ha sido borrado',
          'success'
        )
        this.authService.deleteUser(userName);
      }
    });
    }


}
