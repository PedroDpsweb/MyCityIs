import { NgForm } from "@angular/forms";
import { AuthService } from "./../../services/auth.service";
import { mailInterface } from "./../../models/mail";
import { DataApiService } from "src/app/services/data-api.service";
import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { MailControllerService } from "../../services/mail.service";
import { ToolsService } from '../../services/tools.service';
import Swal from 'sweetalert2';

@Component({
  selector: "app-mail-modal",
  templateUrl: "./mail-modal.component.html",
  styleUrls: ["./mail-modal.component.css"]
})
export class MailModalComponent implements OnInit {
  constructor(
    private authService: AuthService,
     public mail: MailControllerService,
     public tools: ToolsService) {}

  @ViewChild("btnClose") btnClose: ElementRef;
  @Input("userName") userName: string;
  @Input("userId") userId: string;

  ngOnInit() {

  }

  onSaveMail(mailForm: NgForm) {

    mailForm.value.user = this.authService.user.name;
    mailForm.value.id = this.userId;
    mailForm.value.date = this.tools.getFormatedDate();
    console.log(mailForm);
    this.mail.sendMail(mailForm.value, this.userName);
    mailForm.resetForm();
    this.btnClose.nativeElement.click();
    Swal.fire({
      type: 'success',
      title: 'Mensaje enviado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
    

  }
}
