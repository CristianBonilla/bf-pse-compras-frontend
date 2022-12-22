import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentData } from 'src/app/shared/paymentData';
import { EnvironmentLoaderService } from '../config/environment-loader.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  
  private urlApi ='';
  constructor(private http: HttpClient,private readonly envService: EnvironmentLoaderService) { }

  transaction(paymentData: PaymentData): Observable<any> { 
    this.urlApi = this.envService.getEnvConfig().urlApi;
    let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + paymentData.token
        })
      };
      let currentDate = new Date();
      let strDate = currentDate.getFullYear().toString() + currentDate.getMonth().toString() + currentDate.getDay().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString() + currentDate.getMilliseconds().toString();
      let json = {
        DefaultString: paymentData.itx     
      };      
      return this.http.post<any>(this.urlApi + "transaction/?param=" + strDate, json, httpOptions);
  }
}