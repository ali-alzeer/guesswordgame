import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor(private http:HttpClient) { }

  public GetRandomWord(NumberOfLetters : number){
    return this.http.get(`${environment.baseUrl}/api/Words/${NumberOfLetters}`); 
  }

  public GetNumberOfHints(NumberOfLetters : number){
    return Math.floor(NumberOfLetters / 3)
  }

  //// AUTHORIZED

  public GetAdmin(First :string, Second : string){
    let h = new HttpHeaders({
      First,Second
    })
    return this.http.get(`${environment.baseUrl}/api/Admin`,{
      headers:h
    })
  }


  public GetAll(First :string, Second:string, OrderBy: string, Desc:boolean){
    let h = new HttpHeaders({
      First,Second
    })
    return this.http.get(`${environment.baseUrl}/api/Words?OrderBy=${OrderBy}&Desc=${Desc}`,{
      headers:h
    })
  }

  public GetPage(First :string, Second:string,OrderBy: string, PageNumber:number, PageSize:number, Desc:boolean){
    let h = new HttpHeaders({
      First,Second
    })
    return this.http.get(`${environment.baseUrl}/api/Words/page?OrderBy=${OrderBy}&PageNumber=${PageNumber}&PageSize=${PageSize}&Desc=${Desc}`,
      {headers:h} 
    )
  }

  public GetWordsByLettersCount(First :string, Second:string,LettersCount:number, OrderBy: string, Desc:boolean){
    let h = new HttpHeaders({
      First,Second
    })
    return this.http.get(`${environment.baseUrl}/api/Words/letterscount?LettersCount=${LettersCount}&OrderBy=${OrderBy}&Desc=${Desc}`,
      {headers:h} 
    )
  }

  public Post(First :string, Second:string,Word:string, Description : string){
    let h = new HttpHeaders({
      First,Second
    })
    return this.http.post(`${environment.baseUrl}/api/Words?Word=${Word}&Description=${Description}`,null,
      {headers:h} )
  }

  public Put(First :string, Second:string,Id:number,Word:string, Description : string){
    let h = new HttpHeaders({
      First,Second
    })
    return this.http.put(`${environment.baseUrl}/api/Words?Id=${Id}&Word=${Word}&Description=${Description}`,null,
      {headers:h}
    )
  }

  public DeleteWord(First :string, Second:string,Id:number){
    let h = new HttpHeaders({
      First,Second
    })
    return this.http.delete(`${environment.baseUrl}/api/Words?Id=${Id}`,{headers:h})
  }
  
}
