import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { GetIpService } from "src/app/core/services/GetIpService";
import { StepService } from "src/app/core/services/StepService";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent {
  numberstep = 0;
  ipAddress='';
  version='';
  constructor(private http: HttpClient, private stepService: StepService, private getIpService: GetIpService){}

  ngOnInit() {
      try
      {
        this.stepService.currentStep.subscribe((value)=> this.numberstep = value);      
        this.version= environment.version + ' Copyright © ' + new Date().getFullYear() +' Banco Falabella';
        this.getIpService.getIp().subscribe((res:any)=>{
          this.ipAddress ='Direccion Ip: ' + res.ip;
        });        
      }
      catch(error)     
      {
        console.log(error);
      }
  }
}
