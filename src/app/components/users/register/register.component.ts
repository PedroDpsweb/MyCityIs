import { Component, OnInit, ElementRef, ViewChild , Output , EventEmitter } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { MailControllerService } from "../../../services/mail.service";

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
    private fireStorage: AngularFireStorage
  ) {}

  @ViewChild("imageUser") inputImageUser: ElementRef;
  public userName: string;
  public email: string = "";
  public password: string = "";
  uploadPercent: Observable<number>;
  urlImage: Observable<String>;

  ngOnInit() {}

  registeringUser(form, img){
  form.profilePic = img.value;
  this.authService.regUser(form);
  this.welcomeMail(form.userName);
  console.log("acabo");
  }

  // onAddUser() {
  //   this.authService
  //     .registerUser(this.email, this.password, this.userName)
  //     .then(res => {
  //       this.authService.isAuth().subscribe(user => {
  //         if (user) {
  //           console.log("userActual", user);
  //           user
  //             .updateProfile({
  //               displayName: this.userName,
  //               photoURL: this.inputImageUser.nativeElement.value
  //             })
  //             .then(() => {
  //               this.authService.updateUserProfilePic(user.displayName, user.photoURL);
  //               this.welcomeMail(this.userName);
  //               this.router.navigate(["/"]);
  //             })
  //             .catch(error => console.log("error", error));
  //         }
  //       });
  //     })
  //     .catch(err => console.log("err", err.message));
  // }

  /** - Capturamos el evento de la subida de imagen
   *  - Subimos la imagen a FireStorage
   *  - Guardamos la URL en un campo oculto dle HTML
   */
  onUpload(e) {
    console.log("subiendo..");
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
      date: "Hoy",
      user: "MycityIs CEO"
    };
    this.mail.sendMail(welcome, destination);
  }
}
