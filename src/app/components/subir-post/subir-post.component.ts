import { postInterface } from './../../models/post';
import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-subir-post',
  templateUrl: './subir-post.component.html',
  styleUrls: ['./subir-post.component.css']
})
export class SubirPostComponent implements OnInit {

  constructor(
    private dataApi: DataApiService
  ) { }

  public posts = {};

  ngOnInit() {
    this.getListPosts();
  }

  getListPosts(){
    this.dataApi.getAll('Post').subscribe( posts => {
      this.posts = posts;
    })
  }

  onDeletePost(){
    console.log('delete post');
  }

 

}
