import { Component,OnInit, OnDestroy,Input } from '@angular/core';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})


export class TopBarComponent implements OnInit, OnDestroy {
  @Input() numberstep = 0;
  time = new Date();
  rxTime = new Date();  
  subscription!: Subscription ;
 
  ngOnInit() {   
    
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        // let hour = this.rxTime.getHours();
        // let minuts = this.rxTime.getMinutes();
        // let seconds = this.rxTime.getSeconds();
        // //let a = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        // let NewTime = hour + ":" + minuts + ":" + seconds
        // console.log(NewTime);
        this.rxTime = time;
      });
  }

  ngOnDestroy() {   
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
