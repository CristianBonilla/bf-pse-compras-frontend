import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaymentData } from 'src/app/shared/paymentData';


export class cancelTransactionService {

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  cancelTransaction(paymentData: PaymentData, urlApi: string) {
    let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + paymentData.token
        })
      };

      let jsonConfirm = { 
        transaction_id:paymentData.itx
      };  

    //   return this.http.post<any>(urlApi + "confirmTransaction/" + "?param=" + strDate, jsonConfirm, httpOptions)
      
  }

}