import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map , tap} from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private afsAuth: AngularFireAuth,
     private router: Router,
     private authService: AuthService,

  ){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let status = JSON.parse(sessionStorage.getItem('logged'))
      console.log("aqui",status);
      if(status==true){
        return true
      }else{
        console.log("user-guard activado");
        this.router.navigate(['']);
      }



    }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
    }
}
