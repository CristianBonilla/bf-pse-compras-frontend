import { HttpClient } from '@angular/common/http';
import { Component,Input } from '@angular/core';
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent {
  @Input() numberstep = 0;
  ipAddress='';
  version='';
  constructor(private http: HttpClient,private readonly envService: EnvironmentLoaderService,){}

  ngOnInit() {
      try
      {
        this.version= this.envService.getEnvConfig().version + ' Copyright © ' + new Date().getFullYear() +' Banco Falabella';
        this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
          this.ipAddress ='Direccion Ip: ' + res.ip;
        });        
      }
      catch(error)     
      {
        console.log(error);
      }
  }
}
