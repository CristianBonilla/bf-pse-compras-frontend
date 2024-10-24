import { Component } from '@angular/core';

@Component({
  selector: 'bf-pc-invalid',
  templateUrl: './invalid.component.html',
  styles: `
    :host ::ng-deep .content__body {
      justify-content: flex-start;
    }
  `
})
export class InvalidComponent { }
