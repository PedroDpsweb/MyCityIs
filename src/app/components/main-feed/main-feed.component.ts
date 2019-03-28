import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  public posts = [];
  public post = '';

  ngOnInit() {
    this.dataApi.getAllPosts().subscribe(posts => {
      this.posts = posts;
      console.log(this.posts);
    })
  }

}
