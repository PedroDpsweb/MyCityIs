import { NgForm } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { postInterface } from './../../models/post';
import { DataApiService } from 'src/app/services/data-api.service';
import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    private authService :AuthService,
    public dataApiService : DataApiService
  ) { }

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input('userUid') userUid: string;
  private user="";

  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if(user){
        this.user = user.displayName;
      }})
  }

  onSavePost(postForm:NgForm){
   let category = sessionStorage.getItem("categoria");
    if (postForm.value.id === null ){
      console.log(this.userUid);
      // postForm.value.userUid = this.userUid;
      this.dataApiService.addPost(postForm.value);
    }else{
      this.dataApiService.updatePost(postForm.value,category);;
    }
    postForm.resetForm();
    this.btnClose.nativeElement.click();
    

  }



}
