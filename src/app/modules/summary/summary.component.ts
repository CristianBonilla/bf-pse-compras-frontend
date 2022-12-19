import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service';
import { DataService } from 'src/app/core/services/dataservice';
import { PaymentData } from 'src/app/shared/paymentData';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  closeResult = '';
  name = 'World';
  summaryTransaction='';
  transactionStateBFDesc='';
  approvalNumberACH='';
  ticketId='';
  nameEntity='';
  paymetDescription='';
  referenceNumber1='';
  referenceNumber2='';
  referenceNumber3='';
  operationValue='';
  ivaValue=0;
  approvalNumberBF='';
  transactionDate='';
  message='';
  paymentData!: PaymentData; 
  private urlApi=''
constructor(private http: HttpClient,private router: Router,private data: DataService,private readonly envService: EnvironmentLoaderService){}

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    if (this.message==null ||  this.message=="" )
    {
      if ( sessionStorage.getItem("payment")!=null)
      {
        this.message = sessionStorage.getItem("payment") as string;
      }       
    }
    this.paymentData=JSON.parse(this.message);
    
      
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
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
        if(response.getTransaction.transactionStateBFDesc==8)
        {
          this.transactionStateBFDesc ="Aprobada";
        }else  if(response.getTransaction.transactionStateBFDesc==7)
        {
          this.transactionStateBFDesc ="Rechazada";
        }
        this.approvalNumberACH=response.getTransaction.approvalNumberACH;
        this.ticketId=response.getTransaction.ticketId;
        this.nameEntity=response.getTransaction.nameEntity;
        this.paymetDescription = response.getTransactions.paymetDescription;
        this.referenceNumber1=response.getTransactions.referenceNumber1;
        this.referenceNumber2=response.getTransactions.referenceNumber2;
        this.referenceNumber3=response.getTransactions.referenceNumber3;
        this.operationValue=response.getTransactions.operationValue;
        this.ivaValue=response.getTransactions.ivaValue;
        this.approvalNumberBF=response.getTransactions.approvalNumberBF;
        this.transactionDate=response.getTransactions.transactionDate;
      }
      , (error: any) => {       
        console.log(error);

      }
    );


  }
}
