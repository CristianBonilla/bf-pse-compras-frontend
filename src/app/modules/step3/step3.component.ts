import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild, ElementRef, Inject, LOCALE_ID } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { EnvironmentLoaderService } from "src/app/core/config/environment-loader.service";
import { DataService } from "src/app/core/services/data-service.service";
import { GetIpService } from "src/app/core/services/GetIpService";
import { LoginService } from "src/app/core/services/LoginService";

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
  @ViewChild("contentError3", { static: true }) contentError!: ElementRef;
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
  titleMessageModal='';
  messageModal = '';
  modalReference!: NgbModalRef;
  constructor(private router: Router,private data: DataService,private readonly envService: EnvironmentLoaderService,private http: HttpClient, @Inject(LOCALE_ID) private locale: string,private stepService: StepService, private transactionService:TransactionService, private transactionVoucherService:TransactionVoucherService, private getIpService:GetIpService, private loginService:LoginService,private modalService: NgbModal){}
  ngOnInit() {
    try
    {
      this.stepService.changeStep(3);    
      this.data.currentMessage.subscribe({next:(message:any)=>{this.message=message}});
      
      // TODO Temporal cargar de Sesion
      this.paymentData=this.data.getPaymentDataStep2(this.message);

      this.loadTransaction();
      this.loadIp();
    }catch(error)
    {
      console.log(error);
    }
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
    this.transactionService.transaction(this.paymentData,'S').subscribe({
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
          switch (e.status)
          {
            case 500:            
              this.titleMessageModal = this.envService.getResourceConfig().stp2_ModalErrorTitle;
              this.messageModal = this.envService.getResourceConfig().stp2_Transaction_500;
              this.modalReference = this.modalService.open(this.contentError, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
            break;
            case 401:
              switch (e.error)
              {
                case "TranExpire":
                  this.redirectSummary();break;
                default:  
                  this.redirectLogin(this.envService.getResourceConfig().auth_TransactionInvalid);break;
              }
            break;
          }
        }
      }
    );
  }

  onSubmit()
  {
    try
    {
      this.isDisabledContinue=true;
      window.location.href =this.urlEntity;
      this.isDisabledContinue=false;
    }catch(error)
    {
      console.log(error);
    }    
  }

  onPrintPage()
  {
    try
    {
      window.print();
    }catch(error)
    {
      console.log(error);
    }
  }
  onDownload()
  {
    try
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
    }catch(error)
    {
      console.log(error);
    }
  }

  redirectLogin(msg:string)
  {
    this.loginService.changeMessage(msg);
    this.router.navigate(['login'],{queryParams:{itx:this.paymentData.itx}});
  }

  redirectSummary()
  {
    this.router.navigate(['summary']);
  }
    
  onModalClose() {
    try
    {
      this.modalReference.close();
      this.loadTransaction();      
    }catch(error)
    {
      console.log(error);
    }
  }    

}
