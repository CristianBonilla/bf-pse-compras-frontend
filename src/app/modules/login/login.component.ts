import { Component,OnInit } from '@angular/core';
import {  FormGroup,  FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute,  } from '@angular/router';;
import { Router } from '@angular/router';
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service';
import { AuthService } from 'src/app/core/services/AuthService';

import { StepService } from 'src/app/core/services/StepService';
import { PaymentData } from 'src/app/shared/entities/PaymentData';
import { DataService } from 'src/app/core/services/data-service.service';
import { SessionService } from 'src/app/core/services/SessionService';
import { LoginService } from 'src/app/core/services/LoginService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  messageTopLogin:string ="";
  messageLogin:string ="";
  message:string=""
  paymentData!: PaymentData; 
  private itx:string="";

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private readonly envService: EnvironmentLoaderService, private activatedRoute: ActivatedRoute ,private router: Router,private data: DataService, private authService: AuthService, private stepService: StepService,private sessionService: SessionService, private loginService:LoginService) { }

  ngOnInit(): void {
    try
    {
      this.stepService.changeStep(0);
      this.data.currentMessage.subscribe({next:(message:any)=>{this.message=message}});    
      this.activatedRoute.queryParams.subscribe({next:(params:any)=>{this.itx=params['itx'];}}); 
      this.loginService.currentMessageLogin.subscribe({next:(messageTopLogin:any)=>{this.messageTopLogin=messageTopLogin}});

      this.paymentData=this.data.getPaymentData(this.message);
      if (!this.paymentData)
      {
        this.paymentData= new PaymentData();
        this.paymentData.itx = this.itx; 
      }      
      this.data.changeMessageLogin(this.paymentData);

      this.form = this.formBuilder.group(
        {      
          // TODO Persona Natural
          // tipoPersona: ['1'],           
          // tipoDocumento: ['1', Validators.required],    
          // numeroDocumento: ['1010101010',Validators.required],    
          // claveInternet: ['000111', Validators.required],
          // grupoEmpresarial:[''],
          // token:[''],

          // TODO Persona Juridica
          tipoPersona: ['2'],
          tipoDocumento: ['1', Validators.required],    
          numeroDocumento: ['1014224787',Validators.required],    
          claveInternet: ['794613', Validators.required],
          grupoEmpresarial:['23534'],
          token:['123456']


          // numeroDocumento: ['',Validators.required],
          // claveInternet: ['', Validators.required],
          // grupoEmpresarial:[''],
          // token:[''],
      });
    
      this.form.controls["numeroDocumento"].addValidators(Validators.maxLength(15));
      this.form.controls["claveInternet"].addValidators(Validators.minLength(6));
      this.form.controls["tipoPersona"].valueChanges.subscribe({next:(tipopersonalValue:any)=>{
        if (tipopersonalValue==2) {
          this.form.controls["grupoEmpresarial"].setValidators([Validators.required]);
          this.form.controls["token"].setValidators([Validators.required,Validators.minLength(6)]);
        } else {
          this.form.controls["grupoEmpresarial"].setValidators(null);
          this.form.controls["token"].setValidators(null);
        }
        this.form.controls["grupoEmpresarial"].updateValueAndValidity();
        this.form.controls["token"].updateValueAndValidity();
      }});
    } catch (error) {
      console.log(error);
    }
  }

  

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    try
    {
      this.messageTopLogin="";
      this.messageLogin="";
      this.loginService.changeMessage("");
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }    
      this.authService.auth(this.form,this.itx).subscribe({
        next: (response:any) =>  {  
          
            this.paymentData= new PaymentData();
            this.stepService.changeCustomer_Name(response.customer_name);
            this.paymentData.customer_name = response.customer_name;
            this.paymentData.token= response.token;
            this.paymentData.itx = this.itx; 
            this.paymentData.timeLife = response.timeLife;
            this.paymentData.typePerson = this.form.controls["tipoPersona"].value;

            this.data.changeMessageLogin(this.paymentData);
            this.sessionService.changeTimeLife(response.timeLife);
            this.sessionService.changeDateStart(this.addMinutes(new Date(), response.timeLife));
            this.router.navigate(['definition']);                 
        },
        error: (error:any) => {
            console.log(error);
            switch (error.status)
            {
              case 401:          
                this.submitted = false;
                this.form.controls["numeroDocumento"].reset();
                this.form.controls["claveInternet"].reset();
                this.messageLogin=this.envService.getResourceConfig().auth_HTTP_401_UNAUTHORIZED;
                switch (error.error)
                {
                  case "415":               
                    this.messageLogin=this.envService.getResourceConfig().auth_415PasswordBlock;break;
                  case "515":
                    this.messageLogin=this.envService.getResourceConfig().auth_515TokenBlock;break;
                  case "TranExpire":
                    this.messageLogin=this.envService.getResourceConfig().auth_SessionExpire;break;
                  case "TranInvalid":
                    this.messageLogin=this.envService.getResourceConfig().auth_TransactionInvalid;break;
                }
              break;
              case 500:          
                this.messageLogin=this.envService.getResourceConfig().auth_HTTP_500_SERVER_ERROR;
              break;
            }
          }
        }      
      );      
    }catch(error)
    {
      console.log(error);
    }
  }

  addMinutes(date: Date, minutes:number) {
    date.setMinutes(date.getMinutes() + minutes);  
    return date;
  }

  onMessageChange(message:string) {
    try
    {
      this.messageTopLogin="";
      if (message='Invalid State')
      {      
        message=this.envService.getResourceConfig().stp_Cancel_401_InvalidState;
      }
      this.messageLogin=message;
    }
    catch(error)
    {
      console.log(error);
    }
 }

}
