import { MailControllerService } from "./../../../services/mail.service";
import { DataApiService } from "src/app/services/data-api.service";
import { UserInterface } from "./../../../models/user";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dataService: DataApiService,
    private route: ActivatedRoute,
    private mail: MailControllerService
  ) {}

  user: UserInterface = {
    name: "",
    email: "",
    photoUrl: "",
    roles: {},
    stars: {},
    categories: "",
    desc: ""
  };

  public userName = "";
  public userId = "";
  public chargedStars = false;

  ngOnInit() {
    //this.chargedStars = false;
    //Nos suscribimos a los parametros de la URL para cargar el perfil cuanto cambie la URL sin cambiar el componente
    this.route.params.subscribe((params: Params) => {
      this.profileCharge();
    });
  }

  profileCharge() {
    const userName = this.route.snapshot.params["name"];
    this.userName = userName;
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.dataService.getUserConf(user.displayName).subscribe(userConf => {
          console.log(userConf);
          this.user = userConf;
          this.user.photoUrl = user.photoURL;
          if(this.chargedStars == false){
            this.printStars(this.countingStars(this.user.stars));
            this.chargedStars = true;
          } 
        });
      }
    });
  }

  countingStars(starConf) {
    //función para representar tu puntuación con estrellas
    let counter = starConf.userStar.length;
    let total = parseInt(starConf.totalStars, 10);
    let stars = Math.floor(total / counter);
    console.log(total);
    return stars;
  }

  printStars(numStar) {
    let starCont = document.getElementById("starCont");
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
    this.authService.isAuth().subscribe(user => {
      this.userName = user.displayName;
      this.authService.updateUserDescription(this.userName, desc);
    });
  }
}
