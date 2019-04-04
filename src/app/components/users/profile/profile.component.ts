import { DataApiService } from 'src/app/services/data-api.service';
import { UserInterface } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dataService: DataApiService

  ) { }

  user: UserInterface = {
    name:'',
    email:'',
    photoUrl:'',
    roles:{},
    stars:{},
    categories:'',
    desc:''
  };
  ngOnInit() {
    
    this.authService.isAuth().subscribe( user => {
      if(user){
        
       this.dataService.getUserConf(user.uid).subscribe(userConf =>{
        console.log(userConf);
         this.user = userConf;
         this.user.photoUrl = user.photoURL;
         console.log(this.user)
         this.printStars(this.countingStars(this.user.stars))
       })
      } 
    }
    )

    
  }

  countingStars(starConf){
    //función para representar tu puntuación con estrellas
    let counter = starConf.userStar.length;
    let total = parseInt(starConf.totalStars, 10);
    let stars = Math.floor(total/counter);
    console.log(total);
    return stars
    
  }

  printStars(numStar){
    let starCont = document.getElementById("starCont");
    for(let i=0; i<5; i++){
      if(i<numStar){
        let star = document.createElement('i');
        star.className= "fas fa-star"
        starCont.appendChild(star);
      }else{
        let star = document.createElement('i');
        star.className= "far fa-star";
        starCont.appendChild(star);
        
      }
    }
  }

}
