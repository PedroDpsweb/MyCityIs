import { NgForm } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { mailInterface } from './../../models/mail';
import { DataApiService } from 'src/app/services/data-api.service';
import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { MailControllerService } from '../../services/mail.service';

@Component({
  selector: 'app-mail-modal',
  templateUrl: './mail-modal.component.html',
  styleUrls: ['./mail-modal.component.css']
})
export class MailModalComponent implements OnInit {

  constructor(
    
    private authService :AuthService,
    public mail : MailControllerService
  
  ) { }

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input('userName') userName: string;
  private user="";

  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if(user){
        this.user = user.displayName;
      }})
  }

  onSaveMail(mailForm:NgForm){
    if (mailForm.value.id === null ){
      console.log(mailForm);
      // postForm.value.userUid = this.userUid;
      this.mail.sendMail(this.userName,mailForm.value);
    }
    mailForm.resetForm();
    this.btnClose.nativeElement.click();
    

  }


}
