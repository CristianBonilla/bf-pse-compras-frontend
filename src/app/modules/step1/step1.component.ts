import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EnvironmentLoaderService } from "src/app/core/config/environment-loader.service";
import { DataService } from "src/app/core/services/data-service.service";
import { LegalService } from "src/app/core/services/LegalService";
import { LoginService } from "src/app/core/services/LoginService";

import { ProductsService } from "src/app/core/services/ProductsService";
import { StepService } from "src/app/core/services/StepService";
import { TransactionService } from "src/app/core/services/TransactionService";
import { PaymentData } from "src/app/shared/entities/PaymentData";

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  @ViewChild("content1",{static:true}) content!:ElementRef;
  
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
  ltCompanies:any;
  ltProducts:any;
  paymetDescription=""; 
  messageStep1='';
  messageModal='';
  titleMessageModal='';
  showAccount=false;
  accounts: Array<{ id: string, name: string }> = [
    { id: 'SA', name: "Cuenta de ahorro-" },
    { id: 'VA', name: "Cuenta PAC-" },
    { id: 'CC', name: "Cuenta Corriente-" }    
  ];
  selectedBook : any;  
  modalReference!:NgbModalRef;
  loadFailed=0;
  isInsufficientFunds=false;
  showAvailableBalance=false;
  constructor(private readonly envService: EnvironmentLoaderService, private router: Router,private data: DataService,private modalService: NgbModal,private formBuilder: FormBuilder, private transactionService:TransactionService, private productsService:ProductsService, private stepService: StepService, private loginService:LoginService, private LegalService:LegalService) { }

  ngOnInit() {
    try
    {
      this.stepService.changeStep(1);
      
      this.data.currentMessage.subscribe({next:(message:any)=>{this.message=message}});
      this.paymentData=this.data.getPaymentData(this.message);      
      this.loadTransaction();
      if (this.paymentData.typePerson==2)//Si es persona juridica
      { 
         this.form = this.formBuilder.group(
          {    
            company: ['', Validators.required],
            product: ['', Validators.required]       
        });         
        this.loadLegalPerson();
      }
      else
      {
        this.form = this.formBuilder.group(
          {    
            company: [''],
            product: ['', Validators.required]       
        });   
        this.showAccount =true;
        this.loadProducts();  
      }      
      this.form.controls["company"].valueChanges.subscribe({next:(company:any)=>{
        this.onChangeCompany(company);
      }});
      this.form.controls["product"].valueChanges.subscribe({next:(product:any)=>{
        this.onChangeProduct(product);
      }});

    }catch(error)
    {
      console.log(error);
    }
  }

  loadTransaction()
  {
    this.transactionService.transaction(this.paymentData,'1').subscribe({
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
   });
  }

  loadLegalPerson()
  {
    
    this.LegalService.legalPerson(this.paymentData.token).subscribe({
      next: (response:any) =>  { 
          if(response=='No Content')
          {
            this.messageError=this.envService.getResourceConfig().stp1_Products_204;
          }else
          {
            this.ltCompanies=response;
            if (this.ltCompanies.length==1)
            {
              this.form.controls["companies"].setValue(this.ltCompanies[0], {onlySelf: true});
            }
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
            this.updateProducts(response.products);
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
      });      
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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

  getAccountName(product_code:string)
  {
    return this.accounts.find(p => p.id == product_code)?.name;   
  }

  onChangeProduct(productSelect:any) {
    try
    {
      this.isInsufficientFunds=false;      
      if (productSelect)
      {     
        this.available_balance = productSelect.available_balance;       
        this.paymentData.product_id=productSelect.product_id;
        this.paymentData.product_mask_id=productSelect.product_mask_id;
        this.paymentData.account_type = productSelect.account_type;
        this.showAvailableBalance =  productSelect.show_balance;
        this.paymentData.available_balance=this.available_balance;
        
        if (this.available_balance<this.operationValue)
            this.isInsufficientFunds=true;
      }
      else
      {
        this.showAvailableBalance =  false;
      }
    }catch(error)
    {
      console.log(error);
    }
  }

  onChangeCompany(companySelect:any) {
    try
    {
      this.isInsufficientFunds=false;
      if (companySelect)
      {     

        let queryBalance = this.validateShowBalanceOrSelect(companySelect);        
        if (queryBalance==true)
        {
          this.LegalService.balance(this.paymentData.token,companySelect.accounts).subscribe({
            next: (response:any) =>  { 
                if(response=='No Content')
                {
                  this.messageError=this.envService.getResourceConfig().stp1_Products_204;
                }else
                {
                  this.showAccount=true;
                  this.UpdateBalance(companySelect,response);
                  this.updateProducts(response);
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
            });
        }
        else
        {
          this.updateProducts(companySelect.accounts);          
        }
      }
      else
      {
         this.showAccount=false;
         this.showAvailableBalance=false;
         this.ltProducts=null;
      }
    }catch(error)
    {
      console.log(error);
    }
  }

  UpdateBalance(companySelect:any,response_accounts:any)
  {
    if (response_accounts)
    {
      let findCompany=this.ltCompanies.filter((x:any)=> x.companyId==companySelect.companyId);
      findCompany?.forEach((item:any) => { item.accounts =  response_accounts });      
    }
  }

  updateProducts(accounts:any)
  {

    this.ltProducts=accounts;        
    if (this.ltProducts.length==1)
    {
      this.form.controls["product"].setValue(this.ltProducts[0], {onlySelf: true});
    }
    else
    {
      this.form.controls["product"].setValue('');
    }
  }


  validateShowBalanceOrSelect(company:any)
  {
     let queryBalance=true;
      if (company.accounts)
      {
         let not_show_balance = company.accounts.find((x: any) => x.show_balance==false);
         if (not_show_balance)
         {
            queryBalance=false;
         }
         else{
            let company_without_balance  = company.accounts.find((x: any) => x.available_balance==null);
            if (!company_without_balance)
            {
               queryBalance=false;
            }
         }

      }
      return queryBalance;
  }

  onSubmit()
  {
    try
    {
      this.messageStep1='';
      this.submitted = true;
      if (this.form.invalid || this.f['product'].errors || this.f['company'].errors ) {
        return;
      }
      this.data.changeMessageStep1(this.paymentData);
      this.router.navigate(['confirmation']);
    }catch(error)
    {
      console.log(error);
    }

  }

  onModalClose()
  {   
    try
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
    }catch(error)
    {
      console.log(error);
    }
  }

  onModalCloseTop()
  {   
    try
    {  
      this.modalReference.close();
      this.redirectLogin("");
    }catch(error)
    {
      console.log(error);
    }

  }
  onMessageChange(message:string) {
    try
    {
      if (message='Invalid State')
      {
        this.loadTransaction();
        message=this.envService.getResourceConfig().stp_Cancel_401_InvalidState;
      }
      this.messageError=message;
    }catch(error)
    {
      console.log(error);
    }
  }
}
