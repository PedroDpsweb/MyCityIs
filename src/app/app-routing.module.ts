import { ProfileComponent } from './components/users/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import { MainFeedComponent } from './components/main-feed/main-feed.component';
import { PostComponent } from './components/post/post.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { AdminComponent } from './components/admin/admin.component';
import { InBoxComponent } from './components/in-box/in-box.component';


//Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuardGuard } from './guards/admin-guard.guard';





const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'user/categorias', component: CategoriasComponent ,canActivate:[AuthGuard]},
  {path:'user/inBox', component: InBoxComponent},
  {path:'user/post/:id', component: PostComponent ,canActivate:[AuthGuard]},
  {path:'user/mainFeed', component: MainFeedComponent ,canActivate:[AuthGuard]},
  {path:'user/profile/:name', component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'admin', component: AdminComponent, canActivate:[AdminGuardGuard]},
  {path:'**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
