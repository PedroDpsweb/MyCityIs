import { PostComponent } from './../post/post.component';
import { DataApiService } from 'src/app/services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms' ;
import { postInterface } from 'src/app/models/post';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private dataApi: DataApiService
  ) { }

  public posts: postInterface[];

  ngOnInit() {
    this.getListPosts();
  }

  getListPosts(){
    this.dataApi.getAllPosts().subscribe(posts =>{
      this.posts = posts;
    })
  }

  onDeletePost(){
    console.log("Borrar");
  }

}
