import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service';
import { DataService } from 'src/app/core/services/data-service.service';
import { SessionService } from 'src/app/core/services/SessionService';
import { PaymentData } from '../entities/PaymentData';
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginService } from 'src/app/core/services/LoginService';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit, OnDestroy {
  @ViewChild("contents",{static:true}) content!:ElementRef;
  timeLeft=0;
  dateEnd=new Date("2000-01-02");
  subscription!: Subscription ;  
  timeCheck=300000;
  titleMessageModal="Fin sesion";
  messageModal="";
  paymentData!: PaymentData;
  message="";
  modalReference!:NgbModalRef;
  constructor(public sessionService: SessionService, private router: Router,private data: DataService,private readonly envService: EnvironmentLoaderService,private modalService: NgbModal,private loginService:LoginService) { }

  ngOnInit() {
    try
    {   
      this.sessionService.currentTimeLife.subscribe((value)=> this.timeLeft = value);
      this.sessionService.currentDateEnd.subscribe((value)=> this.dateEnd = value);

      this.data.currentMessage.subscribe({next:(message:any)=>{this.message=message}});    
      this.paymentData=this.data.getPaymentData(this.message);
      const source = timer(60000,60000);
      this.subscription = source.subscribe(val => {
          if (this.dateEnd.getFullYear()!=2000 && this.timeLeft>0)
          {
            let difference=  Math.floor((this.dateEnd.getTime() - new Date().getTime()) /60000);
            if (difference<=0)
            {
                try
                {
                  this.modalReference.close();
                }catch{}
                this.sessionService.changeTimeLife(0);
                this.redirectLogin(this.envService.getResourceConfig().auth_SessionExpire);
            }
            else
            {  
                if (difference==1)
                {
                  this.titleMessageModal=this.envService.getResourceConfig().session_title;                
                  this.messageModal=this.envService.getResourceConfig().session_MessageOneMinute;              
                  this.modalReference = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title'});
                }              
            }
          }
      });
    }catch(error)     
    {
      console.log(error);
    }
  }

  redirectLogin(msg:string)
  {
    this.loginService.changeMessage(msg);
    this.router.navigate(['login'],{queryParams:{itx:this.paymentData.itx}});
  }

  ngOnDestroy() {  
    try
    { 
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }catch(error)     
    {
      console.log(error);
    }
  }

  onModalClose()
  {  
    try
    {  
      this.modalReference.close();
    }catch(error)     
    {
      console.log(error);
    }
  }

}
