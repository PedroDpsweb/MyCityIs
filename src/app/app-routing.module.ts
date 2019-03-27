import { ProfileComponent } from './components/users/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListaPostsComponent } from './components/lista-posts/lista-posts.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import { MainFeedComponent } from './components/main-feed/main-feed.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'listaPosts', component: ListaPostsComponent},
  {path:'user/mainFeed', component: MainFeedComponent},
  {path:'user/profile', component:ProfileComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
