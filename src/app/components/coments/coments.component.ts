import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import { MailControllerService } from '../../services/mail.service';
import { ToolsService } from '../../services/tools.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from '../../services/data-api.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-coments',
  templateUrl: './coments.component.html',
  styleUrls: ['./coments.component.css']
})
export class ComentsComponent implements OnInit {

  constructor(
    private coments : MailControllerService,
    private tools : ToolsService,
    public authService :AuthService,
    private dataApi: DataApiService
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
  public pageActual:number = 1;

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

  deleteComent(comentId){
    let conf = Swal.fire({
      title: '¿ Estas seguro ?',
      text: " Vas a borrar un comentario",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      console.log("esto sale", result);
      if (result.value) {
        Swal.fire(
          'Borrado',
          'El comentario ha sido borrado',
          'success'
        )
        let category = sessionStorage.getItem("categoria");
      this.dataApi.deleteComent(this.id, comentId,category);
      }
      
    });
}
}
