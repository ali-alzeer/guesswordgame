import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesettingsComponent } from '../gamesettings/gamesettings.component';
import { GameComponent } from '../game/game.component';

const routes: Routes = [
  // {path:'' ,component:GamesettingsComponent},
  // {path:'play', component:GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GuessgameRoutingModule { }
