import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, Renderer2, ViewChild } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ISettings } from '../Models/settings.interface';

@Component({
  selector: 'app-gamesettings',
  templateUrl: './gamesettings.component.html',
  styleUrl: './gamesettings.component.css'
})
export class GamesettingsComponent implements AfterViewInit ,OnDestroy{
  
  faArrowDown = faArrowDown 
  faArrowRight = faArrowRight 
  faArrowLeft = faArrowLeft

  private EnterListener?: () => void;
  private LettersListener?: () => void;
  private TriesListener?: () => void;

  @ViewChild("InputLetters") InputLetters !: ElementRef<HTMLInputElement>
  @ViewChild("InputTries") InputTries !: ElementRef<HTMLInputElement>

  @Output() Settings = new EventEmitter<any>

  GameSettings : ISettings = {
    NumberOfLetters : 5,
    NumberOfTries : 5
  }

  constructor(private renderer:Renderer2){}

  ngAfterViewInit(): void {

    this.InputLetters.nativeElement.focus();

    this.ConfigureInputs();
    this.EnterListener =  this.renderer.listen(document.body, 'keydown', (event) => {
      // console.log(event.key);
      if(event.key === "Enter"){
        this.StartGame()
      }
    })
  }

  ngOnDestroy(): void {
    if(this.EnterListener){
      this.EnterListener();
    }
    if(this.LettersListener){
      this.LettersListener
    }
    if(this.TriesListener){
      this.TriesListener
    }
  }


  ConfigureInputs(){

    this.LettersListener =  this.renderer.listen(this.InputLetters.nativeElement, 'keydown', (event) => {
      // console.log(event.key);
      if(event.key === "ArrowDown"){
        this.InputTries.nativeElement.focus();
      }
      else if(event.key === "ArrowRight"){
        this.IncreaseLetters();
      }
      else if(event.key === "ArrowLeft"){
        this.DecreaseLetters();
      }
    })

    this.TriesListener =  this.renderer.listen(this.InputTries.nativeElement, 'keydown', (event) => {
      // console.log(event.key);
      if(event.key === "ArrowUp"){
        this.InputLetters.nativeElement.focus();
      }
      else if(event.key === "ArrowRight"){
        this.IncreaseTries();
      }
      else if(event.key === "ArrowLeft"){
        this.DecreaseTries();
      }
    })
  
  }
  


  IncreaseLetters(){
    if(this.GameSettings.NumberOfLetters !== 10){
      this.GameSettings.NumberOfLetters++
    }
  }
  DecreaseLetters(){
    if(this.GameSettings.NumberOfLetters !== 1){
      this.GameSettings.NumberOfLetters--
    }
  }
  
  IncreaseTries(){
    if(this.GameSettings.NumberOfTries !== 10){
      this.GameSettings.NumberOfTries++

    }
  }

  DecreaseTries(){
    if(this.GameSettings.NumberOfTries !== 1){
      this.GameSettings.NumberOfTries--
    }
  }


  StartGame(){
    this.Settings.emit(this.GameSettings)
  }
}
