import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { BrowserStack } from 'protractor/built/driverProviders';
import { DataApiService } from '../../../services/data-api.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: "app-star-modal",
  templateUrl: "./star-modal.component.html",
  styleUrls: ["./star-modal.component.css"]
})
export class StarModalComponent implements OnInit {
  constructor(
    private dataApiService : DataApiService,
    private autService: AuthService
  ) {}

  public selectedOption = "";
  public option0="Experiencia muy negativa";
  public option1="Mala experiencia";
  public option2="No esta mal";
  public option3="Bena experiencia";
  public option4="Muy buena experiencia";
  public option5="Increible";
  private description = [];
  public userRated = false;
  public selectedStar = false;

  @Input('userName') userName: string;
  @Input('userConf') userConf;
  @ViewChild('btnClose') btnClose: ElementRef;

  ngOnInit() {

  }

  showDescription(stars){
    let desc = document.getElementById("starDescription");
    this.checkPuntuation();
    switch(stars){
      case 0:
      desc.innerHTML = this.option0
      break;
      case 1:
      desc.innerHTML = this.option1
      break;
      case 2:
      desc.innerHTML = this.option2
      break;
      case 3:
      desc.innerHTML = this.option3
      break;
      case 4:
      desc.innerHTML = this.option4
      break;
      case 5:
      desc.innerHTML = this.option5
      break;
    }

  }

  selectOption(value,option) {
    this.selectedStar = true;
    this.showDescription(value);
    this.selectedOption = value;
    let selection = document.createElement("div");
    selection.className = "selectStars";
    selection.id = "selectedStars";
    let container = document.getElementById("selectedOption");
    if (container.childElementCount > 2) {
      let select = document.getElementById("selectedStars");
      container.removeChild(select);
    }
    selection.innerHTML = value + " Estrellas";
    container.appendChild(selection);
  }

  puntuation(){
    let user = this.userName;
    if(this.userRated == false){
    this.userConf.stars.userStar.push(user);
    this.userConf.stars.totalStars = parseInt(this.userConf.stars.totalStars) + parseInt(this.selectedOption);
    this.dataApiService.updateUserStars(this.userConf, this.userName);
    this.btnClose.nativeElement.click();
    Swal.fire({
      title: 'Usuario puntuado',
      type: 'success',
      animation: false,
      customClass: {
        popup: 'animated tada'
      }
    })
    }else{
      console.log("este usuario ya ha votado");
    }

  }

  checkPuntuation(){
    let user = this.autService.user.name;
    console.log(user,"esto es ",this.userConf);
    if(this.userConf.stars.userStar.includes(user)){
      this.userRated = true;
  }else{
    this.userRated = false;
  }
}
}
