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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  messageLogin:string ="";
  message:string=""
 
  private urlApi: string="";
  private itx:string="";
  private paymentData!: PaymentData;
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private readonly envService: EnvironmentLoaderService, private activatedRoute: ActivatedRoute ,private router: Router,private data: DataService, private authService: AuthService, private stepService: StepService) { }

  ngOnInit(): void {
    this.stepService.changeStep(0);
    this.data.currentMessage.subscribe({next:(message:any)=>{this.message=message}});
    this.urlApi = this.envService.getEnvConfig().urlApi;
    this.activatedRoute.queryParams.subscribe({next:(params:any)=>{this.itx=params['itx'];}});    

    this.form = this.formBuilder.group(
      {      
        tipoPersona: [''],           
        tipoDocumento: ['1', Validators.required],    
        numeroDocumento: ['52628130',Validators.required],    
        claveInternet: ['000111', Validators.required],
        // numeroDocumento: ['',Validators.required],    
        // claveInternet: ['', Validators.required],
        grupoEmpresarial:[''],
        token:[''],
    });
    this.form.controls["numeroDocumento"].addValidators(Validators.maxLength(15));
    this.form.controls["claveInternet"].addValidators(Validators.minLength(6));


    this.data.currentMessage.subscribe({next:(message:any)=>{this.message=message}});


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

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.messageLogin="";
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }    
    this.authService.auth(this.form,this.itx).subscribe({
      next: (response:any) =>  {  
        if (response.transactionStateIdBF && response.transactionStateIdBF!='')
        {
          this.messageLogin=this.envService.getResourceConfig().auth_IncorrectState;
        }
        else
        {
          this.paymentData= new PaymentData();
          this.stepService.changeCustomer_Name(response.customer_name);
          this.paymentData.customer_name = response.customer_name;
          this.paymentData.token= response.token;
          this.paymentData.itx = this.itx; 
          this.paymentData.timeLife = response.timeLife;          
          this.data.changeMessageLogin(this.paymentData);
          this.router.navigate(['definition']);
        }       
      },
      error: (error:any) => {         
          if (error.status==401)
          {
            this.submitted = false;
            this.form.controls["numeroDocumento"].reset();
            this.form.controls["claveInternet"].reset();
            this.messageLogin=this.envService.getResourceConfig().auth_HTTP_401_UNAUTHORIZED;
          }
          else
          {
            this.messageLogin=this.envService.getResourceConfig().auth_HTTP_500_SERVER_ERROR;
            console.log(error);
          }
        }       

      }      
    );      
  }
}
