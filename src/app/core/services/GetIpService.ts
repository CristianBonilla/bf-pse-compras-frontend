import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class GetIpService {
  
  private urlApi ='';
  constructor(private http: HttpClient) { }

  getIp(): Observable<any> { 
    this.urlApi =  environment.urlApi;
    let httpOptions = {};
    let currentDate = new Date();
    let strDate = currentDate.getFullYear().toString() + currentDate.getMonth().toString() + currentDate.getDay().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString() + currentDate.getMilliseconds().toString();            
    return this.http.get<any>(this.urlApi + "getIp/?param=" + strDate, httpOptions);
  }
}