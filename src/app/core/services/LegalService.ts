import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class LegalService {
  
  private urlApi ='';
  constructor(private http: HttpClient) { }

  legalPerson(token: string): Observable<any> { 
    this.urlApi =  environment.urlApi;
    let httpOptions = {
        headers: new HttpHeaders({         
          'Authorization': 'Token ' + token
        })
      };
      let currentDate = new Date();
      let strDate = currentDate.getFullYear().toString() + currentDate.getMonth().toString() + currentDate.getDay().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString() + currentDate.getMilliseconds().toString();            
      return this.http.get<any>(this.urlApi + "getLegalPerson/?param=" + strDate, httpOptions);
  }

  balance(token: string, accounts:any): Observable<any> { 
    this.urlApi =  environment.urlApi;
    let httpOptions = {
        headers: new HttpHeaders({         
          'Authorization': 'Token ' + token
        })
      };
      let currentDate = new Date();
      let strDate = currentDate.getFullYear().toString() + currentDate.getMonth().toString() + currentDate.getDay().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString() + currentDate.getMilliseconds().toString();            
      return this.http.post<any>(this.urlApi + "balance/?param=" + strDate,accounts, httpOptions);
  }
}