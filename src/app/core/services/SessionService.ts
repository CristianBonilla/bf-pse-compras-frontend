import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private timeLife = new BehaviorSubject(0);
  currentTimeLife = this.timeLife.asObservable();

  private dateEnd = new BehaviorSubject(new Date("2000-01-02"));
  currentDateEnd = this.dateEnd.asObservable();

  constructor() { }
  changeTimeLife(timeLifeValue: number) {
    this.timeLife.next(timeLifeValue);
  }  

  changeDateStart(dateEndValue: Date) {
    this.dateEnd.next(dateEndValue)
  }
}