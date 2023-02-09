import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class GenerateOtpService {
  
  private urlApi ='';
  constructor(private http: HttpClient) { }

  generateOtp(token: string,availableBalance:number): Observable<any> { 
    this.urlApi = environment.urlApi;
    let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        })
      };
      let json = { 
        availableBalance:availableBalance       
      };  
      let currentDate = new Date();
      let strDate = currentDate.getFullYear().toString() + currentDate.getMonth().toString() + currentDate.getDay().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString() + currentDate.getMilliseconds().toString();      
      return this.http.post<any>(this.urlApi + "generateOTP/?param=" + strDate,json,httpOptions);
  }
}