import { MailControllerService } from "./../../../services/mail.service";
import { DataApiService } from "src/app/services/data-api.service";
import { UserInterface } from "./../../../models/user";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Params ,Router } from "@angular/router";




@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private dataService: DataApiService,
    private route: ActivatedRoute,
    private mail: MailControllerService,
    private router: Router
  ) {}

  user: UserInterface = {
    name: "",
    email: "",
    photoUrl: "",
    roles: {},
    stars: {},
    categories: "",
    desc: "",
    profilePic:""
  };

  @ViewChild('btnClose') btnClose: ElementRef;
  public profilePic="";
  public userName = "";
  public userDesc = "";
  public email = "";
  public categories = "";
  public userId = "";
  public totalStars = "";
  public chargedStars = false;
  public userConf = {};
  public isUser = false;
  private userRef;

  ngOnInit() {
    //this.chargedStars = false;
    //Nos suscribimos a los parametros de la URL para cargar el perfil cuanto cambie la URL sin cambiar el componente
    this.route.params.subscribe((params: Params) => {
      this.profileCharge(params);
    });
  }

  profileCharge(params) {
    if(!params && this.authService.logged == true){
      this.profilePic = this.authService.user.profilePic;
      this.userName = this.authService.user.name;
      this.userDesc = this.authService.user.desc;
      this.email = this.authService.user.email;
      this.categories = this.authService.user.categories;
      this.totalStars = this.authService.user.stars.totalStars
    }
    else if(params){
      const userName = this.route.snapshot.params["name"];
      this.userName = userName;
      this.dataService.getUserConf(userName).subscribe((data => {
      this.userConf = {
        stars:data.stars
      };
      this.profilePic = data.profilePic;
      this.userName =data.name;
      this.userDesc = data.desc;
      this.email = data.email;
      this.categories = data.categories;
      this.totalStars = data.stars.totalStars;
      this.printStars(this.countingStars(data.stars));
      this.chargedStars = true;
      }))



    }else{
      this.router.navigate(['/'])

    }
  }

  countingStars(starConf) {
    console.log(starConf);
    //función para representar tu puntuación con estrellas
    let counter = starConf.userStar.length;
    let total = parseInt(starConf.totalStars, 10);
    let stars = Math.floor(total / counter);
    console.log(total);
    return stars;
  }

  printStars(numStar) {
    let starCont = document.getElementById("starCont");
    console.log(starCont);
    starCont.innerHTML="";
      for (let i = 0; i < 5; i++) {
        if (i < numStar) {
          let star = document.createElement("i");
          star.className = "fas fa-star";
          starCont.appendChild(star);
        } else {
          let star = document.createElement("i");
          star.className = "far fa-star";
          starCont.appendChild(star);
        }
      }
  }

  sendMail() {}

  changeDesc(){
    let desc = (<HTMLInputElement>document.getElementById("userNewDesc")).value;
      this.authService.updateUserDescription(this.authService.user.name, desc);
      (<HTMLInputElement>document.getElementById("userNewDesc")).value = "";
    this.btnClose.nativeElement.click();

  }


  deleteUser(){
   let delUser = confirm(" ¿ Estas seguro que quieres borrar esta cuenta de Usuario ?");
   if(delUser){
     this.userRef.delete();
     this.router.navigate(["/"]);
   }
  }
}
