import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import { MailControllerService } from '../../services/mail.service';
import { ToolsService } from '../../services/tools.service';


@Component({
  selector: 'app-coments',
  templateUrl: './coments.component.html',
  styleUrls: ['./coments.component.css']
})
export class ComentsComponent implements OnInit {

  constructor(
    private coments : MailControllerService,
    private tools : ToolsService
  ) { }

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input('id') id: string;
  private category = sessionStorage.getItem("categoria");
  private coment = {
    user: sessionStorage.getItem("currentUserName"),
    text:"",
    date:""
  }
  public comentaryList = []

  ngOnInit() {
    this.getComents();
  }

  getComents(){
    this.coments.getAll(this.category, this.id).subscribe(data => {
      this.comentaryList = data;
      console.log("esto recibo",data);
    })
  }

  sendComentary(){
    console.log("comentario enviado");
    this.coment.text = (<HTMLInputElement>document.getElementById("comentInput")).value;
    this.coment.date = this.tools.getFormatedDate();
    // this.authService.isAuth().subscribe(user => {
    //   this.userName = user.displayName;
      this.coments.send(this.coment, this.category, this.id);
      (<HTMLInputElement>document.getElementById("comentInput")).value = "";
      this.btnClose.nativeElement.click();

  }

}
