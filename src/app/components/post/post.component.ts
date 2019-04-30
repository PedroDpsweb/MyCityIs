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
  public isAdmin: any = null;
  public isOwner: boolean = null;
  public userUid: string = null;
  public userName: string = "";
  public like = false;
  public idPost = this.route.snapshot.params["id"];

  ngOnInit() {
    this.getCurrentUser();
    this.getDetails(this.idPost);
  }

  getDetails(idPost) {
    this.dataApi.getOnePost(idPost).subscribe(post => {
      this.post = post;
      this.userName == this.post.user ? this.isOwner = true : this.isOwner = false;

      //tengo que pones likes aparte porque si lo cargo todo junto me llega undefined
      this.likes = post.like;
      console.log(this.post, this.likes);
      this.checkLike();
    });

  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.userName = auth.displayName;
        this.authService.isUserAdmin(this.userName).subscribe(userRole => {
          console.log("y a ti que te pasa", userRole);
          if(userRole){
            this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty("admin");
          }

        });
      }
    });
  }

  OnDeletePost(postId){
    let category = sessionStorage.getItem("categoria");
    this.dataApi.deletePost(postId,category);
    this.router.navigate(['user/mainFeed']);

  }

  checkLike(){
    let user = sessionStorage.getItem('currentUserName');
    if(this.likes.users.includes(user)){
      this.like = true;
  }
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
