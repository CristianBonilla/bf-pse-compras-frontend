import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentData } from 'src/app/shared/entities/PaymentData';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ConfirmTransactionService {
  
  private urlApi ='';
  constructor(private http: HttpClient){}
  confirmTransaction(paymentData: PaymentData): Observable<any>{ 
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
        transaction_id:paymentData.itx,
        target_product_payment_date: this.formatDate(new Date()),
        target_product_number: paymentData.product_id,
        target_product_type:paymentData.account_type
      };  
      return this.http.post<any>(this.urlApi + "confirmTransaction/?param=" + strDate, json, httpOptions);
  }

  private formatDate(date: Date) {
    return date.getFullYear()+this.padTo2Digits(date.getMonth() + 1)+this.padTo2Digits(date.getDate());
  }

  private padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  } 
}