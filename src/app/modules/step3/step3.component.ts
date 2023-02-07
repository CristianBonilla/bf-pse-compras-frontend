import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild, ElementRef, Inject, LOCALE_ID } from "@angular/core";
import { Router } from "@angular/router";
import { EnvironmentLoaderService } from "src/app/core/config/environment-loader.service";
import { DataService } from "src/app/core/services/data-service.service";
import { GetIpService } from "src/app/core/services/GetIpService";

import { StepService } from "src/app/core/services/StepService";
import { TransactionService } from "src/app/core/services/TransactionService";
import { TransactionVoucherService } from "src/app/core/services/TransactionVoucherService";
import { PaymentData } from "src/app/shared/entities/PaymentData";

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
  nameFile='';
  constructor(private router: Router,private data: DataService,private readonly envService: EnvironmentLoaderService,private http: HttpClient, @Inject(LOCALE_ID) private locale: string,private stepService: StepService, private transactionService:TransactionService, private transactionVoucherService:TransactionVoucherService, private getIpService:GetIpService){}
  ngOnInit() {
    this.stepService.changeStep(3);    
    this.data.currentMessage.subscribe({next:(message:any)=>{this.message=message}});
    
    // TODO Temporal cargar de Sesion
    this.paymentData=this.data.getPaymentDataStep2(this.message);

    this.loadTransaction();
    this.loadIp();
  }

  loadIp()
  {
    try
    {  
      this.getIpService.getIp().subscribe((res:any)=>{
        this.ipAddress = res.ip;
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
          this.nameFile = formatDate(response.getTransactions.responseDateBF,'ddMMyyyy_HHmmss',this.locale);
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
        error: (e:any) => { 
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
    this.transactionVoucherService.transactionVoucher(this.paymentData).subscribe({
      next: (x: any) => {  
        console.log("x", x);        
        var newBlob = new Blob([x], { type: "application/pdf" });
        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //   window.navigator.msSaveOrOpenBlob(newBlob);
        //   return;
        // }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = "Comprobante_"+this.nameFile+".pdf";        
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
          })
        );
        setTimeout(function() {          
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      },
        error: (e:any) => { 
          console.log(e);
        }

      }
    );
    
    
  }

}
