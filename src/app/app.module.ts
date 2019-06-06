

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { environment } from "../environments/environment";

//Componentes
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostComponent } from "./components/post/post.component";
import { HomeComponent } from "./components/home/home.component";
import { ModalComponent } from "./components/modals/modal/modal.component";
import { MailModalComponent } from './components/modals/mail-modal/mail-modal.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/users/login/login.component";
import { ProfileComponent } from "./components/users/profile/profile.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { Page404Component } from "./components/page404/page404.component";
import { MainFeedComponent } from "./components/main-feed/main-feed.component";
import { AdminComponent } from './components/admin/admin.component';
import { InBoxComponent } from './components/in-box/in-box.component';


//Imports de Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
import { CategoriasComponent } from './components/categorias/categorias.component';

//Pipes
import { SanitizePipe } from './pipes/sanitize.pipe';
import { StarModalComponent } from './components/modals/star-modal/star-modal.component';
import { ComentsComponent } from './components/coments/coments.component';

//Angular material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';






@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    HomeComponent,
    ModalComponent,
    MailModalComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    MainFeedComponent,
    CategoriasComponent,
    AdminComponent,
    SanitizePipe,
    InBoxComponent,
    StarModalComponent,
    ComentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}
