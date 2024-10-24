import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  readonly #loadingSubject = new BehaviorSubject(false);
  readonly loading$ = this.#loadingSubject.asObservable();

  showLoader() {
    this.#loadingSubject.next(true);
  }

  hideLoader() {
    this.#loadingSubject.next(false);
  }
}
