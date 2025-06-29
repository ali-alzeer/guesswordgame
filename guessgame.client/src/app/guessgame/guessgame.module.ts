import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuessgameRoutingModule } from './guessgame-routing.module';
import { GuessgameComponent } from './guessgame.component';
import { GameComponent } from '../game/game.component';
import { GamesettingsComponent } from '../gamesettings/gamesettings.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingComponent } from '../loading/loading.component';


@NgModule({
  declarations: [
    GuessgameComponent,
    GameComponent,
    GamesettingsComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GuessgameRoutingModule,
    FontAwesomeModule
  ],
  providers:[],
  bootstrap:[GuessgameComponent]
})
export class GuessgameModule { }
