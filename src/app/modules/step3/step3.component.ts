import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service';
import { DataService } from 'src/app/core/services/DataService';
import { PaymentData } from 'src/app/shared/paymentData';
import {formatDate} from '@angular/common';
import { StepService } from 'src/app/core/services/StepService';
@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {
  paymentData!: PaymentData; 
  message='';
  isDisabledContinue=false;
  transactionStateBFDesc=''
  private urlApi='';
  ipAddress='';
  dateTransacion='';
  approvalNumberACH='';
  referenceNumber1='';
  referenceNumber2='';
  referenceNumber3='';
  ticketId='';
  approvalNumberBF='';
  paymetDescription='';
  operationValue='';
  transactionCost='';
  constructor(private router: Router,private data: DataService,private readonly envService: EnvironmentLoaderService,private http: HttpClient, @Inject(LOCALE_ID) private locale: string,private stepService: StepService){}
  ngOnInit() {
    this.stepService.changeStep(3);
    this.data.currentMessage.subscribe(message => this.message = message);    
    this.paymentData=JSON.parse(this.message);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.paymentData.token
      })
    };
    let currentDate = new Date();
    let strDate = currentDate.getFullYear().toString() + currentDate.getMonth().toString() + currentDate.getDay().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString() + currentDate.getMilliseconds().toString();
    let json = {
      DefaultString: this.paymentData.itx     
    };    
    this.urlApi = this.envService.getEnvConfig().urlApi;
    
    this.http.post<any>(this.urlApi + "transaction/" + "?param=" + strDate, json, httpOptions).subscribe(response => {                      
        
      
        // summaryTransaction='';
        if(response && response.getTransactions)
        { 
          if (response.getTransactions.transactionStateIdBF==8)
          {
            this.transactionStateBFDesc ="Aprobada";
          }
          else if(response.getTransactions.transactionStateIdBF==7)
          {
            this.transactionStateBFDesc ="Rechazada";
          }
          this.dateTransacion = formatDate(response.getTransactions.responseDateBF,'yyyy-MM-dd HH:mm:ss',this.locale);  
          if (response.getTransactions.approvalNumberACH!='None')
          {
            this.approvalNumberACH=response.getTransactions.approvalNumberACH;
          }          
          this.ticketId=response.getTransactions.ticketId;
          this.transactionCost=response.getTransactions.transactionCost;
          this.paymetDescription = response.getTransactions.paymetDescription;
          this.referenceNumber1=response.getTransactions.referenceNumber1;
          this.referenceNumber2=response.getTransactions.referenceNumber2;
          this.referenceNumber3=response.getTransactions.referenceNumber3;
          this.operationValue=response.getTransactions.operationValue;          
          this.approvalNumberBF=response.getTransactions.approvalNumberBF;          
        }

      }
      , (error: any) => {       
        console.log(error);

      }
    );

    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
          this.ipAddress =res.ip;
        });    


  }

  onSubmit()
  {
    this.isDisabledContinue=true;
    this.data.changeMessage( JSON.stringify(this.paymentData));
    this.router.navigate(['summary']);
    this.isDisabledContinue=false;
  }

  onPrintPage()
  {
    window.print();
  }

}
