import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faArrowDown, faPaintBrush, faBucket, faGamepad, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { GamesettingsComponent } from '../gamesettings/gamesettings.component';
import { GameComponent } from '../game/game.component';
import { ISettings } from '../Models/settings.interface';
import { GameServiceService } from '../services/game-service.service';
import { Word } from '../Models/Word.interface';

@Component({
  selector: 'app-guessgame',
  templateUrl: './guessgame.component.html',
  styleUrl: './guessgame.component.css'
})
export class GuessgameComponent implements AfterViewInit, OnInit{

  Error = false;

  GameStarted = false
  GameFinished = false

  PlayerWon = false

  faArrowDown = faArrowDown
  faPaintBrush = faPaintBrush
  faBucket = faBucket
  faGamepad = faGamepad
  faKeyboard = faKeyboard

  FinalNumberOfLetter!:number
  FinalNumberOfTries!:number

  WordFromDB :Word = {
    word:"",
    description:""
  }

  FinalNumberOfHints!: number

  constructor(private gameService:GameServiceService){
    
  }

  ngOnInit(){
    window.scroll({
      top:0,
      behavior:'smooth'
    })
    // console.log(this.WordFromDB);
    // if(this.WordFromDB.word !== "" && this.WordFromDB.description !== ""){
    //   console.log("true");
    // }
    // else{
    //   console.log("false");
    // }
  }

  ngAfterViewInit(): void {
    // console.log(this.WordFromDB);
    // if(this.WordFromDB.word !== "" && this.WordFromDB.description !== ""){
    //   console.log("true");
    // }
    // else{
    //   console.log("false");
    // }
  }

  GetGameSettings(settings:ISettings){
    this.FinalNumberOfLetter = settings.NumberOfLetters
    this.FinalNumberOfTries = settings.NumberOfTries
    this.FinalNumberOfHints = Math.floor(settings.NumberOfLetters / 3)
    // console.log(this.FinalNumberOfLetter);
    // console.log(this.FinalNumberOfTries);
    this.GameStarted = true
    this.gameService.GetRandomWord(this.FinalNumberOfLetter).subscribe(
      (res:any) => {
        this.WordFromDB = {
          word : res.word,
          description: res.description
        }

        this.Error = false

        // console.log(this.WordFromDB);
        // if(this.WordFromDB.word !== "" && this.WordFromDB.description !== ""){
        //   console.log("true");
        // }
        // else{
        //   console.log("false");
        // }
      },error => {
        this.Error = true
        console.log(error);
      }
    )

    
  }

  DisplayGameResults(event:boolean) {
    // console.log(event);
    this.GameFinished = true
    this.PlayerWon = event
  }

  
  Restart() {
    window.location.reload();
  }
  // onOutletLoaded(component: GamesettingsComponent | GameComponent) {
  //   if (component instanceof GamesettingsComponent) {
  //     this.FinalNumberOfLetter =component.NumberOfLetters
  //     this.FinalNumberOfTries =component.NumberOfTries
  //   } else if (component instanceof GameComponent) {
  //     component.NumberOfLetterInGame = this.FinalNumberOfLetter
  //     component.NumberOfTriesInGame = this.FinalNumberOfTries
  //   }
  // }
}
