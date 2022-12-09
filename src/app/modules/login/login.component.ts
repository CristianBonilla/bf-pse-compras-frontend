import { Component,OnInit } from '@angular/core';
import {  FormGroup,  FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { EnvConfig } from 'src/app/core/config/env-config';
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpParams } from "@angular/common/http";
import { switchMap } from 'rxjs/operators';
import { PaymentData } from 'src/app/shared/paymentData';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
   
  private urlApi: String="";
  private itx:String="";
  private paymentData!: PaymentData;
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private readonly envService: EnvironmentLoaderService, private route: ActivatedRoute ) {  
  }

  ngOnInit(): void {
    this.urlApi = this.envService.getEnvConfig().urlApi;
    this.route.queryParams.subscribe(params => {this.itx = params['itx'];});

    this.form = this.formBuilder.group(
      {      
        tipoPersona: [''],           
        tipoDocumento: ['', Validators.required],    
        numeroDocumento: ['',Validators.required],    
        claveInternet: ['', Validators.required],
        grupoEmpresarial:[''],
        token:[''],
    });
    this.form.controls["numeroDocumento"].addValidators(Validators.maxLength(15));
    this.form.controls["claveInternet"].addValidators(Validators.maxLength(6));

    this.form.controls["tipoPersona"].valueChanges.subscribe(tipopersonalValue => {
      if (tipopersonalValue==2) {
        this.form.controls["grupoEmpresarial"].setValidators([Validators.required]);
        this.form.controls["token"].setValidators([Validators.required,Validators.maxLength(6)]);
      } else {
        this.form.controls["grupoEmpresarial"].setValidators(null);
        this.form.controls["token"].setValidators(null);
      }
      this.form.controls["grupoEmpresarial"].updateValueAndValidity();
      this.form.controls["token"].updateValueAndValidity();
    });

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let currentDate = new Date();
    let strDate = currentDate.getFullYear().toString() + currentDate.getMonth().toString() + currentDate.getDay().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString() + currentDate.getMilliseconds().toString();
    let json = {
      id_customer_type: this.form.controls["tipoPersona"].value==1 || this.form.controls["tipoPersona"].value==""?"N":"J",
      id_number: this.form.controls["numeroDocumento"].value,
      id_type: Number(this.form.controls["tipoDocumento"].value),
      reference: this.form.controls["claveInternet"].value,
      transaction_id: this.itx,
      captcha:null
    };    

    this.http.post<any>(this.urlApi + "auth/" + "?param=" + strDate, json, httpOptions).subscribe(response => {
        if (response.resultCode != 200) {
            this.paymentData= new PaymentData();
            this.paymentData.customer_name = response.customer_name;
            this.paymentData.token= response.token;
            this.paymentData.documentNumber = json.id_number;
            this.paymentData.documentType =json.id_type;
        }
      }
      );
      
  }
}
