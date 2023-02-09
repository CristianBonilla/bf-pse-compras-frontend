import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({providedIn: 'root'})
export class LoginService {
  
  private messageLogin = new BehaviorSubject('');
  currentMessageLogin = this.messageLogin.asObservable();
  constructor() { }  
  changeMessage(varMessageLogin: string) {
    this.messageLogin.next(varMessageLogin)
  }
}