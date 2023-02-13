import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, timer, map, share } from "rxjs";
import { StepService } from "src/app/core/services/StepService";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})


export class TopBarComponent implements OnInit, OnDestroy {
  numberstep = 0;
  customer_name='';
  time = new Date();
  rxTime = new Date();  
  subscription!: Subscription ;  

  constructor(private stepService: StepService, ){

  }

  ngOnInit() {
    try
    {  
      this.stepService.currentStep.subscribe((value)=> this.numberstep = value);
      this.stepService.currentCustomer_Name.subscribe((value)=> this.customer_name = value);

      this.subscription = timer(0, 1000)
        .pipe(
          map(() => new Date()),
          share()
        )
        .subscribe(time => {      
          this.rxTime = time;
        });
    }catch(error)     
    {
      console.log(error);      
    }    
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
}
