
import { postInterface } from './../../models/post';
import { PostComponent } from './../post/post.component';
import { DataApiService } from 'src/app/services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms' ;
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private dataApi: DataApiService,
    private authService :AuthService,
    private router: Router
  ) { }

  public posts: postInterface[];
  public categories = [];
  public isAdmin: any = null;
  public userUid: string = null;
  

  ngOnInit() {
    this.getCategories();
    this.getCurrentUser();
    
  }

  getCategories(){
    this.dataApi.getAll('Categoria').subscribe(categories =>{
      this.categories = categories;
    })
  }

  getListPosts(categoria){
  
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

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty("admin");
          //Enseñarselo a Gelpi
          // if(!this.isAdmin){
          //   this.router.navigate(['']);
          // }
        });
      }
    });
  }

}
