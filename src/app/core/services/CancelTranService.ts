import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class cancelTransactionService {
  
  private urlApi ='';
  constructor(private http: HttpClient) { }

  cancelTransaction(itx:string): Observable<any> { 
    this.urlApi = environment.urlApi;
    let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };      
      let jsonConfirm = { 
        transaction_id:itx
      };  
      let currentDate = new Date();
      let strDate = currentDate.getFullYear().toString() + currentDate.getMonth().toString() + currentDate.getDay().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString() + currentDate.getMilliseconds().toString();
      return this.http.post<any>(this.urlApi + "cancelTransaction/" + "?param=" + strDate, jsonConfirm, httpOptions);
  }

}