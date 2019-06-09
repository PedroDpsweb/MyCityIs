import { Component, OnInit, ElementRef, ViewChild , Output , EventEmitter } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { MailControllerService } from "../../../services/mail.service";
import { ToolsService } from '../../../services/tools.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private mail: MailControllerService,
    private authService: AuthService,
    private fireStorage: AngularFireStorage,
    private tools :ToolsService
  ) {}

  @ViewChild("imageUser") inputImageUser: ElementRef;
  public userName: string;
  public email: string = "";
  public password: string = "";
  uploadPercent: Observable<number>;
  urlImage: Observable<String>;
  public blocked = false;

  ngOnInit() {}

  registeringUser(form, img){
  if(form.userName != "admin"){
    form.profilePic = img.value;
    this.authService.regUser(form);
    this.welcomeMail(form.userName);
  }else{
    this.blocked = true;
  }
  
  }

  onUpload(e) {
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = e.target.files[0];
    const filePath = `profile/profile_${id}`;
    const ref = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(finalize(() => (
        //Campo oculto del html, aquí se queda guardada la URL de la imagen
        this.urlImage = ref.getDownloadURL())))
      .subscribe();
  }


  welcomeMail(destination) {
    let welcome = {
      title: "Bienvenido a MycityIs",
      body: "Ya puedes disfrutar de todo el contenido",
      date: this.tools.getFormatedDate(),
      user: "MycityIs CEO"
    };
    this.mail.sendMail(welcome, destination);
  }
}
