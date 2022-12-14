import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service';
import { DataService } from 'src/app/core/services/dataservice';
import { PaymentData } from 'src/app/shared/paymentData';



@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  paymentData!: PaymentData; 
  submitted = false;
  form!: FormGroup;
  message="";
  cellPhone="";
  otp_type="";
  responseCode="";
  paymentRecurring=false;
  formModal: any;
  private urlApi="";
  constructor(private http: HttpClient, private readonly envService: EnvironmentLoaderService, private router: Router,private data: DataService,private formBuilder: FormBuilder ){}

  ngOnInit() {

    this.form = this.formBuilder.group(
      {      
        otp: ['', Validators.required]       
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

    this.urlApi = this.envService.getEnvConfig().urlApi;
    this.paymentRecurring= this.envService.getEnvConfig().paymentRecurring;
    let currentDate = new Date();
    let strDate = currentDate.getFullYear().toString() + currentDate.getMonth().toString() + currentDate.getDay().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString() + currentDate.getMilliseconds().toString();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.paymentData.token
      })
    };
    let json = {};
    this.http.post<any>(this.urlApi + "generateOTP/" + "?param=" + strDate, json, httpOptions).subscribe(response => {                      
         this.cellPhone=response.phone;
         this.responseCode=response.response;
         this.otp_type=response.otp_type;   
         if (this.otp_type=='OTP')
         {
           this.form = this.formBuilder.group(
             {      
               otp: ['', Validators.required]       
           });
         }
         else if (this.otp_type=='TIMESOFTTOKEN')
         {
           this.form = this.formBuilder.group(
             {      
               sofToken: ['', Validators.required]       
           });
         }
         else
         {
            this.form = this.formBuilder.group({});
         }      
      }
      , (error: any) => {       
        console.log(error);

      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit()
  {
    this.submitted = true;
    if (this.form.invalid) {
      return false;;
    }
   
    let currentDate = new Date();
    let strDate = currentDate.getFullYear().toString() + currentDate.getMonth().toString() + currentDate.getDay().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString() + currentDate.getMilliseconds().toString();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.paymentData.token
      })
    };
    let json = { 
      transaction_id: this.paymentData.itx,
      otp_type: this.otp_type,
      reference: this.otp_type =="OTP" ? this.form.controls["otp"].value : this.form.controls["sofToken"].value};
    this.http.post<any>(this.urlApi + "validateOTP/" + "?param=" + strDate, json, httpOptions).subscribe(response => {                      
        if (response.status)
        {
          let jsonConfirm = { 
            transaction_id:this.paymentData.itx,
            target_product_payment_date: this.formatDate(new Date()),
            target_product_number: this.paymentData.product_id,
            target_product_type:this.paymentData.account_type
          };  

          this.http.post<any>(this.urlApi + "confirmTransaction/" + "?param=" + strDate, json, httpOptions).subscribe(responseConfirm => {              
              



        
          }
          , (error: any) => {       
            console.log(error);
    
          }
        );
      }
    }
      , (error: any) => {       
        console.log(error);

      }
    );


     this.message= JSON.stringify(this.paymentData);
     sessionStorage.setItem("payment", this.message)
     this.data.changeMessage( JSON.stringify(this.paymentData));
     this.router.navigate(['confirmation']);
     return true;

  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  private padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
  // 👇️ format as "YYYY-MM-DD hh:mm:ss"
  // You can tweak formatting easily
  private formatDate(date: Date) {
    return date.getFullYear()+this.padTo2Digits(date.getMonth() + 1)+this.padTo2Digits(date.getDate());
  }

  changePaymentRecurring(e:any) {
    if(e.currentTarget.checked){        
    
    }
 }

}
