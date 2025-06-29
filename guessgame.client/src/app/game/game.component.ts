import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { faRefresh, faQuestion, faGear } from '@fortawesome/free-solid-svg-icons'
import { GameServiceService } from '../services/game-service.service';
import { Word } from '../Models/Word.interface';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy{

  currentTry = 1

  faRefresh = faRefresh
  faQuestion = faQuestion
  faGear = faGear

  GameFinished= false

  @Input() NumberOfLettersInGame!:number
  @Input() NumberOfTriesInGame!:number
  @Input() NumberOfHints!:number

  @Input() SelectedWord!:Word

  @Output() GameStatus = new EventEmitter<boolean>

  FinalIndexes:number[] = []
  TakenIndexes:number[] = []

  // @ViewChildren("disabledInput") DisabledInputs !: QueryList<HTMLInputElement>
  @ViewChildren("Input") Inputs !: QueryList<ElementRef>
  @ViewChild("divOfInputs") DivOfInputs !: ElementRef
  @ViewChildren("TrySpan") TrySpans !: QueryList<ElementRef>

  @ViewChild("ButtonCheck") ButtonCheck !: ElementRef<HTMLButtonElement>
  @ViewChild("ButtonHint") ButtonHint !: ElementRef<HTMLButtonElement>
  @ViewChild("ButtonRestart") ButtonRestart !: ElementRef<HTMLButtonElement>

  TriesArray = new Array(this.NumberOfTriesInGame)
  LettersArray = new Array(this.NumberOfLettersInGame)

  private EnterListener?: () => void;
  private InputListener?: () => void;
  private ArrowListener?: () => void;


  constructor(private renderer: Renderer2, private gameService:GameServiceService){
    // this.gameService.GetForecasts().subscribe(
    //   res => console.log(res)
    // )


  }
  
  
  ngOnInit(){
    this.InitializeInputs()
  }

  ngAfterViewInit(): void {
    // console.log(this.DivOfInputs);
    // console.log(this.Inputs);
    if(this.EnterListener){
      this.EnterListener();
    }

    this.ConfigureInputs();
    this.EnterListener =  this.renderer.listen(document.body, 'keydown', (event) => {
      // console.log(event.key);
      if(event.key === "Enter"){
        if(!this.GameFinished){
          // console.log(event.key);
          this.CheckWord();
        }
        else if(this.GameFinished){
          this.Restart();
        }
      }
    })
  }

  ngOnDestroy(): void {
    if(this.EnterListener){
      this.EnterListener();
    }
    if(this.ArrowListener){
      this.ArrowListener();
    }
    if(this.InputListener){
      this.InputListener();
    }
  }

  InitializeInputs(){
    for (let i = 1; i <= this.NumberOfTriesInGame; i++) {
      this.TriesArray[i-1] = i
    }
    for (let i = 1; i <= this.NumberOfLettersInGame; i++) {
      this.LettersArray[i-1] = i
    }
  }

  ConfigureInputs(){
    this.DivOfInputs.nativeElement.children[1].focus()
    // this.DisabledInputs.forEach((input) => (input.disabled = true))
    // let InputsArray = this.Inputs.toArray() as ElementRef[]
    // console.log(this.Inputs);
    this.Inputs.forEach((input , index) => 
    {
        this.InputListener =  this.renderer.listen(input.nativeElement , 'input', (event) => {
          input.nativeElement.value = input.nativeElement.value.toUpperCase();
          // console.log(index);
          // console.log(`input ${event.key}`);

          let AvilableSquaresToMoveIn:number[] = [] 
          let NextSquareIndex:number

          this.Inputs.forEach((innerInput,innerIndex) => {
            if((innerIndex >= (this.NumberOfLettersInGame * (this.currentTry - 1))) && (innerIndex < (this.NumberOfLettersInGame * this.currentTry))){
              if(innerInput.nativeElement.disabled === false){
                if(index < innerIndex){
                  if(!AvilableSquaresToMoveIn.includes(innerIndex)){
                    AvilableSquaresToMoveIn.push(innerIndex)
                  }
                }
              }
            }
          })

          AvilableSquaresToMoveIn.sort();
          NextSquareIndex = AvilableSquaresToMoveIn[0]
          const nextInput = this.Inputs.get(NextSquareIndex);

          // const nextInput = this.Inputs.get(index + 1);
          if(nextInput) nextInput.nativeElement.focus()
          })
        
          this.ArrowListener = this.renderer.listen(input.nativeElement , 'keydown', (event) => {
          const currentIndex = Array.from(this.Inputs).indexOf(input);
          // console.log(currentIndex);
          // console.log(input);
          // console.log(Array.from(this.Inputs)[0]);
          // console.log(event.target);
          // console.log(Array.from(this.Inputs)[0] === event.target);
          // console.log(event.target);
          // console.log(event.key);

          let AvilableSquaresToMoveIn:number[] = [] 
          let NextSquareIndex:number
          let PreviousSquaresToMoveIn:number[] = [] 
          let PreviousSquareIndex:number

          this.Inputs.forEach((innerInput,innerIndex) => {
            if((innerIndex >= (this.NumberOfLettersInGame * (this.currentTry - 1))) && (innerIndex < (this.NumberOfLettersInGame * this.currentTry))){
              if(innerInput.nativeElement.disabled === false){
                if(currentIndex < innerIndex){
                  if(!AvilableSquaresToMoveIn.includes(innerIndex)){
                    AvilableSquaresToMoveIn.push(innerIndex)
                  }
                }
                else if(currentIndex > innerIndex){
                  if(!PreviousSquaresToMoveIn.includes(innerIndex)){
                    PreviousSquaresToMoveIn.push(innerIndex)
                  }
                }
              }
            }
          })
          
          // console.log("next before ",AvilableSquaresToMoveIn);
          // AvilableSquaresToMoveIn = AvilableSquaresToMoveIn.sort();
          NextSquareIndex = AvilableSquaresToMoveIn[0]
          // const nextInput = this.Inputs.get(NextSquareIndex);
          // console.log("next after ",AvilableSquaresToMoveIn);
          // console.log("pre before ",PreviousSquaresToMoveIn);
          // PreviousSquaresToMoveIn = PreviousSquaresToMoveIn.sort();
          PreviousSquareIndex = PreviousSquaresToMoveIn[PreviousSquaresToMoveIn.length - 1]
          // const nextInput = this.Inputs.get(index + 1);
          // if(nextInput) nextInput.nativeElement.focus()
          // console.log("pre after ",PreviousSquaresToMoveIn);

          if(event.key === "ArrowRight"){
            // console.log(event.key);
            const nextIndex = NextSquareIndex;
            if(nextIndex < this.Inputs.length){
              const NextInput = this.Inputs.get(nextIndex);
              NextInput?.nativeElement.focus();              
            }
            // console.log(currentIndex);
            // console.log(nextIndex);
            // console.log(event.key);
          }
          if(event.key === "ArrowLeft"){
            // console.log(event.key);
            const prevIndex = PreviousSquareIndex;
            if(prevIndex >= 0){
              const PrevInput = this.Inputs.get(prevIndex);
              PrevInput?.nativeElement.focus();              
            }
            // console.log(prevIndex);
          }
          if(event.key === "Backspace"){
            // console.log(event.key);
            const CurrentInput = this.Inputs.get(currentIndex);
            const prevIndex = PreviousSquareIndex;
            // console.log(prevIndex);
            // console.log(currentIndex);
            if(prevIndex >= 0){
              const PrevInput = this.Inputs.get(prevIndex);
              CurrentInput!.nativeElement.value = "";
              CurrentInput!.nativeElement.focus();
              PrevInput!.nativeElement.value = "";
              PrevInput?.nativeElement.focus();              
            }else if(currentIndex === 0){
              CurrentInput!.nativeElement.value = "";
              CurrentInput!.nativeElement.focus();
            }
            
          }
          else if(event.key === "Control"){
            this.Hint();
            const CurrentInput = this.Inputs.get(currentIndex);
            const NextInput = this.Inputs.get(NextSquareIndex);
            const PreviousInput = this.Inputs.get(PreviousSquareIndex);
            if(!CurrentInput?.nativeElement.disabled){
              CurrentInput!.nativeElement.focus();
            }
            else{
              if(NextInput?.nativeElement){
                NextInput!.nativeElement.focus();
              }
              else if(PreviousInput?.nativeElement){
                PreviousInput!.nativeElement.focus();
              }
            }
          }
        })
        
        // this.renderer.listen(this.testElement.nativeElement, 'click', () => {
          // this.renderer.setStyle(this.testElement.nativeElement, 'color', 'green');
          // }
          // )
    })
  }
  
  Restart() {
    window.location.reload();
  }

  Hint(){

    let UsedHint = false;
    let UncoveredIndexes:number[] = []
    
    // console.log("1 -", UsedHint);
    // console.log(this.NumberOfHints);
    if(this.NumberOfHints > 0){
      
      // console.log("2 -", UsedHint);
      // console.log(this.NumberOfHints);
      

        // let FinalArray:any[] = []

        let SortedUncoveredIndexes:number[] = []
        let SortedAfter1Hint:number[] = []
        let SortedAfter2Hints:number[] = []

        let AvailableIndexes1:number[] = []
        let AvailableIndexes2:number[] = []
        let AvailableIndexes3:number[] = []
        let AvailableIndexes4:number[] = []
        let AvailableIndexes5:number[] = []
        let AvailableIndexes6:number[] = []
        let AvailableIndexes7:number[] = []
        let AvailableIndexes8:number[] = []
        let AvailableIndexes9:number[] = []
        let AvailableIndexes10:number[] = []

        this.Inputs.forEach((input, index) => {
          
          if(index < (this.NumberOfLettersInGame * (this.currentTry - 1))){
            // console.log("previous");
            // console.log(index);
            if(index >= 0 && index < this.NumberOfLettersInGame){
              //try 1
              if(this.SelectedWord.word[index] !== input.nativeElement.value.toLowerCase()){
                // console.log("Letter correct");
                if(!AvailableIndexes1.includes(index)){
                  AvailableIndexes1.push(index)
                  // UncoveredIndexes.push(index)
                  // console.log(AvailableIndexes1);
                  // console.log(UncoveredIndexes);
                }
                else{
                  AvailableIndexes1.push(-1)
                }
              }
            }
            else if(index >= this.NumberOfLettersInGame && index < (this.NumberOfLettersInGame * 2)){
              //try 2
              if(this.SelectedWord.word[index - this.NumberOfLettersInGame] !== input.nativeElement.value.toLowerCase() && input.nativeElement.value.toLowerCase() !== AvailableIndexes1[index - this.NumberOfLettersInGame]){
                // console.log("Letter correct");
                // if(!UncoveredIndexes.includes(index - this.NumberOfLettersInGame)){
                //   UncoveredIndexes.push(index - this.NumberOfLettersInGame)
                //   console.log(UncoveredIndexes);
                // }
                if(!AvailableIndexes2.includes(index - this.NumberOfLettersInGame)){
                  AvailableIndexes2.push(index - this.NumberOfLettersInGame)
                  // UncoveredIndexes.push(index)
                  // console.log(AvailableIndexes2);
                  // console.log(UncoveredIndexes);
                }
                else{
                  AvailableIndexes2.push(-1);
                }
              }
            }
            else if(index >= (this.NumberOfLettersInGame * 2) && index < (this.NumberOfLettersInGame * 3)){
              //try 3
              if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 2)] !== input.nativeElement.value.toLowerCase()){
                // console.log("Letter correct");
                // if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 2))){
                //   UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 2))
                //   console.log(UncoveredIndexes);
                // }
                if(!AvailableIndexes3.includes(index - (this.NumberOfLettersInGame * 2))){
                  AvailableIndexes3.push(index - (this.NumberOfLettersInGame * 2))
                  // UncoveredIndexes.push(index)
                  // console.log(AvailableIndexes2);
                  // console.log(UncoveredIndexes);
                }
                else{
                  AvailableIndexes3.push(-1);
                }
              }
            }
            else if(index >= (this.NumberOfLettersInGame * 3) && index < (this.NumberOfLettersInGame * 4)){
              //try
              
              if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 3)] !== input.nativeElement.value.toLowerCase()){
                // console.log("Letter correct");
                // if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 2))){
                //   UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 2))
                //   console.log(UncoveredIndexes);
                // }
                if(!AvailableIndexes4.includes(index - (this.NumberOfLettersInGame * 3))){
                  AvailableIndexes4.push(index - (this.NumberOfLettersInGame * 3))
                  // UncoveredIndexes.push(index)
                  // console.log(AvailableIndexes2);
                  // console.log(UncoveredIndexes);
                }
                else{
                  AvailableIndexes4.push(-1);
                }
              }//  4
              // if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 3)] !== input.nativeElement.value.toLowerCase()){
              //   // console.log("Letter correct");
              //   // if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 3))){
              //   //   UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 3))
              //   //   console.log(UncoveredIndexes);
              //   // }
              // }
              // if(!AvailableIndexes4.includes(index - (this.NumberOfLettersInGame * 3))){
              //   AvailableIndexes4.push(index - (this.NumberOfLettersInGame * 3))
              // }
            }
            else if(index >= (this.NumberOfLettersInGame * 4) && index < (this.NumberOfLettersInGame * 5)){
              //try 5
              if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 4)] !== input.nativeElement.value.toLowerCase()){
                // console.log("Letter correct");
                // if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 2))){
                //   UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 2))
                //   console.log(UncoveredIndexes);
                // }
                if(!AvailableIndexes5.includes(index - (this.NumberOfLettersInGame * 4))){
                  AvailableIndexes5.push(index - (this.NumberOfLettersInGame * 4))
                  // UncoveredIndexes.push(index)
                  // console.log(AvailableIndexes2);
                  // console.log(UncoveredIndexes);
                }
                else{
                  AvailableIndexes5.push(-1);
                }
              }
              // if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 4)] !== input.nativeElement.value.toLowerCase()){
              //   // console.log("Letter correct");
              //   if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 4))){
              //     UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 4))
              //     console.log(UncoveredIndexes);
              //   }
              // }
            
              // if(!AvailableIndexes5.includes(index - (this.NumberOfLettersInGame * 4))){
              //   AvailableIndexes5.push(index - (this.NumberOfLettersInGame * 4))
              // }
            }
            else if(index >= (this.NumberOfLettersInGame * 5) && index < (this.NumberOfLettersInGame * 6)){
              // //try 6
              if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 5)] !== input.nativeElement.value.toLowerCase()){
                // console.log("Letter correct");
                // if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 2))){
                //   UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 2))
                //   console.log(UncoveredIndexes);
                // }
                if(!AvailableIndexes6.includes(index - (this.NumberOfLettersInGame * 5))){
                  AvailableIndexes6.push(index - (this.NumberOfLettersInGame * 5))
                  // UncoveredIndexes.push(index)
                  // console.log(AvailableIndexes2);
                  // console.log(UncoveredIndexes);
                }
                else{
                  AvailableIndexes6.push(-1);
                }
              }
              // if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 5)] !== input.nativeElement.value.toLowerCase()){
              //   // console.log("Letter correct");
              //   if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 5))){
              //     UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 5))
              //     console.log(UncoveredIndexes);
              //   }
              // }
              
              // if(!AvailableIndexes6.includes(index - (this.NumberOfLettersInGame * 5))){
              //   AvailableIndexes6.push(index - (this.NumberOfLettersInGame * 5))
              // }
            
            }
            else if(index >= (this.NumberOfLettersInGame * 6) && index < (this.NumberOfLettersInGame * 7)){
              //try 7
              if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 6)] !== input.nativeElement.value.toLowerCase()){
                // console.log("Letter correct");
                // if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 2))){
                //   UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 2))
                //   console.log(UncoveredIndexes);
                // }
                if(!AvailableIndexes7.includes(index - (this.NumberOfLettersInGame * 6))){
                  AvailableIndexes7.push(index - (this.NumberOfLettersInGame * 6))
                  // UncoveredIndexes.push(index)
                  // console.log(AvailableIndexes2);
                  // console.log(UncoveredIndexes);
                }
                else{
                  AvailableIndexes7.push(-1);
                }
              }
              // if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 6)] !== input.nativeElement.value.toLowerCase()){
              //   // console.log("Letter correct");
              //   if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 6))){
              //     UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 6))
              //     console.log(UncoveredIndexes);
              //   }
              // }
            
              
              // if(!AvailableIndexes7.includes(index - (this.NumberOfLettersInGame * 6))){
              //   AvailableIndexes7.push(index - (this.NumberOfLettersInGame * 6))
              // }
            }
            else if(index >= (this.NumberOfLettersInGame * 7) && index < (this.NumberOfLettersInGame * 8)){
              //try 8
              if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 7)] !== input.nativeElement.value.toLowerCase()){
                // console.log("Letter correct");
                // if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 2))){
                //   UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 2))
                //   console.log(UncoveredIndexes);
                // }
                if(!AvailableIndexes8.includes(index - (this.NumberOfLettersInGame * 7))){
                  AvailableIndexes8.push(index - (this.NumberOfLettersInGame * 7))
                  // UncoveredIndexes.push(index)
                  // console.log(AvailableIndexes2);
                  // console.log(UncoveredIndexes);
                }
                else{
                  AvailableIndexes8.push(-1);
                }
              }
              // if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 7)] !== input.nativeElement.value.toLowerCase()){
              //   // console.log("Letter correct");
              //   if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 7)) ){
              //     UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 7))
              //     console.log(UncoveredIndexes);
              //   }
              // }

              
              // if(!AvailableIndexes8.includes(index - (this.NumberOfLettersInGame * 7))){
              //   AvailableIndexes8.push(index - (this.NumberOfLettersInGame * 7))
              // }
            
            }
            else if(index >= (this.NumberOfLettersInGame * 8) && index < (this.NumberOfLettersInGame * 9)){
              //try 9
              if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 8)] !== input.nativeElement.value.toLowerCase()){
                // console.log("Letter correct");
                // if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 2))){
                //   UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 2))
                //   console.log(UncoveredIndexes);
                // }
                if(!AvailableIndexes9.includes(index - (this.NumberOfLettersInGame * 8))){
                  AvailableIndexes9.push(index - (this.NumberOfLettersInGame * 8))
                  // UncoveredIndexes.push(index)
                  // console.log(AvailableIndexes2);
                  // console.log(UncoveredIndexes);
                }
                else{
                  AvailableIndexes9.push(-1);
                }
              }
              // if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 8)] !== input.nativeElement.value.toLowerCase()){
              //   // console.log("Letter correct");
              //   if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 8))){
              //     UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 8))
              //     console.log(UncoveredIndexes);
              //   }
              // }

              // if(!AvailableIndexes9.includes(index - (this.NumberOfLettersInGame * 8))){
              //   AvailableIndexes9.push(index - (this.NumberOfLettersInGame * 8))
              // }

            }
            else if(index >= (this.NumberOfLettersInGame * 9) && index < (this.NumberOfLettersInGame * 10)){
              //try 9
              if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 9)] !== input.nativeElement.value.toLowerCase()){
                // console.log("Letter correct");
                // if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 2))){
                //   UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 2))
                //   console.log(UncoveredIndexes);
                // }
                if(!AvailableIndexes10.includes(index - (this.NumberOfLettersInGame * 9))){
                  AvailableIndexes10.push(index - (this.NumberOfLettersInGame * 9))
                  // UncoveredIndexes.push(index)
                  // console.log(AvailableIndexes2);
                  // console.log(UncoveredIndexes);
                }
                else{
                  AvailableIndexes10.push(-1);
                }
              }
              // if(this.SelectedWord.word[index - (this.NumberOfLettersInGame * 8)] !== input.nativeElement.value.toLowerCase()){
              //   // console.log("Letter correct");
              //   if(!UncoveredIndexes.includes(index - (this.NumberOfLettersInGame * 8))){
              //     UncoveredIndexes.push(index - (this.NumberOfLettersInGame * 8))
              //     console.log(UncoveredIndexes);
              //   }
              // }

              // if(!AvailableIndexes10.includes(index - (this.NumberOfLettersInGame * 9))){
              //   AvailableIndexes10.push(index - (this.NumberOfLettersInGame * 9))
              // }

            }
            // let actualLetter = this.SelectedWord.word[]
            // console.log("try" ,this.currentTry);
            // console.log(this.SelectedWord.word);
            // console.log(input.nativeElement.value);
            // console.log(index);
            // console.log((this.NumberOfLettersInGame * index));
            // console.log(input.nativeElement.value === );
          }
        })

        // console.log("un " , UncoveredIndexes);
        SortedUncoveredIndexes = UncoveredIndexes.sort()
        // console.log("Array 1 ", AvailableIndexes1);
        // console.log("Array 2 ", AvailableIndexes2);
        // console.log("Array 3 ", AvailableIndexes3);



        //-------------------------------------------

        // let arr1 = [2,3,3,-1,-1]
        // let arr2 = [1,2,3,-1,-1]
        // let arr3 = [8,9,10,3,-1]
        // let arr4 = [1,9,10,3,-1]
        // let arr5 = [8,3,10,3,-1]
        // let arr6 = [8,9,10,3,-1]
        // let arr7 = [8,1,10,3,-1]
        // let arr8 = [8,9,10,3,-1]
        // let arr9 = [2,9,10,3,-1]
        // let arr10 = [8,2,10,3,-1]
        
        // console.log("arr1 ",arr1);
        // console.log("arr2 ",arr2);

        // let a1 = arr1.filter((item) => arr2.includes(item))
        // let a2 = a1.filter((item) => arr3.includes(item))
        // let a3 = a2.filter((item) => arr4.includes(item))
        // let a4 = a3.filter((item) => arr5.includes(item))
        // let a5 = a4.filter((item) => arr6.includes(item))
        // let a6 = a5.filter((item) => arr7.includes(item))
        // let a7 = a6.filter((item) => arr8.includes(item))
        // let a8 = a7.filter((item) => arr9.includes(item))
        // let a9 = a8.filter((item) => arr10.includes(item))
        // // console.log("common ",a);
        // console.log("a9 ",a9);

        // let aunique:any[] = []
        // console.log("unique ",aunique);

        // for (let i = 0; i < this.NumberOfLettersInGame; i++) {
        //   if(!aunique.includes(a9[i])){
        //     aunique.push(a9[i])
        //   }
        // }

        // console.log("unique ",aunique);

        // let final = aunique.filter(item => (item !== -1 && item !== undefined))
        // console.log("final", final);

        //-------------------------------------------

        // console.log("********");

        // console.log("1 -", AvailableIndexes1);
        // console.log("2 -", AvailableIndexes2);
        // console.log("3 -", AvailableIndexes3);


        for (let i = 0; i < (this.NumberOfLettersInGame - AvailableIndexes1.length); i++) {
          // if(this.NumberOfLettersInGame === AvailableIndexes1.length){
          //   break;
          // }
          // else{
          // console.log(this.NumberOfLettersInGame);
          // console.log(AvailableIndexes1.length);
          //   console.log(i);
            AvailableIndexes1.push(-1);
          // }
        }

        for (let i = 0; i < (this.NumberOfLettersInGame - AvailableIndexes2.length); i++) {
          // if(this.NumberOfLettersInGame === AvailableIndexes2.length){
          //   break;
          // }
          // else{
            // console.log(this.NumberOfLettersInGame);
            // console.log(AvailableIndexes2.length);
            //   console.log(i);
            AvailableIndexes2.push(-1);
          // }
        }

        for (let i = 0; i < (this.NumberOfLettersInGame - AvailableIndexes3.length); i++) {
          // if(this.NumberOfLettersInGame === AvailableIndexes3.length){
          //   break;
          // }
          // else{
            // console.log(this.NumberOfLettersInGame);
            // console.log(AvailableIndexes3.length);
            //   console.log(i);
            AvailableIndexes3.push(-1);
          // }
        }

        for (let i = 0; i < (this.NumberOfLettersInGame - AvailableIndexes4.length); i++) {
          // if(this.NumberOfLettersInGame === AvailableIndexes3.length){
          //   break;
          // }
          // else{
            // console.log(this.NumberOfLettersInGame);
            // console.log(AvailableIndexes3.length);
            //   console.log(i);
            AvailableIndexes4.push(-1);
          // }
        }

        
        for (let i = 0; i < (this.NumberOfLettersInGame - AvailableIndexes5.length); i++) {
            AvailableIndexes5.push(-1);
        }


        for (let i = 0; i < (this.NumberOfLettersInGame - AvailableIndexes6.length); i++) {
          AvailableIndexes6.push(-1);
        }


        for (let i = 0; i < (this.NumberOfLettersInGame - AvailableIndexes7.length); i++) {
          AvailableIndexes7.push(-1);
        }

        
        for (let i = 0; i < (this.NumberOfLettersInGame - AvailableIndexes8.length); i++) {
          AvailableIndexes8.push(-1);
        }

        
        for (let i = 0; i < (this.NumberOfLettersInGame - AvailableIndexes9.length); i++) {
          AvailableIndexes9.push(-1);
        }

        for (let i = 0; i < (this.NumberOfLettersInGame - AvailableIndexes10.length); i++) {
          AvailableIndexes10.push(-1);
        }


        // console.log("1 -", AvailableIndexes1);
        // console.log("2 -", AvailableIndexes2);
        // console.log("3 -", AvailableIndexes3);


        let arr1 = AvailableIndexes1
        let arr2 = AvailableIndexes2
        let arr3 = AvailableIndexes3
        let arr4 = AvailableIndexes4
        let arr5 = AvailableIndexes5
        let arr6 = AvailableIndexes6
        let arr7 = AvailableIndexes7
        let arr8 = AvailableIndexes8
        let arr9 = AvailableIndexes9
        let arr10 = AvailableIndexes10

        // console.log("--------------arrays");
        // console.log("arr1 ",arr1);
        // console.log("arr2 ",arr2);
        // console.log("arr3 ",arr3);
        // console.log("arr4 ",arr4);
        // console.log("arr5 ",arr5);
        // console.log("arr6 ",arr6);
        // console.log("arr7 ",arr7);
        // console.log("arr8 ",arr8);
        // console.log("arr9 ",arr9);
        // console.log("arr10 ",arr10);
        // console.log("--------------arrays");

        let common:any = []



        if(this.currentTry === 1){
          for (let i = 0; i < this.NumberOfLettersInGame; i++) {
            common.push(i);            
          }
        }
        else if(this.currentTry === 2){
          common = arr1
        }
        else if(this.currentTry === 3){
          let a1 = arr1.filter((item) => arr2.includes(item))
          common = a1
        }
        else if(this.currentTry === 4){
          let a1 = arr1.filter((item) => arr2.includes(item))
          let a2 = a1.filter((item) => arr3.includes(item))
          common = a2
          // console.log("curretn try 4 - ",this.currentTry);
        }
        else if(this.currentTry === 5){
          let a1 = arr1.filter((item) => arr2.includes(item))
          let a2 = a1.filter((item) => arr3.includes(item))
          let a3 = a2.filter((item) => arr4.includes(item))
          common = a3
          // console.log("curretn try 5 - ",this.currentTry);
        }
        else if(this.currentTry === 6){
          let a1 = arr1.filter((item) => arr2.includes(item))
          let a2 = a1.filter((item) => arr3.includes(item))
          let a3 = a2.filter((item) => arr4.includes(item))
          let a4 = a3.filter((item) => arr5.includes(item))
          common = a4
          // console.log("curretn try 6 - ",this.currentTry);
        }
        else if(this.currentTry === 7){
          let a1 = arr1.filter((item) => arr2.includes(item))
          let a2 = a1.filter((item) => arr3.includes(item))
          let a3 = a2.filter((item) => arr4.includes(item))
          let a4 = a3.filter((item) => arr5.includes(item))
          let a5 = a4.filter((item) => arr6.includes(item))
          common = a5
        }
        else if(this.currentTry === 8){
          let a1 = arr1.filter((item) => arr2.includes(item))
          let a2 = a1.filter((item) => arr3.includes(item))
          let a3 = a2.filter((item) => arr4.includes(item))
          let a4 = a3.filter((item) => arr5.includes(item))
          let a5 = a4.filter((item) => arr6.includes(item))
          let a6 = a5.filter((item) => arr7.includes(item))
          common = a6
        }
        else if(this.currentTry === 9){
          let a1 = arr1.filter((item) => arr2.includes(item))
          let a2 = a1.filter((item) => arr3.includes(item))
          let a3 = a2.filter((item) => arr4.includes(item))
          let a4 = a3.filter((item) => arr5.includes(item))
          let a5 = a4.filter((item) => arr6.includes(item))
          let a6 = a5.filter((item) => arr7.includes(item))
          let a7 = a6.filter((item) => arr8.includes(item))
          common = a7
        }
        else if(this.currentTry === 10){
          let a1 = arr1.filter((item) => arr2.includes(item))
          let a2 = a1.filter((item) => arr3.includes(item))
          let a3 = a2.filter((item) => arr4.includes(item))
          let a4 = a3.filter((item) => arr5.includes(item))
          let a5 = a4.filter((item) => arr6.includes(item))
          let a6 = a5.filter((item) => arr7.includes(item))
          let a7 = a6.filter((item) => arr8.includes(item))
          let a8 = a7.filter((item) => arr9.includes(item))
          common = a8
        }
        // else if(this.currentTry === 10){
        //   let a1 = arr1.filter((item) => arr2.includes(item))
        //   let a2 = a1.filter((item) => arr3.includes(item))
        //   let a3 = a2.filter((item) => arr4.includes(item))
        //   let a4 = a3.filter((item) => arr5.includes(item))
        //   let a5 = a4.filter((item) => arr6.includes(item))
        //   let a6 = a5.filter((item) => arr7.includes(item))
        //   let a7 = a6.filter((item) => arr8.includes(item))
        //   let a8 = a7.filter((item) => arr9.includes(item))
        //   let a9 = a8.filter((item) => arr10.includes(item))
        //   common = a9
        // }


        // console.log("common ",common);


        let unique:any[] = []
        // console.log("unique ",unique);

        for (let i = 0; i < this.NumberOfLettersInGame; i++) {
          if(!unique.includes(common[i])){
            unique.push(common[i])
          }
        }

        // console.log("unique ",unique);

        let final = unique.filter(item => (item !== -1 && item !== undefined))
        // console.log("final", final);

        // console.log(this.findCommonElement(AvailableIndexes1,AvailableIndexes2,AvailableIndexes3));
        // console.log(this.findCommonElement(arr1,arr2,arr3));
        // console.log("un ",UncoveredIndexes);
        // console.log("so ",SortedUncoveredIndexes);
        // console.log("sorted ", SortedUncoveredIndexes);

        // var FullArray = [
        //   AvailableIndexes1,
        //   AvailableIndexes2,
        //   AvailableIndexes3,
        //   AvailableIndexes4,
        //   AvailableIndexes5,
        //   AvailableIndexes6,
        //   AvailableIndexes7,
        //   AvailableIndexes8,
        //   AvailableIndexes9,
        //   AvailableIndexes10,
        // ]

        // let intersactionArr1Arr2 = AvailableIndexes1.filter(x => AvailableIndexes2.includes(x))
        // let intersactionArr1Arr2Arr3 = intersactionArr1Arr2.filter(x => arr3.includes(x))
        // var result = FullArray.reduce((a, b) => a.filter(c => b.includes(c)));
        // console.log("result ", result);
        
        this.Inputs.forEach((input , index) => 
          {

            // console.log("3 -", UsedHint);
            if(!UsedHint){
                // console.log("4 -", UsedHint);
              // console.log(input);
              
              
              // if(index >= (this.NumberOfLettersInGame * (this.currentTry - 1)) && index < (this.NumberOfLettersInGame * this.currentTry)){
                
              // }
              //---------------------------------------
              let actualLetter = this.SelectedWord.word[index - (this.NumberOfLettersInGame * (this.currentTry - 1))]
                // console.log(index - (this.NumberOfLettersInGame * (this.currentTry - 1)));
                // console.log(actualLetter);
                // console.log(randomIndex);
                // let randomIndexForFirstTry = (Math.floor(Math.random() * this.NumberOfLettersInGame));
                // let randomIndexInSortedForOtherTries = Math.floor(Math.random() * SortedUncoveredIndexes.length)
                // let randomIndexInSortedForOtherTries = SortedUncoveredIndexes[Math.floor(Math.random() * SortedUncoveredIndexes.length)]
                // console.log(SortedUncoveredIndexes);
                // console.log(randomIndexInSorted);
                


                // console.log(this.NumberOfHints);
                if(final.length > 0){
                  // console.log("first time " ,SortedUncoveredIndexes);
                  let randomIndexInSortedForOtherTries:number
                  
                  let counter = 0 

                  do {
                    randomIndexInSortedForOtherTries = final[(Math.floor(Math.random() * final.length))]
                    counter++
                    // console.log(counter);
                    if(counter === 10){
                      this.NumberOfHints = 0
                      this.ButtonHint.nativeElement.disabled = true
                      break;
                    }
                  } while (this.TakenIndexes.includes(randomIndexInSortedForOtherTries));

                  // console.log(this.NumberOfHints);
                  if(this.NumberOfHints > 0 && final.length > 0){

                  let randomInput = this.Inputs.get(randomIndexInSortedForOtherTries + (this.NumberOfLettersInGame * (this.currentTry - 1)));
                  let indexToFill = randomIndexInSortedForOtherTries
                  let actualLetterToFill = this.SelectedWord.word[indexToFill]
                  // console.log(indexToFill);
                  if(randomInput){
                    randomInput.nativeElement.disabled = true
                    randomInput.nativeElement.value = actualLetterToFill.toUpperCase()
                    randomInput.nativeElement.style.backgroundColor = "#16a34a"
                    randomInput.nativeElement.style.color = "white"
                  }
                  
                    for (let i = 0; i < final.length; i++) {
                      if(!this.TakenIndexes.includes(indexToFill)){
                        this.TakenIndexes.push(indexToFill)
                      }
                        if(!this.FinalIndexes.includes(final[i]) && !this.TakenIndexes.includes(final[i])){
                          this.FinalIndexes.push(final[i])
                          // console.log("iffffffffffffffff", this.FinalIndexes);
                        }
                        else{
                          this.FinalIndexes = this.FinalIndexes.filter(item => (item !== indexToFill))
                          // console.log("elsssssssssssssss", this.FinalIndexes);
                        }
                      
                      // if(final.includes()){
                      //   console.log("final ",final);
                      //   console.log("indexToFill ",indexToFill);
                      //   console.log("FinalIndexes ",this.FinalIndexes);
                      //   console.log("TakenIndexes ",this.TakenIndexes);
                        
                      //   // FinalArray.push(final[i])
                        
                      // }
                    }
                    // console.log("indexToFill ",indexToFill);
                  }
                  
                  // console.log("final ",final);
                  // console.log("FinalIndexes ",this.FinalIndexes);
                  // console.log("TakenIndexes ",this.TakenIndexes);
                  if(this.FinalIndexes.length === 0){
                    this.NumberOfHints = 0
                    this.ButtonHint.nativeElement.disabled = true  
                  }
                }
                else{
                  this.NumberOfHints = 0
                  this.ButtonHint.nativeElement.disabled = true
                  // console.log("final ",final);
                  // console.log("FinalIndexes ",this.FinalIndexes);
                  // console.log("TakenIndexes ",this.TakenIndexes);
                }
                // console.log(this.FinalIndexes);
                // else if(this.currentTry === 1){
                //   let randomInput = this.Inputs.get(randomIndexForFirstTry);
                //   let indexToFill = randomIndexForFirstTry
                //   let actualLetterToFill = this.SelectedWord.word[indexToFill]
                //   console.log(indexToFill);
                //   if(randomInput){
                //     randomInput.nativeElement.disabled = true
                //     randomInput.nativeElement.value = actualLetterToFill.toUpperCase()
                //     randomInput.nativeElement.style.backgroundColor = "#16a34a"
                //     randomInput.nativeElement.style.color = "white"
                //   }
                //   SortedUncoveredIndexes = SortedUncoveredIndexes.filter((item) => item !== indexToFill)
                //   console.log("ss ",SortedUncoveredIndexes);
                // }
              //---------------------------------------
              


              // console.log("5 -", UsedHint);
              UsedHint = true;
              if(this.NumberOfHints > 0){
                this.NumberOfHints--
              }
              // console.log("6 -", UsedHint);

            }
          }
        )


        // console.log("7 -", UsedHint);
        UsedHint = false
        // console.log("hint");
      
    }
  }

  findCommonElement(...arrays : any){
    const counts:any = {}
    for(const array of arrays){
      for(const element of array){
        counts[element] = (counts[element] || 0) + 1
      }
    }

    return Object.keys(counts).filter(
      (element) => counts[element] === arrays.length
    ).map(Number);
  }

  CheckWord() {
    let successGuess = true
    this.Inputs.forEach((input , index) => 
      {
        // console.log(index);
        if(index >= (this.NumberOfLettersInGame * (this.currentTry - 1)) && index < (this.NumberOfLettersInGame * this.currentTry)){
          let letter = input.nativeElement.value.toLowerCase();
          // console.log(`letter => ${letter}`);                
          let actualLetter = this.SelectedWord.word[index - (this.NumberOfLettersInGame * (this.currentTry - 1))]
          // console.log(`actualLetter => ${actualLetter}`);
          if(letter === actualLetter && letter !== undefined && actualLetter !== undefined){
            // console.log(letter === actualLetter && letter !== undefined && actualLetter !== undefined);
            // console.log(input);
            input.nativeElement.style.backgroundColor = "#16a34a"
            input.nativeElement.style.color = "white"
          }
          else if(this.SelectedWord.word.includes(letter) && letter !== ""){
            input.nativeElement.style.backgroundColor = "#ca8a04"
            input.nativeElement.style.color = "white"
            successGuess = false
          }
          else if(letter === "" || input.nativeElement === undefined){
            input.nativeElement.style.backgroundColor = "#444444"
            input.nativeElement.style.color = "white"
            successGuess = false
          }
          else{
            input.nativeElement.style.backgroundColor = "#dc2626"
            input.nativeElement.style.color = "white"
            successGuess = false
          }
        }
      }
    )

    if(successGuess){
      this.GameFinished = true
      this.GameStatus.emit(successGuess)
     
      this.Inputs.forEach((input) => {
        input.nativeElement.disabled = true;
      })
      this.ButtonCheck.nativeElement.disabled = true;
      this.ButtonHint.nativeElement.disabled = true;
      this.ButtonRestart.nativeElement.disabled = true;
      
    }
    else{
      this.Inputs.forEach((input , index) => 
        {
          if(index >= (this.NumberOfLettersInGame * (this.currentTry - 1)) && index < (this.NumberOfLettersInGame * this.currentTry)){
            input.nativeElement.classList.add("disabled-input");
            input.nativeElement.disabled = true;
          }
          
          if(index >= (this.NumberOfLettersInGame * (this.currentTry)) && index < (this.NumberOfLettersInGame * (this.currentTry + 1))){
            input.nativeElement.classList.remove("disabled-input");
            input.nativeElement.disabled = false;
            if(index === (this.NumberOfLettersInGame * (this.currentTry))){
              input.nativeElement.focus();
            }
          }
          else if((index + 1) === (this.NumberOfLettersInGame * (this.currentTry)) && this.currentTry === this.NumberOfTriesInGame){
            this.GameFinished = true
            this.GameStatus.emit(successGuess)
          
            this.Inputs.forEach((input) => {
              input.nativeElement.disabled = true;
            })
            this.ButtonCheck.nativeElement.disabled = true;
            this.ButtonHint.nativeElement.disabled = true;
            this.ButtonRestart.nativeElement.disabled = true;
          }         
        }
      )
      
      this.currentTry++;

      // this.TrySpans.forEach((span, index) => {
      //   console.log(index);
      //   // if(index >= (this.NumberOfLettersInGame * (this.currentTry - 1)) && index < (this.NumberOfLettersInGame * this.currentTry)){
      //   //   input.nativeElement.classList.add("disabled-input");
      //   //   input.nativeElement.disabled = true;
      //   // }
        
      //   // if(index >= (this.NumberOfLettersInGame * (this.currentTry)) && index < (this.NumberOfLettersInGame * (this.currentTry + 1))){
      //   //   input.nativeElement.classList.add("disabled-input");
      //   //   input.nativeElement.disabled = false;
      //   // } 
      // })

    }

    if(this.GameFinished){
      // if(this.EnterListener){
      //   this.EnterListener();
      // }

      if(this.InputListener){
        this.InputListener();
      }
      
      if(this.ArrowListener){
        this.ArrowListener();
      }

      window.scroll({
        top:0,
        behavior:'smooth'
      })
    }
  }

}
