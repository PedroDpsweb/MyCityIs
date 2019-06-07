import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent implements OnInit {

  constructor(
    private dataApi: DataApiService,
    private authService :AuthService,
    private route : Router,
    public tools: ToolsService
    ) { }

  public posts = [];
  public post = '';
  private category= '';
  public isAdmin = this.authService.admin;
  public userUid: string = null;
  public userName: string = null;
  public pageActual:number = 1;

  ngOnInit() {
    this.userName = sessionStorage.getItem("currentUserName");
    this.selectCategory();
    if(this.category){
      this.dataApi.getAll(this.category, true).subscribe(posts => {
        this.posts = posts;
      })}else{
        this.route.navigate(['user/comunidades']);
      }
    }

  selectCategory(){
      this.category = sessionStorage.getItem('categoria');
  }

}
