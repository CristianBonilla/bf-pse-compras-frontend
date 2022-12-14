import { Component,OnInit } from '@angular/core';
import {  FormGroup,  FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute,  } from '@angular/router';;
import { PaymentData } from 'src/app/shared/paymentData';
import { Router } from '@angular/router';
import { DataService } from "src/app/core/services/dataservice";

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
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private readonly envService: EnvironmentLoaderService, private activatedRoute: ActivatedRoute , 
    private router: Router,private data: DataService) {  
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.urlApi = this.envService.getEnvConfig().urlApi;
    this.activatedRoute.queryParams.subscribe(params => {this.itx = params['itx'];});

    this.form = this.formBuilder.group(
      {      
        tipoPersona: [''],           
        tipoDocumento: ['1', Validators.required],    
        numeroDocumento: ['52628130',Validators.required],    
        claveInternet: ['000111', Validators.required],
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
    this.messageLogin="";
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
        this.paymentData= new PaymentData();
        this.paymentData.customer_name = response.customer_name;
        this.paymentData.token= response.token;
        this.paymentData.itx = json.transaction_id;        
        this.message= JSON.stringify(this.paymentData);
        sessionStorage.setItem("payment", this.message)
        this.data.changeMessage( JSON.stringify(this.paymentData));
         this.router.navigate(['definition']);
      }
      , (error: any) => {
        if (error.status==401)
        {
          this.messageLogin="La información ingresada es incorrecta. Si no recuerdas tu Clave Internet puedes volver a generarla";
        }
        console.log(error);

      }
    );
      
  }
}
