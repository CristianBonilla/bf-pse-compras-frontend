import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service';
import { DataService } from 'src/app/core/services/dataservice';
import { PaymentData } from 'src/app/shared/paymentData';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {
  paymentData!: PaymentData; 
  message="";
  private urlApi="";

  constructor(private http: HttpClient, private readonly envService: EnvironmentLoaderService, private router: Router,private data: DataService){}
  ngOnInit() {
    
    this.data.currentMessage.subscribe(message => this.message = message);
    if (this.message==null ||  this.message=="" )
    {
      if ( sessionStorage.getItem("payment")!=null)
      {
        this.message = sessionStorage.getItem("payment") as string;
      }       
    }
    this.paymentData=JSON.parse(this.message);
    

  }


}
