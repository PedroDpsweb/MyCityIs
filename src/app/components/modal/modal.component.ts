import { NgForm } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { postInterface } from './../../models/post';
import { DataApiService } from 'src/app/services/data-api.service';
import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { count, finalize } from 'rxjs/operators';
import { ToolsService } from '../../services/tools.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";
import Swal from 'sweetalert2';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    private authService :AuthService,
    public dataApiService : DataApiService,
    private fireStorage: AngularFireStorage,
    private tools: ToolsService
  ) { }

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input('userUid') userUid: string;
  @Input('userName') userName: string;
  private user="";
  uploadPercent: Observable<number>;
  urlImage: Observable<String>;

  ngOnInit() {
  }

  onSavePost(postForm:NgForm){
    let likeTemplate = {count:"0", users:[] }
   let category = sessionStorage.getItem("categoria");
    if (postForm.value.id === null ){
      postForm.value.like = likeTemplate;
      postForm.value.date = this.tools.dateConverter(this.tools.getFormatedDate());
      postForm.value.user = this.authService.user.name;
      postForm.value.photoUrl =  (<HTMLInputElement>document.getElementById("photoUrl")).value;
      this.dataApiService.addPost(postForm.value);
    }else{
      this.dataApiService.updatePost(postForm.value,category);
    }
    postForm.resetForm();
    this.btnClose.nativeElement.click();
    Swal.fire({
      title: 'Post Subido',
      type: 'success',
      text: 'Su post se publicó correctamente',
      imageUrl:(<HTMLInputElement>document.getElementById("photoUrl")).value,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Imagen Post',
      animation: true
    })


  }

  onUpload(e) {
    let categoria = sessionStorage.getItem("categoria");
    console.log("subiendo..");
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = e.target.files[0];
    const filePath = `${categoria}/${categoria}_${id}`;
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



}
