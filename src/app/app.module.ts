
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { environment } from "../environments/environment";

//Componentes
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsComponent } from "./components/components.component";
import { ListaPostsComponent } from "./components/lista-posts/lista-posts.component";
import { PostComponent } from "./components/post/post.component";
import { HomeComponent } from "./components/home/home.component";
import { ModalComponent } from "./components/modal/modal.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/users/login/login.component";
import { ProfileComponent } from "./components/users/profile/profile.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { Page404Component } from "./components/page404/page404.component";
import { MainFeedComponent } from "./components/main-feed/main-feed.component";
import { SubirPostComponent } from './components/subir-post/subir-post.component';
import { AdminComponent } from './components/admin/admin.component';


//Imports de Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
import { CategoriasComponent } from './components/categorias/categorias.component';

//Pipes
import { SanitizePipe } from './pipes/sanitize.pipe';
import { InBoxComponent } from './components/in-box/in-box.component';



@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    ListaPostsComponent,
    PostComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    MainFeedComponent,
    SubirPostComponent,
    CategoriasComponent,
    AdminComponent,
    SanitizePipe,
    InBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}
