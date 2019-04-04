import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent implements OnInit {

  constructor(
    private dataApi: DataApiService,
    private authService :AuthService
    ) { }

  public posts = [];
  public post = '';
  private category= '';
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.selectCategory();
    this.dataApi.getAll(this.category).subscribe(posts => {
      this.posts = posts;
      console.log(this.posts);
    })
  }

  selectCategory(){
    this.category = sessionStorage.getItem('categoria');
    
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty("admin");
        });
      }
    });
  }

}
