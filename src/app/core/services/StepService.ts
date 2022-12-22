import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({providedIn: 'root'})
export class StepService {
  private step = new BehaviorSubject(0);
  currentStep = this.step.asObservable();
  private customer_Name = new BehaviorSubject('');
  currentCustomer_Name = this.customer_Name.asObservable();
  constructor() { }
  changeStep(stepValue: number) {
    this.step.next(stepValue);
  }  
  changeCustomer_Name(varCustomer_Name: string) {
    this.customer_Name.next(varCustomer_Name)
  }
}