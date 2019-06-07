import { AngularFireAuth } from "@angular/fire/auth";
import { UserInterface } from "./../../models/user";
import { AuthService } from "./../../services/auth.service";
import { postInterface } from "./../../models/post";
import { DataApiService } from "src/app/services/data-api.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Router } from '@angular/router';
import { post } from 'selenium-webdriver/http';
import { ToolsService } from '../../services/tools.service';
import Swal from 'sweetalert2';

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  constructor(
    private dataApi: DataApiService,
     private route: ActivatedRoute,
      private authService: AuthService,
      public tools: ToolsService,
      private router: Router) {}


  public post: postInterface = {};
  public likes:any = {}
  public isAdmin: any = this.authService.admin;
  public isOwner: boolean = null;
  public userUid: string = null;
  public userName: string = JSON.parse(sessionStorage.getItem('userInfo')).name;
  public like = false;
  public idPost = this.route.snapshot.params["id"];
  public isUpdate = false;

  ngOnInit() {
    this.getDetails(this.idPost);
  }

  getDetails(idPost) {
    console.log("esta cargando getDetails");
    this.dataApi.getOnePost(idPost).subscribe(post => {
      this.post = post;
      if(this.post.user!=null){
        this.authService.user.name == this.post.user ? this.isOwner = true : this.isOwner = false;
      }
      //tengo que poner likes aparte porque si lo cargo todo junto me llega undefined
      this.likes = post.like;
      console.log(this.post, this.likes);
      this.checkLike();
    });

  }

//Mirar mas adelante, da error porque antes dle nabigate intenta cargar la foto borrada (aun asi funciona bien)
  OnDeletePost(postId){
    let conf = Swal.fire({
      title: '¿ Estas seguro ?',
      text: " Vas a borrar un post",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Borrado',
          'El post ha sido borrado',
          'success'
        )
        let category = sessionStorage.getItem("categoria");
    this.dataApi.deletePost(postId,category);
    this.router.navigate(['user/mainFeed']);
      }
    });
  }

  checkLike(){
    let user = this.userName;
    if(this.likes.users.includes(user)){
      this.like = true;
  }
  }

  onPreUpdatePost(post){
    this.isUpdate=true;
    this.dataApi.selectedPost = Object.assign({}, post)
  }

  onLike(){
    let categoria = sessionStorage.getItem("categoria");
    //Dando like
    if(!this.like){
      console.log("pulasado like");
      this.likes.count = (parseInt(this.likes.count,10))+1
      this.likes.users.push(this.userName);
      console.log(this.likes);
      this.like = true;
      this.dataApi.updatePostLike(categoria,this.idPost,this.likes)

    }else{
      //Quitando like
      console.log("ya no me gusta")
      this.like = false;
      for(let user of this.likes.users ){
        if(this.userName == user){
          console.log("entra", this.likes.users)
          this.likes.count = (parseInt(this.likes.count,10))-1
          this.likes.users.splice(user);
          this.dataApi.updatePostLike(categoria,this.idPost,this.likes)
        }
      }
    }

  }


}
