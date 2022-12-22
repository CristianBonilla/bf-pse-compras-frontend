import { Component,OnInit, OnDestroy,Input } from '@angular/core';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import { StepService } from 'src/app/core/services/StepService';

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
  }

  ngOnDestroy() {   
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
