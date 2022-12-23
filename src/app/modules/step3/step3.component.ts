import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service';
import { DataService } from 'src/app/core/services/DataService';
import { PaymentData } from 'src/app/shared/paymentData';
import {formatDate} from '@angular/common';
import { StepService } from 'src/app/core/services/StepService';
// import jsPDF from 'jspdf'; 
import { TransactionService } from 'src/app/core/services/TransactionService';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {
  @ViewChild('content', {static: false}) content!:ElementRef; 
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
  urlEntity='';
  nameEntity='';
  constructor(private router: Router,private data: DataService,private readonly envService: EnvironmentLoaderService,private http: HttpClient, @Inject(LOCALE_ID) private locale: string,private stepService: StepService, private transactionService:TransactionService){}
  ngOnInit() {
    this.stepService.changeStep(3);    
    this.data.currentMessage.subscribe(message => this.message = message); 
    
    // TODO Temporal cargar de Sesion
    this.paymentData=this.data.getPaymentDataStep2(this.message);

    this.loadTransaction();
    this.loadIp();
  }

  loadIp()
  {
    try
    {   
      this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
        this.ipAddress =res.ip;
      });        
    }
    catch(error)     
    {
      console.log(error);
    }
  }


  loadTransaction()
  {
    this.transactionService.transaction(this.paymentData).subscribe({
      next: (response: any) => {          
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
          this.urlEntity=response.getTransactions.urlEntity;
          this.nameEntity=response.getTransactions.nameEntity;
        }
      },
        error: (e) => { 
          console.log(e);
        }

      }
    );
  }

  onSubmit()
  {
    this.isDisabledContinue=true;
    window.location.href =this.urlEntity;
    this.isDisabledContinue=false;
  }

  onPrintPage()
  {
    window.print();
  }
  onDownload()
  {
    
    
    
  }

}
