import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentData } from 'src/app/shared/entities/PaymentData';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ValidateOtpService {
  
  private urlApi ='';
  constructor(private http: HttpClient){}
  validateOtp(paymentData: PaymentData,otp_type:string,reference:string): Observable<any>{ 
    this.urlApi = environment.urlApi;
    let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + paymentData.token
        })
      };
      let currentDate = new Date();
      let strDate = currentDate.getFullYear().toString() + currentDate.getMonth().toString() + currentDate.getDay().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString() + currentDate.getMilliseconds().toString();
      let json = { 
        transaction_id: paymentData.itx,
        otp_type: otp_type,
        reference: reference
      };      
      return this.http.post<any>(this.urlApi + "validateOTP/?param=" + strDate, json, httpOptions);
  }
}