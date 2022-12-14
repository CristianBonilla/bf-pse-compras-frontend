import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit  } from '@angular/core';
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service';
import { DataService } from "src/app/core/services/dataservice";
import { PaymentData } from 'src/app/shared/paymentData';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
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
  money_code=" COP";
  paymetDescription="";
  accounts: Array<{ id: string, name: string }> = [
    { id: '2', name: "Cuenta de ahorro-" },
    { id: '7', name: "Cuenta PAC-" },
    { id: '4', name: "Cuenta Corriente-" }
  ];
  selectedBook : any;
  private urlApi="";
  constructor(private http: HttpClient, private readonly envService: EnvironmentLoaderService, private router: Router,private data: DataService,private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.form = this.formBuilder.group(
      {      
        product: ['', Validators.required]       
    });


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
        this.paymetDescription = response.getTransactions.paymetDescription;        
        this.transactionCost = response.getTransactions.transactionCost;        
        this.operationValue = response.getTransactions.operationValue;
        this.nameEntity=response.getTransactions.nameEntity;

        this.paymentData.paymetDescription=this.paymetDescription;
        this.paymentData.transactionCost = this.transactionCost;
        this.paymentData.operationValue = this.operationValue;
        this.paymentData.nameEntity=this.nameEntity;

      }
      , (error: any) => {       
        console.log(error);

      }
    );

    httpOptions = {
      headers: new HttpHeaders({        
        'Authorization': 'Token ' + this.paymentData.token
      })
    }; 
    this.http.get<any>(this.urlApi + "products/" + "?param=" + strDate, httpOptions).subscribe(responseProduct => {    

      if (responseProduct.products && responseProduct.products.length>0)
      {
          this.ltProducts=responseProduct.products;    
      }
  }
  , (error: any) => {       
    console.log(error);

  }
  );

    //Si el estado ya es confirmado rediriga a una pantalla .. Transaccion no valida  Boton volver 


  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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
       this.money_code=" " + productSelect.money_code;
       this.paymentData.product_id=productSelect.product_id;
       this.paymentData.product_mask_id=productSelect.product_mask_id;
       this.paymentData.account_type = productSelect.account_type;
       this.paymentData.available_balance=this.available_balance;
       this.paymentData.money_code=this.money_code;
    }
  }

  onSubmit()
  {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
   
    this.message= JSON.stringify(this.paymentData);
    sessionStorage.setItem("payment", this.message)
    this.data.changeMessage( JSON.stringify(this.paymentData));
     this.router.navigate(['confirmation']);
     return true;

  }

}
