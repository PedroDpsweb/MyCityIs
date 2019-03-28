import { postInterface } from './../../models/post';
import { DataApiService } from 'src/app/services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    private dataApi: DataApiService,
    private route: ActivatedRoute,
    ) { }

  public post: postInterface = {};

  ngOnInit() {
    
    const idPost = this.route.snapshot.params['id'];
    this.getDetails(idPost);
  }

  getDetails(idPost){
    this.dataApi.getOnePost(idPost).subscribe( post =>{
      this.post = post;
    })
  }

}
