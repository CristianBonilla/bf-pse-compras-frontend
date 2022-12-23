 import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,ElementRef,OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service';
import { DataService } from "src/app/core/services/DataService";
import { PaymentData } from 'src/app/shared/paymentData';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CancelTransactionService } from 'src/app/core/services/CancelTransactionService';
import { TransactionService } from 'src/app/core/services/TransactionService';
import { ProductsService } from 'src/app/core/services/ProductsService';
import { StepService } from 'src/app/core/services/StepService';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  @ViewChild("content",{static:true}) content!:ElementRef;
  
  submitted = false;
  form!: FormGroup;
  message="";
  messageError="";
  paymentData!: PaymentData;  
  transactionCost:number=0;  
  operationValue!:number;  
  available_balance!:number;
  responseProducts:any;
  products:{id:string,value:string}[]=[];  
  nameEntity="";
  ltProducts:any;  
  paymetDescription=""; 
  messageStep1='';
  messageModal='';
  titleMessageModal='';
  accounts: Array<{ id: string, name: string }> = [
    { id: '2', name: "Cuenta de ahorro-" },
    { id: '7', name: "Cuenta PAC-" },
    { id: '4', name: "Cuenta Corriente-" }
  ];
  selectedBook : any;  
  modalReference!:NgbModalRef;
  loadFailed=0;

  private urlApi="";
  constructor(private readonly envService: EnvironmentLoaderService, private router: Router,private data: DataService,private modalService: NgbModal,private formBuilder: FormBuilder, private transactionService:TransactionService, private productsService:ProductsService, private stepService: StepService) { }

  ngOnInit() {
    this.stepService.changeStep(1);
    this.form = this.formBuilder.group(
      {      
        product: ['', Validators.required]       
    });


    this.data.currentMessage.subscribe({next:(message:any)=>{this.message=message}});
    this.paymentData=this.data.getPaymentData(this.message);
    this.loadTransaction();
    this.loadProducts();
  }

  loadTransaction()
  {
    this.transactionService.transaction(this.paymentData).subscribe({
      next: (response:any) =>  {
        //Si el estado ya es 7=Rechazado,8=Aplicado,9=error Rediriga a la pantalla resumen. Solo El estado 4=Autenticado es valido. En los demas estados rediriga a Login.
        //Mensaje estado invalido
        if (response.getTransactions.transactionStateIdBF!=4)
        {
          switch(response.getTransactions.transactionStateIdBF)
          {
            case 7:
            case 8:
            case 9:
              this.router.navigate(['summary'],{ queryParams: {itx: this.paymentData.itx}});
              break;
            default:
              this.redirectLogin(this.envService.getResourceConfig().stp12_InvalidState_MsgLogin);
              break;
          }
        }


        this.paymetDescription = response.getTransactions.paymetDescription;        
        this.transactionCost = response.getTransactions.transactionCost;        
        this.operationValue = response.getTransactions.operationValue;
        this.nameEntity=response.getTransactions.nameEntity;

        this.paymentData.paymetDescription=this.paymetDescription;
        this.paymentData.transactionCost = this.transactionCost;
        this.paymentData.operationValue = this.operationValue;
        this.paymentData.nameEntity=this.nameEntity;        
      },
      error: (e:any) => {
        console.error(e);
        switch (e.status)
          {
            case 500:
            case 204:
              this.loadFailed=0;
              this.titleMessageModal=this.envService.getResourceConfig().stp1_ModalErrorTitle;
              this.messageModal=this.envService.getResourceConfig().stp1_Transaction_500;
              this.modalReference =this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title',backdrop:'static', keyboard : false });
            break;
            case 401:
              this.redirectLogin(this.envService.getResourceConfig().auth_IncorrectState);
            break;          
          }
      }
   });
  }

  loadProducts()
  {
    this.productsService.products(this.paymentData.token).subscribe({
      next: (response:any) =>  { 
          if(response=='No Content')
          {
            this.messageError=this.envService.getResourceConfig().stp1_Products_204;
          }else
          {
            this.ltProducts=response.products;
          }
        },
        error: (e:any) => {
          console.error(e);
          switch (e.status)
          {
            case 500:            
              this.loadFailed=1;
              this.titleMessageModal=this.envService.getResourceConfig().stp1_ModalErrorTitle;
              this.messageModal=this.envService.getResourceConfig().stp1_Products_500;
              this.modalReference = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title',backdrop:'static', keyboard : false });
            break;           
            case 401:
              this.redirectLogin(this.envService.getResourceConfig().auth_IncorrectState);
            break;
          }
        }
      });      
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  redirectLogin(msg:string)
  {
    this.router.navigate(['login'],{queryParams:{itx:this.paymentData.itx,msg:msg}});
  }

  getAccountName(product_code:string)
  {
    return this.accounts.find(p => p.id == product_code)?.name;   
  }

  changeProduct () {
    
    let productSelect: any = this.form.controls["product"].value;
    if (productSelect)
    {     
       this.available_balance = productSelect.available_balance;       
       this.paymentData.product_id=productSelect.product_id;
       this.paymentData.product_mask_id=productSelect.product_mask_id;
       this.paymentData.account_type = productSelect.account_type;
       this.paymentData.available_balance=this.available_balance;       
    }
  }

  onSubmit()
  {
    this.messageStep1='';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.data.changeMessageStep1(this.paymentData);
    this.router.navigate(['confirmation']);    
  }

  onModalClose()
  {    
    this.modalReference.close();
    if (this.loadFailed==0)
    {
      this.loadTransaction();
    }
    else
    {
      this.loadProducts();
    }
  }

  onMessageChange(message:string) {
    if (message='Invalid State')
    {
      this.loadTransaction();
      message=this.envService.getResourceConfig().stp_Cancel_401_InvalidState;
    }
    this.messageError=message;
 }

}
