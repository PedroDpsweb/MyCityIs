import { AngularFireAuth } from "@angular/fire/auth";
import { UserInterface } from "./../../models/user";
import { AuthService } from "./../../services/auth.service";
import { postInterface } from "./../../models/post";
import { DataApiService } from "src/app/services/data-api.service";
import { MailControllerService} from "src/app/services/mail.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-box',
  templateUrl: './in-box.component.html',
  styleUrls: ['./in-box.component.css']
})
export class InBoxComponent implements OnInit {

  constructor(
    private mailApi: MailControllerService,
     
  ) { }

  public inBox = [];
  private user = "";

  ngOnInit() {
    this.getMyInBox();
  }

  // getOneMessage(){
  //   this.mailApi.getMail().subscribe(prueba => { console.log(prueba)})
  // }

  getMyInBox(){
    this.user = sessionStorage.getItem("currentUserName");
    this.mailApi.getInBox(this.user).subscribe(data => {
      this.inBox = data;
    })
  }

  deleteMessage(mailId){
    this.mailApi.deleteMail(mailId,this.user)
  }

}
