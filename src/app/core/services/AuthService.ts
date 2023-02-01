import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaymentData } from 'src/app/shared/entities/PaymentData';
import { environment } from 'src/environments/environment';
import { EnvironmentLoaderService } from '../config/environment-loader.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  
  private urlApi ='';
  constructor(private http: HttpClient) { }

  auth(form: FormGroup,itx: string): Observable<any> { 
    this.urlApi = environment.urlApi;
    let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',          
        })
      };      
      let json = {
        id_customer_type: form.controls["tipoPersona"].value==1 || form.controls["tipoPersona"].value==""?"N":"J",
        id_number: form.controls["numeroDocumento"].value,
        id_type: Number(form.controls["tipoDocumento"].value),
        reference: form.controls["claveInternet"].value,
        transaction_id: itx,
        captcha:null
      };    
   
      let currentDate = new Date();
      let strDate = currentDate.getFullYear().toString() + currentDate.getMonth().toString() + currentDate.getDay().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString() + currentDate.getMilliseconds().toString();
      return this.http.post<any>(this.urlApi + "auth/" + "?param=" + strDate, json, httpOptions);
  }

}