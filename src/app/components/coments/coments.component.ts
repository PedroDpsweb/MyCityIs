import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import { MailControllerService } from '../../services/mail.service';
import { ToolsService } from '../../services/tools.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-coments',
  templateUrl: './coments.component.html',
  styleUrls: ['./coments.component.css']
})
export class ComentsComponent implements OnInit {

  constructor(
    private coments : MailControllerService,
    private tools : ToolsService,
    public authService :AuthService
  ) { }

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input('id') id: string;
  private category = sessionStorage.getItem("categoria");
  private coment = {
    user: JSON.parse(sessionStorage.getItem('userInfo')).name,
    text:"",
    date:"",
    img:""
  }
  public comentaryList = [];
  private MyInfo = this.authService.getUserInfo();
  comentReady = false;

  ngOnInit() {
    this.getComents();
  }

  getComents(){
    this.coments.getAll(this.category, this.id).subscribe(data => {
      this.comentaryList = data;
    })
  }

  sendComentary(){
    this.coment.text = (<HTMLInputElement>document.getElementById("comentInput")).value;
    this.coment.date = this.tools.getFormatedDate();
    this.coment.img = this.MyInfo.profilePic;
      this.coments.send(this.coment, this.category, this.id);
      (<HTMLInputElement>document.getElementById("comentInput")).value = "";
      this.btnClose.nativeElement.click();

  }

  checkComent(){
    
    let coment = this.coment.text = (<HTMLInputElement>document.getElementById("comentInput")).value;
    console.log(coment);
    coment!=""?this.comentReady=true:this.comentReady=false;
  }

}
