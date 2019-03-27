import { Component, OnInit ,ElementRef , ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {Router} from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private fireStorage: AngularFireStorage)
    { }

    @ViewChild('imageUser') inputImageUser : ElementRef;
    public userName: string;
    public email: string ='';
    public password: string='';
    uploadPercent: Observable<number>;
    urlImage: Observable<String>;

  ngOnInit() {
  }

  onAddUser(){
    this.authService.registerUser(this.email, this.password)
    .then((res) =>{
      this.authService.isAuth().subscribe(user => {
        if(user){
          console.log('userActual', user);
          console.log('aqui ' + this.inputImageUser.nativeElement.value);
          user.updateProfile({
            displayName:this.userName,
            photoURL: this.inputImageUser.nativeElement.value
          }).then(() => {
            this.router.navigate(['user/mainFeed']);;
          }).catch((error) => console.log('error', error));
        }
        })
    }).catch(err => console.log('err', err.message));
  }

  onUpload(e){
    console.log('subiendo..');
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/profile_${id}`
    const ref = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

}
