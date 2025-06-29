import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { GameServiceService } from '../services/game-service.service';
import { WordAdmin } from '../Models/WordAdmin';
import { Word } from '../Models/Word.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Admin } from '../Models/Admin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  ////--------------------------------------

  getMethodUsed = ""

  methodUsed = ""
  timeNow = new Date()
  
  rowsAffected!:number

  faArrowDown = faArrowDown

  words:WordAdmin[] = [] 

  ErrorHappened = false
  ErrorToShow = ""

  wrong = false

  //-------------------------------------------------
  //CHANGE IT TO FALSE
  admin = false
  adminModel !: Admin

  @ViewChild("first") first !: ElementRef
  @ViewChild("second") second !: ElementRef
  
  ////--------------------------------------
  //// FORMS
  

  //// GET ALL
  @ViewChild("GetAllOrderBy") GetAllOrderBy !: ElementRef
  @ViewChild("GetAllDesc") GetAllDesc !: ElementRef
  
  //// GET PAGE
  @ViewChild("GetPageOrderBy") GetPageOrderBy !: ElementRef
  @ViewChild("GetPageNumber") GetPageNumber !: ElementRef
  @ViewChild("GetPageSize") GetPageSize !: ElementRef
  @ViewChild("GetPageDesc") GetPageDesc !: ElementRef
  
  //// GET BY LETTERS COUNT
  @ViewChild("GetByLettersCountLettersCount") GetByLettersCountLettersCount !: ElementRef
  @ViewChild("GetByLettersCountOrderBy") GetByLettersCountOrderBy !: ElementRef
  @ViewChild("GetByLettersCountDesc") GetByLettersCountDesc !: ElementRef
  

  //// POST
  @ViewChild("PostWord") PostWord !: ElementRef
  @ViewChild("PostDescription") PostDescription !: ElementRef
  
  //// PUt
  @ViewChild("PutId") PutId !: ElementRef
  @ViewChild("PutWord") PutWord !: ElementRef
  @ViewChild("PutDescription") PutDescription !: ElementRef
  
  //// DELETE
  @ViewChild("DeleteId") DeleteId !: ElementRef
  
  //// RowsAffected
  @ViewChild("rows") rows !: ElementRef
  @ViewChild("method") method !: ElementRef
  
  //// GetRows
  @ViewChild("count") count !: ElementRef
  @ViewChild("getmethod") getmethod !: ElementRef
  
  ////--------------------------------------
  constructor(private gameService: GameServiceService){}

  Login(event:any) {
    event.preventDefault();
    
    this.gameService.GetAdmin(this.first.nativeElement.value,this.second.nativeElement.value).subscribe(
       (res:any) => {
          if(res === true || res === 1 ){
            this.admin = true
            this.adminModel = {
              First:this.first.nativeElement.value,
              Second:this.second.nativeElement.value
            }
            this.wrong = false
            return true
          }
          else{
            this.wrong = true
            this.admin = false
            return false
          }
       },
       error => {
        this.wrong = true
        this.admin = false
        console.log(error);
       } 
    )
  }


  
  GetAll() {
    if(this.admin && this.adminModel){
      if(this.GetAllOrderBy.nativeElement.value !== ""){
        this.gameService.GetAll(this.adminModel.First,this.adminModel.Second,this.GetAllOrderBy.nativeElement.value,this.GetAllDesc.nativeElement.checked).subscribe(
          (res:any) => {
          if(res !== null){
            this.ErrorHappened = false
            this.ErrorToShow = ""
            // console.log("words", this.words);
            // console.log("res",res);
            this.words = res
  
            this.getMethodUsed = "Get All"
            this.timeNow = new Date()
            this.count.nativeElement.classList.add("text-blue-600")
            this.getmethod.nativeElement.classList.add("text-blue-600")
            // console.log("words", this.words);
          }
        },(error:HttpErrorResponse) => {
          // console.log(this.GetAllOrderBy.nativeElement.value);
          this.ErrorHappened = true
          this.ErrorToShow = error.message
          console.log(error);
        })
      }
      else{
        this.ErrorHappened = true
        this.ErrorToShow = "All fields are required"
      }
    }
    else{
      this.ErrorHappened = true
      this.ErrorToShow = "You are unauthorized"
    }
  }

  GetPage() {
    if(this.admin && this.adminModel){
      if(this.GetPageOrderBy.nativeElement.value !== "" && this.GetPageNumber.nativeElement.value !== "", this.GetPageSize.nativeElement.value !== ""){
        this.gameService.GetPage(this.adminModel.First,this.adminModel.Second,this.GetPageOrderBy.nativeElement.value, this.GetPageNumber.nativeElement.value, this.GetPageSize.nativeElement.value, this.GetPageDesc.nativeElement.checked).subscribe(
          (res:any) => {
          if(res !== null){
            this.ErrorHappened = false
            this.ErrorToShow = ""
            // console.log("words", this.words);
            // console.log("res",res);
            this.words = res
  
            this.getMethodUsed = "Get Page"
            this.timeNow = new Date()
            this.count.nativeElement.classList.add("text-blue-600")
            this.getmethod.nativeElement.classList.add("text-blue-600")
  
            // console.log("words", this.words);
          }
        },(error:HttpErrorResponse) => {
          // console.log(this.GetAllOrderBy.nativeElement.value);
          this.ErrorHappened = true
          this.ErrorToShow = error.message
          console.log(error);
        })
    
      }
      else{
        this.ErrorHappened = true
        this.ErrorToShow = "All fields are required"
      }
      
    }
    else{
      this.ErrorHappened = true
      this.ErrorToShow = "You are unauthorized"
    }
    
  }

  GetWordsByLettersCount() {
    if(this.admin && this.adminModel){
      if(this.GetByLettersCountLettersCount.nativeElement.value !== "" && this.GetByLettersCountOrderBy.nativeElement.value !== ""){
        this.gameService.GetWordsByLettersCount(this.adminModel.First,this.adminModel.Second,this.GetByLettersCountLettersCount.nativeElement.value, this.GetByLettersCountOrderBy.nativeElement.value, this.GetByLettersCountDesc.nativeElement.checked).subscribe(
          (res:any) => {
          if(res !== null){
            this.ErrorHappened = false
            this.ErrorToShow = ""
            // console.log("words", this.words);
            // console.log("res",res);
            this.words = res
  
            this.getMethodUsed = "Get By LettersCount"
            this.timeNow = new Date()
            this.count.nativeElement.classList.add("text-blue-600")
            this.getmethod.nativeElement.classList.add("text-blue-600")
  
            // console.log("words", this.words);
          }
        },(error:HttpErrorResponse) => {
          // console.log(this.GetAllOrderBy.nativeElement.value);
          this.ErrorHappened = true
          this.ErrorToShow = error.message
          console.log(error);
        })
    
      }
      else{
        this.ErrorHappened = true
        this.ErrorToShow = "All fields are required"
      }
    }
    else{
      this.ErrorHappened = true
      this.ErrorToShow = "You are unauthorized"
    }
  }

  Post() {
    if(this.admin && this.adminModel){
      if(this.PostWord.nativeElement.value !== "" && this.PostDescription.nativeElement.value !== ""){
        this.gameService.Post(this.adminModel.First,this.adminModel.Second,this.PostWord.nativeElement.value, 
          this.PostDescription.nativeElement.value,
          ).subscribe(
            (res:any) => {
            if(res !== null){
            this.ErrorHappened = false
            this.ErrorToShow = ""
            // console.log("words", this.words);
            // console.log("res",res);
            this.rowsAffected = res
            this.methodUsed = "Post"
            this.timeNow = new Date()
  
  
            this.rows.nativeElement.classList.remove("text-orange-600")
            this.method.nativeElement.classList.remove("text-orange-600")
            
            this.rows.nativeElement.classList.remove("text-red-600")
            this.method.nativeElement.classList.remove("text-red-600")
  
            this.rows.nativeElement.classList.add("text-green-600")
            this.method.nativeElement.classList.add("text-green-600")
            // console.log("words", this.words);
            }
            },(error:HttpErrorResponse) => {
            // console.log(this.GetAllOrderBy.nativeElement.value);
            this.ErrorHappened = true
            this.ErrorToShow = error.message
            console.log(error);
            })
      }
      else{
        this.ErrorHappened = true
        this.ErrorToShow = "All fields are required"
      }
    }
    else{
      this.ErrorHappened = true
      this.ErrorToShow = "You are unauthorized"
    }
    
  }

  Put() {
    if(this.admin && this.adminModel){
      if(this.PutId.nativeElement.value !== "" && this.PutWord.nativeElement.value !== "" && this.PutDescription.nativeElement.value !== ""){
        this.gameService.Put(this.adminModel.First,this.adminModel.Second,this.PutId.nativeElement.value, 
          this.PutWord.nativeElement.value,
          this.PutDescription.nativeElement.value,
          ).subscribe(
            (res:any) => {
            if(res !== null){
            this.ErrorHappened = false
            this.ErrorToShow = ""
            // console.log("words", this.words);
            // console.log("res",res);
            this.rowsAffected = res
            this.methodUsed = "Put"
            this.timeNow = new Date()
  
            this.rows.nativeElement.classList.remove("text-green-600")
            this.method.nativeElement.classList.remove("text-green-600")
            
            this.rows.nativeElement.classList.remove("text-red-600")
            this.method.nativeElement.classList.remove("text-red-600")
  
            this.rows.nativeElement.classList.add("text-orange-600")
            this.method.nativeElement.classList.add("text-orange-600")
            // console.log("words", this.words);
            }
            },(error:HttpErrorResponse) => {
            // console.log(this.GetAllOrderBy.nativeElement.value);
            this.ErrorHappened = true
            this.ErrorToShow = error.message
            console.log(error);
            })
      }
      else{
        this.ErrorHappened = true
        this.ErrorToShow = "All fields are required"
      }
    }
    else{
      this.ErrorHappened = true
      this.ErrorToShow = "You are unauthorized"
    }
    
  }

  DeleteWord() {
    if(this.admin && this.adminModel){
      if(this.DeleteId.nativeElement.value !== ""){
        this.gameService.DeleteWord(this.adminModel.First,this.adminModel.Second,this.DeleteId.nativeElement.value
          ).subscribe(
            (res:any) => {
            if(res !== null){
            this.ErrorHappened = false
            this.ErrorToShow = ""
            // console.log("words", this.words);
            // console.log("res",res);
            this.rowsAffected = res
            this.methodUsed = "Delete"
            this.timeNow = new Date()
  
            this.rows.nativeElement.classList.remove("text-green-600")
            this.method.nativeElement.classList.remove("text-green-600")
            
            this.rows.nativeElement.classList.remove("text-orange-600")
            this.method.nativeElement.classList.remove("text-orange-600")
            
            this.rows.nativeElement.classList.add("text-red-600")
            this.method.nativeElement.classList.add("text-red-600")
  
            // console.log("words", this.words);
            }
            },(error:HttpErrorResponse) => {
            // console.log(this.GetAllOrderBy.nativeElement.value);
            this.ErrorHappened = true
            this.ErrorToShow = error.message
            console.log(error);
            })
      }
      else{
        this.ErrorHappened = true
        this.ErrorToShow = "All fields are required"
      }
    }
    else{
      this.ErrorHappened = true
      this.ErrorToShow = "You are unauthorized"
    }
    
  }

}
