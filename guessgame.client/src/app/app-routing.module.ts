import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuessgameComponent } from './guessgame/guessgame.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GamesettingsComponent } from './gamesettings/gamesettings.component';
import { GameComponent } from './game/game.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  // {path:'', component:GuessgameComponent ,children:[
  //   {path:'' ,component:GamesettingsComponent},
  //   {path:'play', component:GameComponent}
  // ]},
  {path:'', component:GuessgameComponent},
  {path:'admin-login', component:AdminLoginComponent},
  {path:'**', component:NotfoundComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
