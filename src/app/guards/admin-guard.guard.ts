import { AuthService } from "./../services/auth.service";
import { Injectable } from "@angular/core";
import {CanActivate, CanActivateChild, CanLoad, Route, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from "@angular/router";
import { Observable, pipe } from "rxjs";
import { take, map, tap } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { truncate } from 'fs';

@Injectable({
  providedIn: "root"
})
export class AdminGuardGuard implements CanActivate {
  constructor(
    private afsAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private afs: AngularFirestore
      )
      {}


  private isAdmin: any = null;
  private user: string = "";

   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {

    if(this.authService.admin==true){
      return true
    }else{
      this.router.navigate(['']);
    }
  }



  }
