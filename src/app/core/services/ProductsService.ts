import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentLoaderService } from '../config/environment-loader.service';

@Injectable({providedIn: 'root'})
export class ProductsService {
  
  private urlApi ='';
  constructor(private http: HttpClient,private readonly envService: EnvironmentLoaderService) { }

  products(token: string): Observable<any> { 
    this.urlApi = this.envService.getEnvConfig().urlApi;
    let httpOptions = {
        headers: new HttpHeaders({         
          'Authorization': 'Token ' + token
        })
      };
      let currentDate = new Date();
      let strDate = currentDate.getFullYear().toString() + currentDate.getMonth().toString() + currentDate.getDay().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString() + currentDate.getMilliseconds().toString();            
      return this.http.get<any>(this.urlApi + "products/?param=" + strDate, httpOptions);
  }
}