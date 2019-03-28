import { SubirPostComponent } from './components/subir-post/subir-post.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListaPostsComponent } from './components/lista-posts/lista-posts.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import { MainFeedComponent } from './components/main-feed/main-feed.component';
import { PostComponent } from './components/post/post.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'user/categorias', component: CategoriasComponent},
  {path:'listaPosts', component: ListaPostsComponent},
  {path:'user/post/:id', component: PostComponent},
  {path:'user/subirPost', component: SubirPostComponent},
  {path:'user/mainFeed', component: MainFeedComponent},
  {path:'user/profile', component:ProfileComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'admin', component: AdminComponent},
  {path:'**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
