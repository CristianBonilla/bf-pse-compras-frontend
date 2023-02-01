import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaymentData } from 'src/app/shared/entities/PaymentData';

@Injectable({providedIn: 'root'})

export class DataService  {

	
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();


  changeMessageLogin(paymentData: PaymentData) {  
    sessionStorage.clear();    
    sessionStorage.setItem("j", paymentData.token);
    sessionStorage.setItem("i", paymentData.itx);
    sessionStorage.setItem("c", paymentData.customer_name);
    this.messageSource.next(JSON.stringify(paymentData));
  }

  changeMessageStep1(paymentData: PaymentData) {
    sessionStorage.clear();    
    sessionStorage.setItem("j", paymentData.token);
    sessionStorage.setItem("i", paymentData.itx);
    sessionStorage.setItem("c", paymentData.customer_name);
    sessionStorage.setItem("a", paymentData.product_mask_id);
    sessionStorage.setItem("b", paymentData.available_balance.toString());
    sessionStorage.setItem("p", paymentData.product_id);
    sessionStorage.setItem("t", paymentData.account_type);
    this.messageSource.next(JSON.stringify(paymentData))
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  getPaymentDataStep1(message:string):PaymentData
  {  
    let paymentData = new PaymentData(); 
    if (message==null || message=='')
    {   
       paymentData.token=sessionStorage.getItem("j") as string;
       paymentData.itx=sessionStorage.getItem("i") as string;
       paymentData.customer_name=sessionStorage.getItem("C") as string;
       return paymentData;      
    }    
    else
    {
        paymentData=JSON.parse(message);
    }
    return paymentData;
  }

  getPaymentDataStep2(message:string):PaymentData
  {  
    let paymentData = new PaymentData(); 
    if (message==null || message=='')
    {   
       paymentData.token=sessionStorage.getItem("j") as string;
       paymentData.itx=sessionStorage.getItem("i") as string;
       paymentData.customer_name=sessionStorage.getItem("c") as string;
       if (sessionStorage.getItem("a"))
       {
          paymentData.product_mask_id = sessionStorage.getItem("a") as string;
       }
       if (sessionStorage.getItem("b"))
       {
          paymentData.available_balance = Number(sessionStorage.getItem("b") as string);
       }
       if (sessionStorage.getItem("p"))
       {
          paymentData.product_id = sessionStorage.getItem("p") as string;
       }
       if (sessionStorage.getItem("t"))
       {
        paymentData.account_type = sessionStorage.getItem("t") as string;
       }       
       return paymentData;      
    }    
    else
    {
        paymentData=JSON.parse(message);
    }
    return paymentData;
  }


  getPaymentData(message:string):PaymentData
  {  
    let paymentData = new PaymentData(); 
    if (message==null || message=='')
    {   
       paymentData.token=sessionStorage.getItem("j") as string;
       paymentData.itx=sessionStorage.getItem("i") as string;
       paymentData.customer_name=sessionStorage.getItem("C") as string;
       return paymentData;      
    }    
    else
    {
        paymentData=JSON.parse(message);
    }
    return paymentData;
  }
}