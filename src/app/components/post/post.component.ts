import { AngularFireAuth } from "@angular/fire/auth";
import { UserInterface } from "./../../models/user";
import { AuthService } from "./../../services/auth.service";
import { postInterface } from "./../../models/post";
import { DataApiService } from "src/app/services/data-api.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Router } from '@angular/router';

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
      private router: Router) {}

  public post: postInterface = {};
  public isAdmin: any = null;
  public userUid: string = null;
  public userName: string = null;

  ngOnInit() {
    const idPost = this.route.snapshot.params["id"];
    this.getDetails(idPost);
    this.getCurrentUser();
    
  }

  getDetails(idPost) {
    this.dataApi.getOnePost(idPost).subscribe(post => {
      this.post = post;
      console.log(this.post);
    });
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.userName = auth.displayName;
        this.authService.isUserAdmin(this.userName).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty("admin");
        });
      }
    });
  }

  OnDeletePost(postId){
    let category = sessionStorage.getItem("categoria");
    this.dataApi.deletePost(postId,category);
    this.router.navigate(['user/mainFeed']);

  }
}
